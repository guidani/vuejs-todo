<template>
  <li
    class="flex gap-1 items-center mb-2 flex-1 border-b-2 border-slate-600 pb-2"
  >
    <input
      type="checkbox"
      class="checked:accent-green-600 bg-gray-600"
      v-model="isChecked"
      @click="$emit('toggle-todo')"
    />
    <span :class="[{ done: isChecked }, 'flex-1']">{{ text }}</span>
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
import { ref } from "vue";
import EditIcon from "./EditIcon.vue";
import TrashIcon from "./TrashIcon.vue";
const emit = defineEmits(["remove-todo", "update-todo", "toggle-todo"]);
interface Props {
  done: Boolean;
  text: String;
  index: Number;
}
const props = defineProps<Props>();

const isChecked = ref(props.done);
</script>

<style scoped>
.done {
  text-decoration-line: line-through;
}
</style>
