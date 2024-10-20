import { memo, FC } from "react";
import { ITodoItemDeleteProps } from "./todo.types";

export const TodoItemDelete: FC<ITodoItemDeleteProps> = memo(({ isTodoLoading, handleDelete }) => {
	return (
		<button onClick={handleDelete} disabled={isTodoLoading}>
			Удалить
		</button>
	);
});
