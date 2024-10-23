type key<T> = T[keyof T];

export interface IListModel<T> {
	items: T[];
	selected: key<T>[];
	setItems: (item: T[]) => void;
	addItem: (item: T) => void;
	deleteItem: (key: key<T>) => void;
	updateItem: (key: key<T>, newItem: Partial<T>) => void;
	clearSelection: () => void;
	selectAll: () => void;
	toggleSelection: (key: key<T>) => void;
	isEmptyList: () => boolean;
	isAllSelected: () => boolean;
	isSomeSelected: () => boolean;
}
