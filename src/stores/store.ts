import { reactive } from "vue";
import { ITodo } from "../types/Todo";

export const store = reactive({
  newTodo: "",
  todos: <ITodo[]>[],
  savedTodos: localStorage.getItem("todos"),
  remove(index: number) {
    this.todos.splice(index, 1);
  },
  add() {
    const text = this.newTodo.trim();
    if (text) {
      this.todos.push({
        text,
        done: false,
      });
      this.newTodo = "";
    }
  },
  update(index: number, todo: string){
    this.newTodo = todo
    this.remove(index)
  }
});
