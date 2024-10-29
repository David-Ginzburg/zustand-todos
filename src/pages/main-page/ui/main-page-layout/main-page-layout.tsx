import { FC, memo } from "react";
import styles from "./main-page-layout.module.css";
import { IMainPageLayout } from "./main-page-layout.types";

export const MainPageLayout: FC<IMainPageLayout> = memo(({ children }) => {
	return (
		<div className={styles.container}>
			<h1 className={styles.title}>Todo App</h1>
			{children}
		</div>
	);
});
