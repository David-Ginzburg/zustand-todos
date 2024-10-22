import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { TodoApp } from "@pages/todo-page/todo-page";
import { store } from "@shared/store";
import "./styles/global-styles.css";

const container = document.getElementById("root");

if (container) {
	const root = ReactDOM.createRoot(container);
	root.render(
		<Provider store={store}>
			<TodoApp />
		</Provider>
	);
}
