import { ITodo } from "@entities/todo/model/todo.model";

export interface TodoEditProps {
	todo: ITodo;
	setIsEditing: (editingStatus: boolean) => void;
}
