import { memo, FC } from "react";
import { ITodoProps } from "./todo.types";

export const Todo: FC<ITodoProps> = memo(({ todo }) => {
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
