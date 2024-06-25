import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./api/store";
import { TodoApp } from "./components/App";
import "./index.css";

const container = document.getElementById("root");

if (container) {
	const root = ReactDOM.createRoot(container);
	root.render(
		<Provider store={store}>
			<TodoApp />
		</Provider>
	);
}
