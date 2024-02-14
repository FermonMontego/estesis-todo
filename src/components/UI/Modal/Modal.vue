<script setup lang="ts">
import { ref } from "vue";
// const emit = defineEmits<{
//   (e: "close");
// }>();
</script>

<template>
  <div class="overlay-modal">
    <div class="modal">
      <span @click="emit('close')" class="modal__close">
        <ui-icon pathName="closeIcon"></ui-icon>
      </span>
      <div class="modal__wrapper">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.modal {
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid #bbb;
  position: absolute;
  top: 50%;
  left: 50%;
  max-width: 500px;

  transform: translate(-50%, -50%);
  z-index: 5;

  &__close {
    position: absolute;
    top: 15px;
    right: 15px;
    cursor: pointer;
  }

  &__wrapper {
    padding: 24px;
  }
}

.overlay-modal {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.15);
  z-index: 4;
}
</style>
