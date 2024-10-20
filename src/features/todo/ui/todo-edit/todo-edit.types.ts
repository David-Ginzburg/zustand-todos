import { ITodo } from "@entities/todo/model/todo.model";

export interface TodoEditProps {
	todo: ITodo;
	setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
	isTodoLoading: boolean;
	handleUpdate: ({ newTitle, finishEdit }: { newTitle: string; finishEdit: () => void }) => void;
}
