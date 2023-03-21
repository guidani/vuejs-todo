<template>
  <li>
    <input type="checkbox" v-model="props.done" />
    <span :class="{ done: props.done }">{{ props.text }}</span>
    <button @click="$emit('remove-todo')" class="btn-del">x</button>
    <button @click="$emit('update-todo')" class="btn-del">U</button>
  </li>
</template>

<script setup lang="ts">
const emit = defineEmits(["remove-todo", "update-todo"]);
interface Props {
  done: Boolean;
  text: String;
  index: Number;
}

const props = defineProps<Props>();
</script>

<style scoped></style>
