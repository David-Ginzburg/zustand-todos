import { FC, memo, useCallback } from "react";
import styles from "./todo-toggle.module.css";
import { useTodoListActions } from "@entities/todo/hooks/useTodoListActions.ts";
import { ITodoToggleProps } from "./todo-toggle.types";

export const TodoToggle: FC<ITodoToggleProps> = memo(({ todo }) => {
	const { handleUpdateTodo, isTodoLoading } = useTodoListActions();

	const toggleCompletion = useCallback(async () => {
		await handleUpdateTodo(todo.id, {
			...todo,
			completed: !todo.completed,
		});
	}, [handleUpdateTodo, todo]);

	return (
		<input
			type="checkbox"
			checked={todo.completed}
			onChange={toggleCompletion}
			className={styles.checkbox}
			disabled={isTodoLoading}
		/>
	);
});
