import React, { useEffect } from "react";
import { useTodoStore } from "../store/useTodoStore";
import { TodoItem } from "./TodoItem";
import styles from "./styles.module.css";
import { useGetTodosQuery } from "../api/todoApi";
import { useShallow } from "zustand/react/shallow";

export const TodoList: React.FC = () => {
	const { data: todosFromApi } = useGetTodosQuery();

	const todos = useTodoStore(useShallow((state) => state.todos));

	const { setTodos } = useTodoStore();

	useEffect(() => {
		if (todosFromApi) {
			setTodos(todosFromApi.slice(0, 10));
		}
	}, [todosFromApi, setTodos]);

	return (
		<div className={styles.todosList}>
			{todos.map((todo) => (
				<TodoItem key={todo.id} todo={todo} />
			))}
		</div>
	);
};
