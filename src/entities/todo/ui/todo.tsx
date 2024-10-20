import { memo, useState, FC } from "react";
import styles from "./todo.module.css";
import { ITodoItemProps } from "./todo.types";
import { TodoEdit } from "@features/todo/ui/todo-edit/todo-edit";
import { TodoItemCopy } from "@features/todo/ui/todo-item-copy/todo-item-copy";
import { TodoItemDelete } from "@features/todo/ui/todo-item-delete/todo-item-delete";
import { TodoItemToggle } from "@features/todo/ui/todo-item-toggle/todo-item-toggle";

export const Todo: FC<ITodoItemProps> = memo(({ todo, isTodoLoading, actions }) => {
	const [isEditing, setIsEditing] = useState(false);

	return (
		<div className={styles.container}>
			<TodoItemToggle
				todo={todo}
				isEditing={isEditing}
				isTodoLoading={isTodoLoading}
				toggleCompletion={actions.toggleCompletion}
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
					<TodoItemDelete isTodoLoading={isTodoLoading} handleDelete={actions.handleDelete} />
					<TodoItemCopy isTodoLoading={isTodoLoading} handleCopy={actions.handleCopy} />
				</>
			)}
		</div>
	);
});
