import { Todo } from "./todo";

export interface TodoState {
	todos: Todo[];
	setTodos: (todos: Todo[]) => void;
	addTodo: (todo: Todo) => void;
	deleteTodo: (id: number) => void;
	updateTodo: (id: number, newTodo: Partial<Todo>) => void;
}
