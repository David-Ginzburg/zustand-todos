import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "@shared/store";
import "./styles/global-styles.css";
import { MainPage } from "@pages/main-page";

const container = document.getElementById("root");

if (container) {
	const root = ReactDOM.createRoot(container);
	root.render(
		<Provider store={store}>
			<MainPage />
		</Provider>
	);
}
