import { ITodo } from "../model/todo.model";

export interface ITodoItemProps {
	todo: ITodo;
	isTodoLoading: boolean;
	actions: {
		toggleCompletion: () => void;
		handleUpdate: ({ newTitle, finishEdit }: { newTitle: string; finishEdit: () => void }) => void;
		handleCopy: () => void;
		handleDelete: () => void;
	};
}
