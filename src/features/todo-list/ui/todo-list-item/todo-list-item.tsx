import { FC, memo } from "react";
import { IHandleUpdateProps, ITodoListItemProps } from "./todo.types";
import { useTodoListActions } from "@features/todo-list/model/useTodoListActions";
import { Todo } from "@entities/todo/ui/todo";

export const TodoListItem: FC<ITodoListItemProps> = memo(({ todo }) => {
	const { handleUpdateTodo, handleAddTodo, handleDeleteTodo, isTodoLoading } = useTodoListActions();

	const toggleCompletion = async () => {
		await handleUpdateTodo(todo.id, {
			...todo,
			completed: !todo.completed,
		});
	};

	const handleUpdate = async ({ newTitle }: IHandleUpdateProps) => {
		await handleUpdateTodo(todo.id, {
			...todo,
			title: newTitle,
		});
	};

	const handleCopy = async () => {
		await handleAddTodo({
			...todo,
			completed: false,
		});
	};

	const handleDelete = async () => {
		await handleDeleteTodo(todo.id);
	};

	return (
		<Todo
			todo={todo}
			actions={{ toggleCompletion, handleUpdate, handleCopy, handleDelete }}
			isTodoLoading={isTodoLoading}
		/>
	);
});
