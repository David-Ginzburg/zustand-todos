import React from "react";
import styles from "./App.styles.module.css";
import { TodoAdd } from "./Todo/TodoAdd";
import { TodoList } from "./Todo/TodoList";

export const TodoApp: React.FC = () => {
	return (
		<div className={styles.container}>
			<h1>Todo App</h1>
			<div className={styles.todosWrapper}>
				<TodoAdd />
				<TodoList />
			</div>
		</div>
	);
};
