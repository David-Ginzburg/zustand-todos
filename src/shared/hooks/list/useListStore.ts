import { create } from "zustand";
import { IListModel } from "./list.model";

export const createListStore = <T>(key: keyof T) =>
	create<IListModel<T>>((set, get) => ({
		items: [],
		selected: [],
		setItems: (items) => set({ items }),
		addItem: (item) =>
			set((state) => ({
				items: [...state.items, item],
			})),
		deleteItem: (value) =>
			set((state) => ({
				items: state.items.filter((item) => item[key] !== value),
				selected: state.selected.filter((item) => item !== value),
			})),
		updateItem: (itemKey, newitem) =>
			set((state) => ({
				items: state.items.map((item) => (item[key] === itemKey ? { ...item, ...newitem } : item)),
			})),
		clearSelection: () => set({ selected: [] }),
		selectAll: () => set((state) => ({ selected: state.items.map((item) => item[key]) })),
		toggleSelection: (itemKey) =>
			set((state) => {
				const isSelected = state.selected.some((item) => item === itemKey);

				return {
					selected: isSelected
						? state.selected.filter((item) => item !== itemKey)
						: [...state.selected, itemKey],
				};
			}),
		isEmptyList: () => get().selected.length === 0,
		isAllSelected: () => get().selected.length === get().items.length,
		isSomeSelected: () => get().selected.length > 0 && get().selected.length < get().items.length,
	}));
