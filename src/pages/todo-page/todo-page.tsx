import { FC, useEffect } from "react";
import styles from "./todo-page.module.css";
import { useGetTodosQuery } from "@entities/todo/api/todo-api";
import { TodoMainTask } from "@features/todo/ui/todo-main-task/todo-main-task";
import { TodoPageLayout } from "./ui/todo-page-layout/todo-page-layout";
import { useTodoListStore } from "@entities/todo/hooks/useTodoListStore";
import { TodoList } from "@widgets/todo-list/ui/todo-list/todo-list";
import { TodoAdd } from "@features/todo/ui/todo-add/todo-add";

export const TodoApp: FC = () => {
	const { data: todosFromApi } = useGetTodosQuery();
	const { setItems: setTodos, items: todos } = useTodoListStore();

	const mainTask = todos[0];

	useEffect(() => {
		if (todosFromApi) {
			setTodos(todosFromApi.slice(0, 10));
		}
	}, [todosFromApi, setTodos]);

	return (
		<TodoPageLayout>
			{mainTask && (
				<div className={styles.mainTask}>
					<h2 className={styles.subtitle}>Main task</h2>
					<TodoMainTask todo={mainTask} />
				</div>
			)}
			<div className={styles.todosWrapper}>
				<TodoAdd />
				<TodoList />
			</div>
		</TodoPageLayout>
	);
};
