import { memo, FC, useCallback } from "react";
import { TodoDeleteProps } from "./todo-delete.types";
import { useTodoListActions } from "@entities/todo/hooks/useTodoListActions";

export const TodoDelete: FC<TodoDeleteProps> = memo(({ todo }) => {
	const { handleDeleteTodo, isTodoLoading } = useTodoListActions();

	const handleDelete = useCallback(async () => {
		await handleDeleteTodo(todo.id);
	}, [handleDeleteTodo, todo.id]);

	return (
		<button onClick={handleDelete} disabled={isTodoLoading}>
			Удалить
		</button>
	);
});
