import { memo, FC } from "react";
import { ITodoItemProps } from "./todo.types";

export const Todo: FC<ITodoItemProps> = memo(({ todo }) => {
	return (
		<span
			style={{
				textDecoration: todo.completed ? "line-through" : "none",
			}}
		>
			{todo.title}
		</span>
	);
});
