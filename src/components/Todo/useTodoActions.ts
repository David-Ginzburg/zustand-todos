import { useCallback } from "react";
import {
	useUpdateTodoMutation,
	useDeleteTodoMutation,
	useAddTodoMutation,
} from "../../api/todoApi";
import { useTodoStore } from "./useTodoStore";
import { useShallow } from "zustand/react/shallow";
import { Todo } from "./Todo.types";

export const useTodoActions = () => {
	const [updateTodoMutation, { isLoading: isTodoUpdating }] = useUpdateTodoMutation();
	const [deleteTodoMutation, { isLoading: isTodoDeleting }] = useDeleteTodoMutation();
	const [addTodoMutation, { isLoading: isTodoAdding }] = useAddTodoMutation();

	const { deleteTodo, updateTodo, addTodo } = useTodoStore(
		useShallow((state) => ({
			deleteTodo: state.deleteTodo,
			updateTodo: state.updateTodo,
			addTodo: state.addTodo,
		}))
	);

	const handleUpdateTodo = useCallback(
		async (todoId: number, updatedData: Omit<Todo, "id">) => {
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
		async (newTodoData: Omit<Todo, "id">) => {
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
