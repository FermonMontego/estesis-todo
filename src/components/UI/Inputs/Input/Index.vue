<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  type: string;
  maxlength?: number;
  minlength?: number;
  disabled?: boolean;
  title?: string;
  placeholder: string;
  modelValue: string;
}>();

const emit = defineEmits(["update:modelValue"]);
</script>

<template>
  <label class="input-label">
    <span>{{ title }}</span>
    <input
      :value="props.modelValue"
      :type="type"
      :placeholder="placeholder"
      @input="
        emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
    />
  </label>
</template>

<style lang="scss">
.input-label {
  margin: 12px 0px;
  display: block;

  & > span {
    font-size: 14px;
  }

  input {
    border: 1px solid #bbb;
    outline: none;
    max-width: 100%;
    width: 100%;
    background-color: #fff;
    border-radius: 8px;
    height: 40px;
    padding: 0px 24px;
  }
}
</style>
