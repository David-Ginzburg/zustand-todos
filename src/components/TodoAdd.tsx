import React, { memo } from "react";
import { useAddTodoMutation } from "../api/todoApi";
import styles from "./styles.module.css";

export const TodoAdd: React.FC = memo(() => {
	const [triggerAdd, { isLoading }] = useAddTodoMutation();

	return (
		<form
			className={styles.todoAdd}
			onSubmit={(e) => {
				e.preventDefault();

				const formData = new FormData(e.currentTarget);
				const title = formData.get('title')?.toString().trim();

				if(title) {
					triggerAdd({ title });
				}
			}}
		>
			<input
				type="text"
				name="title"
				placeholder="Добавить новую задачу"
			/>
			<button
				children="Добавить TODO"
				disabled={isLoading}
			/>
		</form>
	);
});
