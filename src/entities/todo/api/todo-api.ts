import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ITodo } from "../model/todo.model";

export const todoApi = createApi({
	reducerPath: "todoApi",
	baseQuery: fetchBaseQuery({ baseUrl: "https://jsonplaceholder.typicode.com/" }),
	tagTypes: ["Todo"],
	endpoints: (builder) => ({
		getTodos: builder.query<ITodo[], void>({
			query: () => "todos",
		}),
		addTodo: builder.mutation<ITodo, Partial<ITodo>>({
			query: (newTodo) => ({
				url: "todos",
				method: "POST",
				body: newTodo,
			}),
		}),
		updateTodo: builder.mutation<ITodo, Partial<ITodo>>({
			query: ({ id, ...patch }) => ({
				url: `todos/${id}`,
				method: "PUT",
				body: patch,
			}),
		}),
		deleteTodo: builder.mutation<{ id: number }, number>({
			query: (id) => ({
				url: `todos/${id}`,
				method: "DELETE",
			}),
		}),
	}),
});

export const {
	useGetTodosQuery,
	useAddTodoMutation,
	useUpdateTodoMutation,
	useDeleteTodoMutation,
} = todoApi;
