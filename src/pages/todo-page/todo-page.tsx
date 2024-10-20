import { FC } from "react";
import styles from "./todo-page.module.css";
import { TodoListAdd } from "@features/todo-list/ui/todo-list-add/todo-list-add";
import { TodoList } from "@features/todo-list/ui/todo-list/todo-list";

export const TodoApp: FC = () => {
	return (
		<div className={styles.container}>
			<h1>Todo App</h1>
			<div className={styles.todosWrapper}>
				<TodoListAdd />
				<TodoList />
			</div>
		</div>
	);
};
