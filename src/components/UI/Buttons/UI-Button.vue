<script setup lang="ts">
const props = defineProps<{
  content?: string;
  type: string;
}>();
</script>

<template>
  <button class="ui-button">
    <span>{{ props.content || "Отправить" }}</span>
    <slot></slot>
  </button>
</template>

<style lang="scss"></style>
