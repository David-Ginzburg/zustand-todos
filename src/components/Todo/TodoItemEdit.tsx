import React, { memo, useState } from "react";
import { useTodoActions } from "./useTodoActions";
import { TodoItemEditProps } from "./Todo.types";

export const TodoItemEdit: React.FC<TodoItemEditProps> = memo(({ todo, setIsEditing }) => {
	const [newTitle, setNewTitle] = useState(todo.title);

	const { handleUpdateTodo, isTodoLoading } = useTodoActions();

	const handleSave = async () => {
		await handleUpdateTodo(todo.id, {
			...todo,
			title: newTitle,
		});
		setIsEditing(false);
	};

	return (
		<>
			<input
				type="text"
				value={newTitle}
				onChange={(e) => setNewTitle(e.target.value)}
				disabled={isTodoLoading}
			/>
			<button onClick={handleSave} disabled={isTodoLoading}>
				Сохранить
			</button>
		</>
	);
});
