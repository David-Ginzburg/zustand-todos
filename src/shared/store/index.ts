import { todoApi } from "@entities/todo/api/todo-api";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
	reducer: {
		[todoApi.reducerPath]: todoApi.reducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(todoApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
