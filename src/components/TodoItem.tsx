import React, { memo, useState } from "react";
import { useUpdateTodoMutation, useDeleteTodoMutation, useAddTodoMutation } from "../api/todoApi";
import { useTodoStore } from "../store/useTodoStore";
import styles from "./styles.module.css";
import { TodoItemProps } from "../types/todoItem";
import { useShallow } from "zustand/react/shallow";

export const TodoItem: React.FC<TodoItemProps> = memo(({ todo }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [newTitle, setNewTitle] = useState(todo.title);

	const [updateTodo, { isLoading: isTodoUpdateing }] = useUpdateTodoMutation();
	const [deleteTodo, { isLoading: isTodoDeleting }] = useDeleteTodoMutation();
	const [addTodo, { isLoading: isTodoAdding }] = useAddTodoMutation();
	const deleteFromStore = useTodoStore(useShallow((state) => state.deleteTodo));
	const updateInStore = useTodoStore(useShallow((state) => state.updateTodo));
	const addTodoToStore = useTodoStore(useShallow((state) => state.addTodo));

	const isTodoDisable = isTodoUpdateing || isTodoDeleting || isTodoAdding;

	const handleSave = async () => {
		await updateTodo({
			id: todo.id,
			title: newTitle,
			completed: todo.completed,
			userId: todo.userId,
		});
		updateInStore(todo.id, { title: newTitle });
		setIsEditing(false);
	};

	const handleDelete = async () => {
		await deleteTodo(todo.id);
		deleteFromStore(todo.id);
	};

	const handleCopy = async () => {
		const newTodo = await addTodo({
			userId: 1,
			title: newTitle,
			completed: false,
		}).unwrap();
		addTodoToStore(newTodo);
	};

	const handleToggleCompletion = async () => {
		const updatedTodo = await updateTodo({
			id: todo.id,
			completed: !todo.completed,
			userId: todo.userId,
			title: todo.title,
		}).unwrap();
		updateInStore(todo.id, { completed: updatedTodo.completed });
	};

	return (
		<div className={styles.todoItem}>
			<input
				type="checkbox"
				checked={todo.completed}
				onChange={handleToggleCompletion}
				className={styles.todoItemCheckbox}
				disabled={isEditing || isTodoDisable}
			/>
			{isEditing ? (
				<>
					<input
						type="text"
						value={newTitle}
						onChange={(e) => setNewTitle(e.target.value)}
						disabled={isTodoDisable}
					/>
					<button onClick={handleSave} disabled={isTodoDisable}>
						Сохранить
					</button>
				</>
			) : (
				<>
					<span
						className={styles.todoItemText}
						style={{
							textDecoration: todo.completed ? "line-through" : "none",
						}}
					>
						{todo.title}
					</span>
					<button onClick={() => setIsEditing(true)} disabled={isTodoDisable}>
						Редактировать
					</button>
					<button onClick={handleDelete} disabled={isTodoDisable}>
						Удалить
					</button>
					<button onClick={handleCopy} disabled={isTodoDisable}>
						Копировать
					</button>
				</>
			)}
		</div>
	);
});
