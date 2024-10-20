import { ITodo } from "@entities/todo/model/todo.model";

export interface ITodoListItemProps {
	todo: ITodo;
}

export interface IHandleUpdateProps {
	newTitle: string;
	finishEdit: () => void;
}
