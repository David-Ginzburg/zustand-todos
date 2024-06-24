import React, { memo, useState } from "react";
import { useUpdateTodoMutation, useDeleteTodoMutation, useAddTodoMutation } from "../api/todoApi";
import styles from "./styles.module.css";
import { TodoItemProps } from "../types/todoItem";

export const TodoItem: React.FC<TodoItemProps> = memo(({ todo }) => {
	const [isEditing, setIsEditing] = useState(false);

	const [triggerUpdate, { isLoading: isLoadingUpdate }] = useUpdateTodoMutation();
	const [triggerDelete, { isLoading: isLoadingDelete }] = useDeleteTodoMutation();
	const [triggerAdd, { isLoading: isLoadingAdd }] = useAddTodoMutation();

	const isDisable = isLoadingUpdate || isLoadingDelete || isLoadingAdd;

	return (
		<div className={styles.todoItem}>
			<input
				type="checkbox"
				checked={todo.completed}
				className={styles.todoItemCheckbox}
				disabled={isEditing || isDisable}
				onChange={(e) => {
					triggerUpdate({
						id		 : todo.id,
						completed: e.currentTarget.checked
					});
				}}
			/>
			{isEditing ? (
				<form
					onSubmit={async (e) => {
						e.preventDefault();

						const formData = new FormData(e.currentTarget);
						const title = formData.get('title')?.toString().trim();

						if(title) {
							await triggerUpdate({
								id: todo.id,
								title
							});
						}

						setIsEditing(false);
					}}
				>
					<input
						type="text"
						name="title"
						defaultValue={todo.title}
						disabled={isDisable}
					/>
					<button
						type="submit"
						disabled={isDisable}
						children="Сохранить"
					/>
				</form>
			) : (
				<>
					<span
						className={styles.todoItemText}
						children={todo.title}
						style={{
							textDecoration: todo.completed ? "line-through" : "none",
						}}
					/>
					<button
						disabled={isDisable}
						children="Редактировать"
						onClick={() => {
							setIsEditing(true)
						}}
					/>
					<button
						disabled={isDisable}
						children="Удалить"
						onClick={() => {
							triggerDelete(todo.id);
						}}
					/>
					<button
						disabled={isDisable}
						children="Копировать"
						onClick={() => {
							triggerAdd({
								title    : todo.title,
								completed: todo.completed
							});
						}}
					/>
				</>
			)}
		</div>
	);
});
