import { reactive } from "vue";
import { ITodo } from "../types/Todo";

export const store = reactive({
  todos: <ITodo[]>[],
  savedTodos: localStorage.getItem("todos"),
  remove(index: number) {
    this.todos.splice(index, 1);
  },
  add(text: string) {
    this.todos.push({
      text,
      done: false,
    });
  },
});
