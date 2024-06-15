import React from "react";
import { useGetTodosQuery } from "../api/todoApi";
import { TodoList } from "./TodoList";
import styles from "./styles.module.css";
import { TodoAdd } from "./TodoAdd";

export const TodoApp: React.FC = () => {
	const { error, isLoading } = useGetTodosQuery();

	return (
		<div className={styles.todosWrapper}>
			<div>
				<h1>Todo App</h1>
				<TodoAdd />

				{isLoading && <p>Загрузка...</p>}
				{error && <p>Ошибка получения todos</p>}
			</div>
			<TodoList />
		</div>
	);
};
