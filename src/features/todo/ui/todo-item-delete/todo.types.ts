export interface ITodoItemDeleteProps {
	isTodoLoading: boolean;
	handleDelete: () => Promise<void>;
}
