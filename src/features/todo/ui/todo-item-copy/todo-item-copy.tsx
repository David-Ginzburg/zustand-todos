import { memo, FC } from "react";
import { ITodoItemCopyProps } from "./todo.types";

export const TodoItemCopy: FC<ITodoItemCopyProps> = memo(({ isTodoLoading, handleCopy }) => {
	return (
		<button onClick={handleCopy} disabled={isTodoLoading}>
			Копировать
		</button>
	);
});
