<template>
  <li class="flex gap-1 item-center mb-2">
    <input type="checkbox" v-model="props.done" />
    <span :class="{ done: props.done }">{{ props.text }}</span>
    <button
      @click="$emit('remove-todo')"
      class="bg-red-700 text-white p-2 rounded-md"
    >
      x
    </button>
    <button
      @click="$emit('update-todo')"
      class="bg-blue-700 text-white p-2 rounded-md"
    >
      U
    </button>
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
