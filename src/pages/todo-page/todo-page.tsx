import { FC, useEffect } from "react";
import styles from "./todo-page.module.css";
import { TodoListAdd } from "@features/todo-list/ui/todo-list-add/todo-list-add";
import { TodoList } from "@features/todo-list/ui/todo-list/todo-list";
import { useGetTodosQuery } from "@entities/todo/api/todo-api";
import { useTodoListStore } from "@features/todo-list/model/hooks/useTodoListStore";
import { TodoMainTask } from "@features/todo-main-task/ui/todo-main-task";
import { TodoPageLayout } from "./ui/todo-page-layout/todo-page-layout";

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
				<TodoListAdd />
				<TodoList />
			</div>
		</TodoPageLayout>
	);
};
