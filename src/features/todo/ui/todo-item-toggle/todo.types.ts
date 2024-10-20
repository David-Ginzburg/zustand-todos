import { ITodo } from "@entities/todo/model/todo.model";

export interface ITodoItemToggleProps {
	todo: ITodo;
	isEditing: boolean;
	isTodoLoading: boolean;
	toggleCompletion: () => Promise<void>;
}
