import { memo, FC } from "react";
import { ITodoItemToggleProps } from "./todo.types";
import styles from "./todo-item-toggle.module.css";

export const TodoItemToggle: FC<ITodoItemToggleProps> = memo(
	({ todo, isEditing, isTodoLoading, toggleCompletion }) => {
		return (
			<input
				type="checkbox"
				checked={todo.completed}
				onChange={toggleCompletion}
				className={styles.checkbox}
				disabled={isEditing || isTodoLoading}
			/>
		);
	}
);
