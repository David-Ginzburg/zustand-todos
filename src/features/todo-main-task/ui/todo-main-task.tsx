import { FC, memo, useCallback } from "react";
import { ITodoMainTaskProps } from "./todo-main-task.types.ts";
import { useTodoListActions } from "@features/todo-list/model/hooks/useTodoListActions";
import { Todo } from "@entities/todo/ui/todo";

export const TodoMainTask: FC<ITodoMainTaskProps> = memo(({ todo }) => {
	const { handleUpdateTodo, isTodoLoading } = useTodoListActions();

	const toggleCompletion = useCallback(async () => {
		await handleUpdateTodo(todo.id, {
			...todo,
			completed: !todo.completed,
		});
	}, [handleUpdateTodo, todo]);

	return <Todo todo={todo} actions={{ toggleCompletion }} isTodoLoading={isTodoLoading} />;
});
