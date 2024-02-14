<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  modelValue: boolean;
  disabled?: boolean;
  label: string;
  line_through_option?: boolean;
  is_line_through?: boolean;
}>();

const canLineThroughOption = computed((): boolean => {
  if (props.line_through_option) {
    return props.is_line_through;
  }

  return false;
});

const emit = defineEmits(["update:modelValue"]);
</script>

<template>
  <label class="ui-custom-checkbox">
    <input
      :value="props.modelValue"
      type="checkbox"
      :checked="props.modelValue"
      :disabled="props.disabled"
      @input="
        emit('update:modelValue', ($event.target as HTMLInputElement).checked)
      "
    />
    <span></span>
    <p :class="{ 'line-through': canLineThroughOption }">{{ props.label }}</p>
  </label>
</template>

<style lang="scss">
.ui-custom-checkbox {
  display: flex;
  align-items: center;
  gap: 8px;

  input {
    display: none;
    appearance: none;

    &:checked {
      & + span {
        background-color: #339999;
      }
    }
  }

  span {
    width: 20px;
    height: 20px;
    display: block;
    border: 1px solid #bbb;
  }

  p {
    font-size: 14px;
    font-weight: 300;
  }
}

.line-through {
  text-decoration: line-through;
}
</style>
