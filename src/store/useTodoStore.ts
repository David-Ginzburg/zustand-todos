import { create } from "zustand";

interface Todo {
	userId: number;
	id: number;
	title: string;
	completed: boolean;
}

interface TodoState {
	todos: Todo[];
	setTodos: (todos: Todo[]) => void;
	addTodo: (todo: Todo) => void;
	deleteTodo: (id: number) => void;
	updateTodo: (id: number, newTodo: Partial<Todo>) => void;
}

export const useTodoStore = create<TodoState>((set) => ({
	todos: [],
	setTodos: (todos) => set({ todos }),
	addTodo: (todo) =>
		set((state) => ({
			todos: [...state.todos, { ...todo, id: Math.floor(Math.random() * 10000) }],
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
