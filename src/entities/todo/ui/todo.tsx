import { memo, useState, FC } from "react";
import styles from "./todo.module.css";
import { TodoEdit } from "@features/todo-edit/ui/todo-edit";
import { ITodoItemProps } from "./todo.types";

export const Todo: FC<ITodoItemProps> = memo(({ todo, isTodoLoading, actions }) => {
	const [isEditing, setIsEditing] = useState(false);

	return (
		<div className={styles.container}>
			{actions.toggleCompletion && (
				<input
					type="checkbox"
					checked={todo.completed}
					onChange={actions.toggleCompletion}
					className={styles.checkbox}
					disabled={isEditing || isTodoLoading}
				/>
			)}
			{isEditing && actions.handleUpdate ? (
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
					{actions.handleUpdate && (
						<button onClick={() => setIsEditing(true)} disabled={isTodoLoading}>
							Редактировать
						</button>
					)}
					{actions.handleDelete && (
						<button onClick={actions.handleDelete} disabled={isTodoLoading}>
							Удалить
						</button>
					)}
					{actions.handleCopy && (
						<button onClick={actions.handleCopy} disabled={isTodoLoading}>
							Копировать
						</button>
					)}
				</>
			)}
		</div>
	);
});
