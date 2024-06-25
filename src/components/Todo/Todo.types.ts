export interface Todo {
	userId: number;
	id: number;
	title: string;
	completed: boolean;
}

export interface TodoItemProps {
	todo: Todo;
}

export interface TodoItemEditProps {
	todo: Todo;
	setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface TodoState {
	todos: Todo[];
	setTodos: (todos: Todo[]) => void;
	addTodo: (todo: Todo) => void;
	deleteTodo: (id: number) => void;
	updateTodo: (id: number, newTodo: Partial<Todo>) => void;
}
