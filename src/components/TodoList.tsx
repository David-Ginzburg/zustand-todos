import React from "react";
import { TodoItem } from "./TodoItem";
import styles from "./styles.module.css";
import { useGetTodosQuery } from "../api/todoApi";

export const TodoList: React.FC = () => {
	const { data } = useGetTodosQuery();

	return (
		<div className={styles.todosList}>
			{data?.map((todo) => (
				<TodoItem
					key={todo.id}
					todo={todo}
				/>
			))}
		</div>
	);
};
