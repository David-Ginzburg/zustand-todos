import React from "react";
import { useTodoStore } from "../store/useTodoStore";
import { TodoItem } from "./TodoItem";
import styles from "./styles.module.css";

export const TodoList: React.FC = () => {
	const todos = useTodoStore((state) => state.todos);

	return (
		<div className={styles.todosList}>
			{todos.map((todo) => (
				<TodoItem key={todo.id} todo={todo} />
			))}
		</div>
	);
};
