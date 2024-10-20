import { create } from "zustand";
import { ITodoListStore } from "./todo-list.model";

export const useTodoListStore = create<ITodoListStore>((set) => ({
	todos: [],
	setTodos: (todos) => set({ todos }),
	addTodo: (todo) =>
		set((state) => ({
			todos: [...state.todos, { ...todo, id: Math.floor(Math.random() * (200 - 11 + 1)) + 11 }],
		})),
	deleteTodo: (id) =>
		set((state) => ({
			todos: state.todos.filter((todo) => todo.id !== id),
		})),
	updateTodo: (id, newTodo) =>
		set((state) => ({
			todos: state.todos.map((todo) => (todo.id === id ? { ...todo, ...newTodo } : todo)),
		})),
}));
