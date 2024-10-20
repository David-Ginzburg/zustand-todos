import { memo, useState, FC } from "react";
import { TodoEditProps } from "./todo-edit.types";

export const TodoEdit: FC<TodoEditProps> = memo(
	({ todo, setIsEditing, isTodoLoading, handleUpdate }) => {
		const [newTitle, setNewTitle] = useState(todo.title);

		const handleSave = async () => {
			await handleUpdate({ newTitle });
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
	}
);
