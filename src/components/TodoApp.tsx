import React, { useEffect, useState } from "react";
import { useGetTodosQuery, useAddTodoMutation } from "../api/todoApi";
import { useTodoStore } from "../store/useTodoStore";
import { TodoList } from "./TodoList";
import styles from "./styles.module.css";

export const TodoApp: React.FC = () => {
	const [title, setTitle] = useState("");
	const { data: todosFromApi, error, isLoading } = useGetTodosQuery();
	const [addTodo] = useAddTodoMutation();
	const { setTodos, addTodo: addTodoToStore } = useTodoStore();

	useEffect(() => {
		if (todosFromApi) {
			setTodos(todosFromApi.slice(0, 10));
		}
	}, [todosFromApi, setTodos]);

	const handleAddTodo = async () => {
		if (title.trim()) {
			const newTodo = await addTodo({ userId: 1, title, completed: false }).unwrap();
			addTodoToStore(newTodo);
			setTitle("");
		}
	};

	return (
		<div className={styles.todosWrapper}>
			<div>
				<h1>Todo App</h1>
				<div className={styles.todoAdd}>
					<input
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						placeholder="Add a new task"
					/>
					<button onClick={handleAddTodo}>Добавить TODO</button>
				</div>

				{isLoading && <p>Загрузка...</p>}
				{error && <p>Ошибка получения todos</p>}
			</div>
			<TodoList />
		</div>
	);
};
