import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Todo } from "../types/todo";

export const todoApi = createApi({
	reducerPath: "todoApi",
	baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
	tagTypes: ['todos'],
	endpoints: (builder) => ({
		getTodos: builder.query<Todo[], void>({
			query		: () => "todos",
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
			invalidatesTags: ['todos']
		}),
		deleteTodo: builder.mutation<void, string>({
			query: (id) => ({
				url: `todos/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ['todos']
		}),
	}),
});

export const {
	useGetTodosQuery,
	useAddTodoMutation,
	useUpdateTodoMutation,
	useDeleteTodoMutation,
} = todoApi;
