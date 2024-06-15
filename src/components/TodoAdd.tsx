import React, { memo, useState } from "react";
import { useAddTodoMutation } from "../api/todoApi";
import { useTodoStore } from "../store/useTodoStore";
import styles from "./styles.module.css";
import { useShallow } from "zustand/react/shallow";

export const TodoAdd: React.FC = memo(() => {
	const [title, setTitle] = useState("");
	const [addTodo] = useAddTodoMutation();
	const addTodoToStore = useTodoStore(useShallow((state) => state.addTodo));

	const handleAddTodo = async () => {
		if (title.trim()) {
			const newTodo = await addTodo({ userId: 1, title, completed: false }).unwrap();
			addTodoToStore(newTodo);
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
			<button onClick={handleAddTodo}>Добавить TODO</button>
		</div>
	);
});
