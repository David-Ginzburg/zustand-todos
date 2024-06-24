import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Todo } from "../types/todo";

export const todoApi = createApi({
	reducerPath: "todoApi",
	baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
	tagTypes: ['todos'],
	endpoints: (builder) => ({
		getTodos: builder.query<Todo[], void>({
			query: () => "todos",
			providesTags: ['todos']
		}),
		addTodo: builder.mutation<Todo, Partial<Todo>>({
			query: (newTodo) => ({
				url: "todos",
				method: "POST",
				body: newTodo
			}),
			invalidatesTags: ['todos']
		}),
		updateTodo: builder.mutation<Todo, Partial<Todo>>({
			query: ({ id, ...patch }) => ({
				url: `todos/${id}`,
				method: "PUT",
				body: patch,
			}),
			async onQueryStarted({ id, ...params }, { dispatch, queryFulfilled }) {
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

					const patch = dispatch(
						todoApi.util.updateQueryData('getTodos', undefined, (draft) => {
							return draft.map((todo) => todo.id === id ? { ...todo, ...params } : todo)
						})
					);
				try {
					await queryFulfilled;
				} catch {
					patch.undo();

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

					const patch = dispatch(
						todoApi.util.updateQueryData('getTodos', undefined, (draft) => {
							return draft.filter((todo) => todo.id !== id);
						})
					);
				try {
					await queryFulfilled
				} catch {
					patch.undo();

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
