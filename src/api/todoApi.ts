import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Todo {
	userId: number;
	id: number;
	title: string;
	completed: boolean;
}

export const todoApi = createApi({
	reducerPath: "todoApi",
	baseQuery: fetchBaseQuery({ baseUrl: "https://jsonplaceholder.typicode.com/" }),
	tagTypes: ["Todo"],
	endpoints: (builder) => ({
		getTodos: builder.query<Todo[], void>({
			query: () => "todos",
		}),
		addTodo: builder.mutation<Todo, Partial<Todo>>({
			query: (newTodo) => ({
				url: "todos",
				method: "POST",
				body: newTodo,
			}),
		}),
		updateTodo: builder.mutation<Todo, Partial<Todo>>({
			query: ({ id, ...patch }) => ({
				url: `todos/${id}`,
				method: "PUT",
				body: patch,
			}),
		}),
		deleteTodo: builder.mutation<{ success: boolean; id: number }, number>({
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
