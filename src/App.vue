<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import { store } from "./stores/store";

const title = ref("Lista de tarefas");

const newTodo = ref<string>("");

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

const addTodo = () => {
  const text = newTodo.value.trim();
  if (text) {
    store.add(text);
    newTodo.value = "";
  }
};

const updateTodo = (index: number, todo: string) => {
  newTodo.value = todo;
  store.remove(index);
};
</script>

<template>
  <div class="todo-list">
    <h2>{{ title }}</h2>
    <span>Criado com ajuda do ChatGPT</span>
    <form @submit.prevent="addTodo">
      <input type="text" v-model="newTodo" placeholder="Add a new todo..." />
      <button type="submit">Add</button>
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
      <TransitionGroup name="list" tag="ul">
        <li v-for="(todo, index) in filteredTodos" :key="index">
          <input type="checkbox" v-model="todo.done" />
          <span :class="{ done: todo.done }">{{ todo.text }}</span>
          <button @click="store.remove(index)" class="btn-del">x</button>
          <button @click="updateTodo(index, todo.text)" class="btn-del">
            U
          </button>
        </li>
      </TransitionGroup>
    </ul>
  </div>
</template>

<style scoped>
.todo-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

h2 {
  font-size: 2rem;
}

form {
  display: flex;
  gap: 1rem;
}

ul {
  list-style: none;
  padding-left: 0;
}

li {
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: 10px;
}

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
