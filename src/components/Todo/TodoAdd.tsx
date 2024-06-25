import React, { memo, useState } from "react";
import styles from "./Todo.styles.module.css";
import { useTodoActions } from "./useTodoActions";

export const TodoAdd: React.FC = memo(() => {
	const [title, setTitle] = useState("");

	const { handleAddTodo } = useTodoActions();

	const handleAdd = async () => {
		const trimmedTitle = title.trim();
		if (title.trim()) {
			handleAddTodo({
				userId: 1,
				title: trimmedTitle,
				completed: false,
			});
			setTitle("");
		}
	};

	return (
		<div className={styles.todoAdd}>
			<input
				type="text"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				placeholder="Добавить новую задачу"
			/>
			<button onClick={handleAdd} disabled={!title.trim().length}>
				Добавить TODO
			</button>
		</div>
	);
});
