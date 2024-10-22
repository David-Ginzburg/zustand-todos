import { FC, memo } from "react";
import styles from "./todo-page-layout.module.css";
import { ITodoPageLayout } from "./todo-page-layout.types";

export const TodoPageLayout: FC<ITodoPageLayout> = memo(({ children }) => {
	return (
		<div className={styles.container}>
			<h1 className={styles.title}>Todo App</h1>
			{children}
		</div>
	);
});
