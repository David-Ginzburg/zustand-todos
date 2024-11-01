import { memo, FC, useCallback } from "react";
import { TodoCopyProps } from "./todo-copy.types";
import { useTodoListActions } from "@entities/todo/hooks/useTodoListActions";

export const TodoCopy: FC<TodoCopyProps> = memo(({ todo }) => {
	const { handleAddTodo, isTodoLoading } = useTodoListActions();

	const handleCopy = useCallback(async () => {
		await handleAddTodo({
			...todo,
			completed: false,
		});
	}, [handleAddTodo, todo]);

	return (
		<button onClick={handleCopy} disabled={isTodoLoading}>
			Копировать
		</button>
	);
});
