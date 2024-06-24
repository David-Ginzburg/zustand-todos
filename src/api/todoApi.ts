import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Todo } from "../types/todo";

export const todoApi = createApi({
	reducerPath: "todoApi",
	baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
	endpoints: (builder) => ({
		getTodos: builder.query<Todo[], void>({
			query: () => "todos",
		}),
		addTodo: builder.mutation<Todo, Partial<Todo>>({
			query: (newTodo) => ({
				url: "todos",
				method: "POST",
				body: newTodo
			}),
			async onQueryStarted(payload, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled

					/*
					// Spread style
					dispatch(
						todoApi.util.updateQueryData('getTodos', undefined, (draft) => {
							return [...draft, data];
						})
					);

					// Push style
					dispatch(
						todoApi.util.updateQueryData('getTodos', undefined, (draft) => {
							draft.push(data);
						})
					);
					*/

					dispatch(
						todoApi.util.updateQueryData('getTodos', undefined, (draft) => {
							return [...draft, data];
						})
					);
				} catch {
					// @TODO: Return error
				}
			},
		}),
		updateTodo: builder.mutation<Todo, Partial<Todo>>({
			query: ({ id, ...patch }) => ({
				url: `todos/${id}`,
				method: "PUT",
				body: patch,
			}),
			async onQueryStarted({ id, ...params }, { dispatch, queryFulfilled }) {
				try {
					await queryFulfilled

					/*
					// Map style
					dispatch(
						todoApi.util.updateQueryData('getTodos', undefined, (draft) => {
							return draft.map((todo) => todo.id === id ? { ...todo, ...params } : todo)
						})
					);

					// Index style
					dispatch(
						todoApi.util.updateQueryData('getTodos', undefined, (draft) => {
							const index = draft.findIndex((todo) => todo.id === id);

							if(index !== -1) {
								draft[index] = {
									...draft[index],
									...params
								};
							}
						})
					);
					*/

					dispatch(
						todoApi.util.updateQueryData('getTodos', undefined, (draft) => {
							return draft.map((todo) => todo.id === id ? { ...todo, ...params } : todo)
						})
					);
				} catch {
					// @TODO: Return error
				}
			},
		}),
		deleteTodo: builder.mutation<void, string>({
			query: (id) => ({
				url: `todos/${id}`,
				method: "DELETE",
			}),
			async onQueryStarted(id, { dispatch, queryFulfilled }) {
				try {
					await queryFulfilled

					/*
					// Filter style
					dispatch(
						todoApi.util.updateQueryData('getTodos', undefined, (draft) => {
							return draft.filter((todo) => todo.id !== id);
						})
					);

					// Index style
					dispatch(
						todoApi.util.updateQueryData('getTodos', undefined, (draft) => {
							const index = draft.findIndex((todo) => todo.id === id);

							if(index !== -1) {
								draft.splice(index, 1);
							}
						})
					);
					*/

					dispatch(
						todoApi.util.updateQueryData('getTodos', undefined, (draft) => {
							return draft.filter((todo) => todo.id !== id);
						})
					);
				} catch {
					// @TODO: Return error
				}
			},
		}),
	}),
});

export const {
	useGetTodosQuery,
	useAddTodoMutation,
	useUpdateTodoMutation,
	useDeleteTodoMutation,
} = todoApi;
