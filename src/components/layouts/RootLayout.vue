<template>
  <div class="flex justify-between my-2">
    <h2 class="text-2xl">Lista de tarefas</h2>
    <div class="flex items-center gap-2">

      <p>Criado com ajuda do ChatGPT</p>
      <a
      href="https://github.com/guidani/vuejs-todo"
      target="_blank"
      class="flex gap-1 items-center bg-slate-900 text-white p-2 rounded-md"
      >source code <i><ExternalLinkIcon /></i>
    </a>
  </div>
  </div>
  <slot></slot>
</template>

<script setup lang="ts">
import ExternalLinkIcon from "../ExternalLinkIcon.vue";
</script>

<style scoped></style>
