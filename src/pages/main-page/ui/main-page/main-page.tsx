import { FC, useEffect } from "react";
import styles from "./main-page.module.css";
import { useGetTodosQuery } from "@entities/todo/api/todo-api";
import { useTodoListStore } from "@entities/todo/hooks/useTodoListStore";
import { TodoAdd } from "@features/todo/ui/todo-add/todo-add";
import { MainPageLayout } from "../main-page-layout/main-page-layout";
import { TodoList } from "@widgets/todo-list";
import { TodoWithToggle } from "@widgets/todo-with-toggle/ui/todo-with-toggle";

export const MainPage: FC = () => {
	const { data: todosFromApi } = useGetTodosQuery();
	const { setItems: setTodos, items: todos } = useTodoListStore();

	const mainTask = todos[0];

	useEffect(() => {
		if (todosFromApi) {
			setTodos(todosFromApi.slice(0, 10));
		}
	}, [todosFromApi, setTodos]);

	return (
		<MainPageLayout>
			{mainTask && (
				<div className={styles.mainTask}>
					<h2 className={styles.subtitle}>Main task</h2>
					<TodoWithToggle todo={mainTask} />
				</div>
			)}
			<div className={styles.todosWrapper}>
				<TodoAdd />
				<TodoList />
			</div>
		</MainPageLayout>
	);
};
