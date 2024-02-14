<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>
<template>
  <header class="header">
    <div class="header__wrapper container">
      <RouterLink to="/">TEST TASK FROM ESTESIS</RouterLink>
    </div>
  </header>
</template>

<style lang="scss">
.header {
  padding: 24px;
  box-shadow: 0px 0px 3px #bbb;

  &__wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
