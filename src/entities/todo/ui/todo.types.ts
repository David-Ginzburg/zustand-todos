import { ITodo } from "../model/todo.model";

export interface ITodoItemProps {
	todo: ITodo;
	isTodoLoading: boolean;
	actions: {
		toggleCompletion: () => Promise<void>;
		handleUpdate: ({ newTitle }: { newTitle: string }) => Promise<void>;
		handleCopy: () => Promise<void>;
		handleDelete: () => Promise<void>;
	};
}
