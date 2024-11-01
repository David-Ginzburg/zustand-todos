import { FC, memo } from "react";
import { ITodoListItemProps } from "./todo.types";
import styles from "./todo.module.css";
import { Todo } from "@entities/todo/ui/todo";
import { TodoToggle } from "@features/todo/ui/todo-toggle/todo-toggle";
import { TodoDelete } from "@features/todo/ui/todo-delete/todo-delete";
import { TodoCopy } from "@features/todo/ui/todo-copy/todo-copy";
import { useEditState } from "@shared/hooks/edit/useEditState";
import { TodoEdit } from "@features/todo/ui/todo-edit/todo-edit";
import { useTodoListActions } from "@entities/todo/hooks/useTodoListActions";

export const TodoListItem: FC<ITodoListItemProps> = memo(({ todo }) => {
	const { isTodoLoading } = useTodoListActions();
	const { isEditing, setIsEditing, editButton } = useEditState({ disabled: isTodoLoading });

	return (
		<div className={styles.container}>
			<TodoToggle todo={todo} />
			{isEditing ? (
				<TodoEdit todo={todo} setIsEditing={setIsEditing} />
			) : (
				<>
					<div className={styles.todoWrapper}>
						<Todo todo={todo} />
					</div>
					{editButton}
					<TodoDelete todo={todo} />
					<TodoCopy todo={todo} />
				</>
			)}
		</div>
	);
});
