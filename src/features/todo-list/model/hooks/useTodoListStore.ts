import { ITodo } from "@entities/todo/model/todo.model";
import { createListStore } from "@shared/hooks/list/useListStore";

export const useTodoListStore = createListStore<ITodo>("id");
