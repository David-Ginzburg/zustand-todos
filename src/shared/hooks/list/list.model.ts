export interface IListModel<T> {
	items: T[];
	setItems: (item: T[]) => void;
	addItem: (item: T) => void;
	deleteItem: (key: number | string) => void;
	updateItem: (key: number | string, newItem: Partial<T>) => void;
}
