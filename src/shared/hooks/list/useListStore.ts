import { create } from "zustand";
import { IListModel } from "./list.model";

export const createListStore = <T>(key: keyof T) =>
	create<IListModel<T>>((set) => ({
		items: [],
		setItems: (items) => set({ items }),
		addItem: (item) =>
			set((state) => ({
				items: [...state.items, item],
			})),
		deleteItem: (value) =>
			set((state) => ({
				items: state.items.filter((item) => item[key] !== value),
			})),
		updateItem: (itemKey, newitem) =>
			set((state) => ({
				items: state.items.map((item) => (item[key] === itemKey ? { ...item, ...newitem } : item)),
			})),
	}));
