import { FC, memo, useCallback, useState } from "react";
import { ITodoListItemProps } from "./todo.types";
import styles from "./todo.module.css";
import { Todo } from "@entities/todo/ui/todo";
import { useTodoListActions } from "@entities/todo/hooks/useTodoListActions";
import { TodoToggle } from "@features/todo/ui/todo-toggle/todo-toggle";
import { TodoEdit } from "@features/todo/ui/todo-edit/todo-edit";

export const TodoListItem: FC<ITodoListItemProps> = memo(({ todo }) => {
	const [isEditing, setIsEditing] = useState(false);
	const { handleUpdateTodo, handleAddTodo, handleDeleteTodo, isTodoLoading } = useTodoListActions();

	const handleUpdate = useCallback(
		async (newTitle: string) => {
			await handleUpdateTodo(todo.id, {
				...todo,
				title: newTitle,
			});
		},
		[handleUpdateTodo, todo]
	);

	const handleCopy = useCallback(async () => {
		await handleAddTodo({
			...todo,
			completed: false,
		});
	}, [handleAddTodo, todo]);

	const handleDelete = useCallback(async () => {
		await handleDeleteTodo(todo.id);
	}, [handleDeleteTodo, todo.id]);

	return (
		<div className={styles.container}>
			<TodoToggle todo={todo} />
			{isEditing ? (
				<TodoEdit
					todo={todo}
					setIsEditing={setIsEditing}
					isTodoLoading={isTodoLoading}
					handleUpdate={handleUpdate}
				/>
			) : (
				<>
					<div className={styles.todoWrapper}>
						<Todo todo={todo} />
					</div>
					<button onClick={() => setIsEditing(true)} disabled={isTodoLoading}>
						Редактировать
					</button>
					<button onClick={handleDelete} disabled={isTodoLoading}>
						Удалить
					</button>
					<button onClick={handleCopy} disabled={isTodoLoading}>
						Копировать
					</button>
				</>
			)}
		</div>
	);
});
