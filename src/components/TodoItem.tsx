import React, { useState } from "react";
import { useUpdateTodoMutation, useDeleteTodoMutation } from "../api/todoApi";
import { useTodoStore } from "../store/useTodoStore";
import styles from "./styles.module.css";

interface TodoItemProps {
	todo: { userId: number; id: number; title: string; completed: boolean };
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [newTitle, setNewTitle] = useState(todo.title);

	const [updateTodo] = useUpdateTodoMutation();
	const [deleteTodo] = useDeleteTodoMutation();
	const { deleteTodo: deleteFromStore, updateTodo: updateInStore } = useTodoStore();

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

	return (
		<div className={styles.todoItem}>
			{isEditing ? (
				<>
					<input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
					<button onClick={handleSave}>Save</button>
				</>
			) : (
				<>
					<span
						style={{
							textDecoration: todo.completed ? "line-through" : "none",
						}}
					>
						{todo.title}
					</span>
					<button onClick={() => setIsEditing(true)}>Редактировать</button>
					<button onClick={handleDelete}>Удалить</button>
					<button onClick={() => updateInStore(todo.id, { completed: !todo.completed })}>
						{todo.completed ? "Не выполнено" : "Выполнено"}
					</button>
				</>
			)}
		</div>
	);
};
