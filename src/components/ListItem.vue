<template>
  <li
    class="flex gap-1 items-center mb-2 flex-1 border-b-2 border-slate-600 pb-2"
  >
    <input
      type="checkbox"
      v-model="props.done"
      class="checked:accent-green-600 bg-gray-600"
    />
    <span :class="[{ 'done': props.done }, 'flex-1']">{{
      props.text
    }}</span>
    <button
      @click="$emit('remove-todo')"
      class="bg-red-700 text-white p-2 rounded-md"
    >
      <TrashIcon />
    </button>
    <button
      @click="$emit('update-todo')"
      class="bg-blue-700 text-white p-2 rounded-md"
    >
      <EditIcon />
    </button>
  </li>
</template>

<script setup lang="ts">
import EditIcon from "./EditIcon.vue";
import TrashIcon from "./TrashIcon.vue";
const emit = defineEmits(["remove-todo", "update-todo"]);
interface Props {
  done: Boolean;
  text: String;
  index: Number;
}
const props = defineProps<Props>();
</script>

<style scoped>
.done{
  text-decoration-line: line-through;
}
</style>
