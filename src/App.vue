<script lang="ts" setup>
import { computed, onMounted, ref, watch } from "vue";
import AddIcon from "./components/AddIcon.vue";
import ListItem from "./components/ListItem.vue";
import { store } from "./stores/store";

const title = ref("Lista de tarefas");
const myInput = ref();

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
  store.todos,
  () => {
    localStorage.setItem("todos", JSON.stringify(store.todos));
  },
  { deep: true }
);

onMounted(() => {
  myInput.value.focus();
});
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
          ref="myInput"
        />
        <button
          type="submit"
          class="bg-green-700 w-20 text-center rounded-md text-white text-6xl flex justify-center items-center"
        >
          <AddIcon />
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
          v-model="todo.done"
          @remove-todo="store.remove(index)"
          @update-todo="store.update(index, todo.text)"
          @toggle-todo="store.toggle(index)"
        />
      </ul>
    </div>
  </div>
</template>

<style scoped>
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
