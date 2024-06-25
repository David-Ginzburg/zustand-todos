import React, { useEffect } from "react";
import { TodoItem } from "./TodoItem";
import styles from "./Todo.styles.module.css";
import { useGetTodosQuery } from "../../api/todoApi";
import { useTodoStore } from "./useTodoStore";

export const TodoList: React.FC = () => {
	const { data: todosFromApi, error, isLoading } = useGetTodosQuery();
	const { setTodos, todos } = useTodoStore();

	useEffect(() => {
		if (todosFromApi) {
			setTodos(todosFromApi.slice(0, 10));
		}
	}, [todosFromApi, setTodos]);

	return (
		<div className={styles.todosList}>
			{isLoading && <p>Загрузка...</p>}
			{error && <p>Ошибка получения todos</p>}
			{todos.map((todo) => (
				<TodoItem key={todo.id} todo={todo} />
			))}
		</div>
	);
};
