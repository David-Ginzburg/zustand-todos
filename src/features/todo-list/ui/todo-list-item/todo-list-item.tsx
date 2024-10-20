import { FC, memo, useCallback } from "react";
import { IHandleUpdateProps, ITodoListItemProps } from "./todo.types";
import { useTodoListActions } from "@features/todo-list/model/useTodoListActions";
import { Todo } from "@entities/todo/ui/todo";

export const TodoListItem: FC<ITodoListItemProps> = memo(({ todo }) => {
	const { handleUpdateTodo, handleAddTodo, handleDeleteTodo, isTodoLoading } = useTodoListActions();

	const toggleCompletion = useCallback(async () => {
		await handleUpdateTodo(todo.id, {
			...todo,
			completed: !todo.completed,
		});
	}, [handleUpdateTodo, todo]);

	const handleUpdate = useCallback(
		async ({ newTitle }: IHandleUpdateProps) => {
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
		<Todo
			todo={todo}
			actions={{ toggleCompletion, handleUpdate, handleCopy, handleDelete }}
			isTodoLoading={isTodoLoading}
		/>
	);
});
