import { FC } from "react";
import styles from "./todo-list.module.css";
import { useGetTodosQuery } from "@entities/todo/api/todo-api";
import { TodoListItem } from "../todo-list-item/todo-list-item";
import { useTodoListStore } from "@entities/todo/hooks/useTodoListStore";

export const TodoList: FC = () => {
	const { error, isLoading } = useGetTodosQuery();
	const { items: todos } = useTodoListStore();

	return (
		<div className={styles.container}>
			{isLoading && <p>Загрузка...</p>}
			{error && <p>Ошибка получения todos</p>}
			{todos.map((todo) => (
				<TodoListItem todo={todo} key={todo.id} />
			))}
		</div>
	);
};
