<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import ListItem from "./components/ListItem.vue";
import { store } from "./stores/store";
import AddIcon from './components/AddIcon.vue';

const title = ref("Lista de tarefas");

const hideCompleted = ref(false);

// Load todos from localStorage
const savedTodos = localStorage.getItem("todos");
if (savedTodos) {
  store.todos = JSON.parse(savedTodos);
}

const filteredTodos = computed(() => {
  return hideCompleted.value
    ? store.todos.filter((t: { done: boolean }) => !t.done)
    : store.todos;
});

// Watch for changes to todos and save to localStorage
watch(
  () => store.todos,
  () => {
    localStorage.setItem("todos", JSON.stringify(store.todos));
  },
  { deep: true }
);
</script>

<template>
  <div class="container mx-auto">
    <div class="flex flex-col gap-2">
      <div class="flex justify-between">

        <h2 class="text-2xl">{{ title }}</h2>
        <p>Criado com ajuda do ChatGPT</p>
      </div>
      <form @submit.prevent="store.add()" class="flex gap-2">
        <input
          type="text"
          v-model="store.newTodo"
          placeholder="Add a new todo..."
          class="outline-1 outline-slate-900 border pl-2 py-2 flex-1"
        />
        <button type="submit" class="bg-green-700 p-2 rounded-md text-white">
           <AddIcon/>
        </button>
      </form>
      <p v-if="store.todos.length === 0">Adicione uma tarefa para continuar!</p>
      <button
        @click="hideCompleted = !hideCompleted"
        v-if="store.todos.length !== 0"
        class="toggle"
      >
        {{ hideCompleted ? "Exibir todos" : "Ocultar completos" }}
      </button>
      <ul>
        <ListItem
          v-for="(todo, index) in filteredTodos"
          :done="todo.done"
          :index="index"
          :text="todo.text"
          @remove-todo="store.remove(index)"
          @update-todo="store.update(index, todo.text)"
        />
      </ul>
    </div>
  </div>
</template>

<style scoped>
/* .todo-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
} */

.btn-del {
  background-color: red;
  text-transform: capitalize;
}

span {
  margin-left: 10px;
}

.done {
  text-decoration: line-through;
}

input[type="checkbox"] {
  margin-right: 10px;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.1s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
