import { useState } from "react";
import { TodoEditProps } from "./todo-edit.types";
import { useTodoListActions } from "@entities/todo/hooks/useTodoListActions";

export const TodoEdit = ({ todo, setIsEditing }: TodoEditProps) => {
	const [newTitle, setNewTitle] = useState(todo.title);
	const { handleUpdateTodo, isTodoLoading } = useTodoListActions();

	const handleUpdate = async () => {
		await handleUpdateTodo(todo.id, {
			...todo,
			title: newTitle,
		});
		setIsEditing(false);
	};

	const handleNewTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewTitle(e.target.value);
	};

	return (
		<>
			<input type="text" value={newTitle} onChange={handleNewTitle} disabled={isTodoLoading} />
			<button onClick={handleUpdate} disabled={isTodoLoading}>
				Сохранить
			</button>
		</>
	);
};
