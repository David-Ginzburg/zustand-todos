import { memo, useState, FC } from "react";
import styles from "./todo.module.css";
import { TodoEdit } from "@entities/todo/ui/todo-edit/todo-edit";
import { ITodoItemProps } from "./todo.types";

export const Todo: FC<ITodoItemProps> = memo(({ todo, isTodoLoading, actions }) => {
	const [isEditing, setIsEditing] = useState(false);

	return (
		<div className={styles.container}>
			<input
				type="checkbox"
				checked={todo.completed}
				onChange={actions.toggleCompletion}
				className={styles.checkbox}
				disabled={isEditing || isTodoLoading}
			/>
			{isEditing ? (
				<TodoEdit
					todo={todo}
					setIsEditing={setIsEditing}
					isTodoLoading={isTodoLoading}
					handleUpdate={actions.handleUpdate}
				/>
			) : (
				<>
					<span
						className={styles.title}
						style={{
							textDecoration: todo.completed ? "line-through" : "none",
						}}
					>
						{todo.title}
					</span>
					<button onClick={() => setIsEditing(true)} disabled={isTodoLoading}>
						Редактировать
					</button>
					<button onClick={actions.handleDelete} disabled={isTodoLoading}>
						Удалить
					</button>
					<button onClick={actions.handleCopy} disabled={isTodoLoading}>
						Копировать
					</button>
				</>
			)}
		</div>
	);
});
