import { FC, memo } from "react";
import { ITodoWithToggleProps } from "./todo-with-toggle.types.ts";
import { Todo } from "@entities/todo/ui/todo";
import { TodoToggle } from "@features/todo/ui/todo-toggle/todo-toggle.tsx";
import styles from "./todo-with-toggle.module.css";

export const TodoWithToggle: FC<ITodoWithToggleProps> = memo(({ todo }) => {
	return (
		<div className={styles.container}>
			<TodoToggle todo={todo} />
			<Todo todo={todo} />
		</div>
	);
});
