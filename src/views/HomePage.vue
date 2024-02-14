<script setup lang="ts">
import { ref } from "vue";
import CreateNoteForm from "../components/widgets/Forms/CreateNoteForm.vue";
import TaskList from "../components/widgets/ListTasks/ListTasks.vue";

const inputCheckbox = ref<boolean>(false);
</script>
<template>
  <div class="container wrapper-flex">
    <CreateNoteForm />
    <TaskList />
  </div>
</template>
<style lang="scss">
.wrapper-flex {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
