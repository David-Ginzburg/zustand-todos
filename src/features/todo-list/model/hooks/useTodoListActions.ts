import { useCallback } from "react";
import { useShallow } from "zustand/react/shallow";
import {
	useUpdateTodoMutation,
	useDeleteTodoMutation,
	useAddTodoMutation,
} from "@entities/todo/api/todo-api";
import { ITodo } from "@entities/todo/model/todo.model";
import { useTodoListStore } from "./useTodoListStore";

export const useTodoListActions = () => {
	const [updateTodoMutation, { isLoading: isTodoUpdating }] = useUpdateTodoMutation();
	const [deleteTodoMutation, { isLoading: isTodoDeleting }] = useDeleteTodoMutation();
	const [addTodoMutation, { isLoading: isTodoAdding }] = useAddTodoMutation();

	const { deleteTodo, updateTodo, addTodo } = useTodoListStore(
		useShallow((state) => ({
			deleteTodo: state.deleteItem,
			updateTodo: state.updateItem,
			addTodo: state.addItem,
		}))
	);

	const handleUpdateTodo = useCallback(
		async (todoId: number, updatedData: Omit<ITodo, "id">) => {
			try {
				const updatedTodo = await updateTodoMutation({
					id: todoId,
					...updatedData,
				}).unwrap();
				updateTodo(todoId, updatedData);
				return updatedTodo;
			} catch (error) {
				if (error) console.error("Failed to update todo:", error);
				throw error;
			}
		},
		[updateTodoMutation, updateTodo]
	);

	const handleDeleteTodo = useCallback(
		async (todoId: number) => {
			try {
				await deleteTodoMutation(todoId).unwrap();
				deleteTodo(todoId);
			} catch (error) {
				if (error) console.error("Failed to delete todo:", error);
				throw error;
			}
		},
		[deleteTodoMutation, deleteTodo]
	);

	const handleAddTodo = useCallback(
		async (newTodoData: Omit<ITodo, "id">) => {
			try {
				const newTodo = await addTodoMutation(newTodoData).unwrap();
				addTodo(newTodo);
				return newTodo;
			} catch (error) {
				if (error) console.error("Failed to add todo:", error);
				throw error;
			}
		},
		[addTodoMutation, addTodo]
	);

	const isTodoLoading = isTodoUpdating || isTodoDeleting || isTodoAdding;

	return {
		handleUpdateTodo,
		handleDeleteTodo,
		handleAddTodo,
		isTodoLoading,
	};
};
