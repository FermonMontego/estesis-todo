<script setup lang="ts">
import { defineAsyncComponent, computed } from "vue";
const props = defineProps<{
  pathName: string;
}>();
/*@vite-ignore*/
const icon = computed(() => {
  const path = `../../../assets/icons/${props.pathName}.svg`;
  return defineAsyncComponent(() => import(/* @vite-ignore */ path));
});
</script>

<template>
  <component :is="icon" class="icon" />
</template>

<style lang="scss"></style>
