import { FC, memo } from "react";
import { ITodoMainTaskProps } from "./todo-main-task.types.ts";
import { Todo } from "@entities/todo/ui/todo";
import { TodoToggle } from "@features/todo/ui/todo-toggle/todo-toggle.tsx";
import styles from "./todo-main-task.module.css";

export const TodoMainTask: FC<ITodoMainTaskProps> = memo(({ todo }) => {
	return (
		<div className={styles.container}>
			<TodoToggle todo={todo} />
			<Todo todo={todo} />
		</div>
	);
});
