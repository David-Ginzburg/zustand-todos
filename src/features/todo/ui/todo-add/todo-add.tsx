import { memo, useState, FC } from "react";
import styles from "./todo-add.module.css";
import { useTodoListActions } from "@entities/todo/hooks/useTodoListActions";

export const TodoAdd: FC = memo(() => {
	const [title, setTitle] = useState("");

	const { handleAddTodo } = useTodoListActions();

	const handleAdd = async () => {
		const trimmedTitle = title.trim();

		if (trimmedTitle) {
			handleAddTodo({
				userId: 1,
				title: trimmedTitle,
				completed: false,
			});
			setTitle("");
		}
	};

	return (
		<div className={styles.container}>
			<input
				type="text"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				placeholder="Добавить новую задачу"
			/>
			<button onClick={handleAdd} disabled={!title.trim().length}>
				Добавить TODO
			</button>
		</div>
	);
});
