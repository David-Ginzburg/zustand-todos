import React, { memo, useState } from "react";
import styles from "./Todo.styles.module.css";
import { TodoItemEdit } from "./TodoItemEdit";
import { useTodoActions } from "./useTodoActions";
import { TodoItemProps } from "./Todo.types";

export const TodoItem: React.FC<TodoItemProps> = memo(({ todo }) => {
	const [isEditing, setIsEditing] = useState(false);

	const { handleUpdateTodo, handleDeleteTodo, handleAddTodo, isTodoLoading } = useTodoActions();

	const handleDelete = async () => {
		await handleDeleteTodo(todo.id);
	};

	const handleCopy = async () => {
		await handleAddTodo({
			...todo,
			completed: false,
		});
	};

	const handleToggleCompletion = async () => {
		await handleUpdateTodo(todo.id, {
			...todo,
			completed: !todo.completed,
		});
	};

	return (
		<div className={styles.todoItem}>
			<input
				type="checkbox"
				checked={todo.completed}
				onChange={handleToggleCompletion}
				className={styles.todoItemCheckbox}
				disabled={isEditing || isTodoLoading}
			/>
			{isEditing ? (
				<TodoItemEdit todo={todo} setIsEditing={setIsEditing} />
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
					<button onClick={() => setIsEditing(true)} disabled={isTodoLoading}>
						Редактировать
					</button>
					<button onClick={handleDelete} disabled={isTodoLoading}>
						Удалить
					</button>
					<button onClick={handleCopy} disabled={isTodoLoading}>
						Копировать
					</button>
				</>
			)}
		</div>
	);
});
