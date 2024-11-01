import { FC, memo } from "react";
import { ITodoListItemProps } from "./todo.types";
import styles from "./todo.module.css";
import { Todo } from "@entities/todo/ui/todo";
import { TodoToggle } from "@features/todo/ui/todo-toggle/todo-toggle";
import { TodoDelete } from "@features/todo/ui/todo-delete/todo-delete";
import { TodoCopy } from "@features/todo/ui/todo-copy/todo-copy";
import { useTodoEdit } from "@features/todo/ui/todo-edit/todo-edit";

export const TodoListItem: FC<ITodoListItemProps> = memo(({ todo }) => {
	const { isEditing, TodoEdit, TodoEditButton } = useTodoEdit({ todo });

	return (
		<div className={styles.container}>
			<TodoToggle todo={todo} />
			{isEditing ? (
				<TodoEdit />
			) : (
				<>
					<div className={styles.todoWrapper}>
						<Todo todo={todo} />
					</div>
					<TodoEditButton />
					<TodoDelete todo={todo} />
					<TodoCopy todo={todo} />
				</>
			)}
		</div>
	);
});
