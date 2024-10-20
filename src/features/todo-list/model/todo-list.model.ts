import { ITodo } from "@entities/todo/model/todo.model";

export interface ITodoListStore {
	todos: ITodo[];
	setTodos: (todos: ITodo[]) => void;
	addTodo: (todo: ITodo) => void;
	deleteTodo: (id: number) => void;
	updateTodo: (id: number, newTodo: Partial<ITodo>) => void;
}
