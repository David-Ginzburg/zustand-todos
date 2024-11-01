import { useState } from "react";
import { TodoEditProps } from "./todo-edit.types";
import { useTodoListActions } from "@entities/todo/hooks/useTodoListActions";

export const useTodoEdit = ({ todo }: TodoEditProps) => {
	const [isEditing, setIsEditing] = useState(false);
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

	const TodoEdit = () => (
		<>
			<input type="text" value={newTitle} onChange={handleNewTitle} disabled={isTodoLoading} />
			<button onClick={handleUpdate} disabled={isTodoLoading}>
				Сохранить
			</button>
		</>
	);

	const TodoEditButton = () => (
		<button onClick={() => setIsEditing(true)} disabled={isTodoLoading}>
			Редактировать
		</button>
	);

	return {
		newTitle,
		isTodoLoading,
		handleUpdate,
		handleNewTitle,
		isEditing,
		TodoEdit,
		TodoEditButton,
	};
};
