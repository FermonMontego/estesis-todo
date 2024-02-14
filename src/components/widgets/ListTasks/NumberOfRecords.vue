<script setup lang="ts">
import { useTodosStore } from "@/stores/todos";
const storeTodo = useTodosStore();
</script>

<template>
  <h1 class="number-of-records">
    Всего записей: {{ storeTodo.getCountAllTodos }}
  </h1>
</template>

<style lang="scss">
.number-of-records {
  font-size: 14px;
  text-decoration: underline;
  font-weight: 500;
}
</style>
