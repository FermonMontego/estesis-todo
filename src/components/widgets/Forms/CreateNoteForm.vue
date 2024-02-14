<script setup lang="ts">
import UIButton from "@/components/UI/Buttons/UI-Button.vue";
import CreateTaskItem from "@/components/widgets/Forms/CreateTaskItem.vue";

import { useTodosStore } from "@/stores/todos";

const storeTodos = useTodosStore();

import { type IFormNote, type ITaskExample } from "./CreateNoteForm.interface";

import { computed, ref } from "vue";

const disabledCreate = computed(() => {
  return (
    !Boolean(createNoteForm.value.title.length) ||
    !Boolean(createNoteForm.value.tasks.length) ||
    createNoteForm.value.tasks.filter((item) => !item.content).length > 0
  );
});

const clearNoteForm = (): void => {
  createNoteForm.value = {
    title: "",
    tasks: [],
  };
};

const itemTaskExample = ref({
  content: "",
  isComplete: false,
});

const createNoteForm = ref<IFormNote>({
  title: "",
  tasks: [],
});

const addEmptyTask = (empty_task: ITaskExample) => {
  createNoteForm.value.tasks.push({ ...empty_task });
};

const deleteTaskById = (index: number) => {
  createNoteForm.value.tasks.splice(index, 1);
};

const addNoteWithTodoToList = (note_form: IFormNote) => {
  storeTodos.addNoteWithTodos({ ...note_form });
  clearNoteForm();
};
</script>

<template>
  <form class="create-note-form">
    <ui-input
      v-model="createNoteForm.title"
      :type="'text'"
      placeholder="Введите название заметки"
    ></ui-input>

    <hr class="create-note-form__line" />

    <CreateTaskItem
      :data="createNoteForm.tasks"
      @deleteTask="(index) => deleteTaskById(index)"
    />
    <UIButton
      :type="'button'"
      content="Добавить задачу"
      class="add-note-button"
      @click.prevent.stop="addEmptyTask(itemTaskExample)"
    >
      <ui-icon :pathName="'addIcon'"></ui-icon>
    </UIButton>
    <UIButton
      :type="'button'"
      content="Создать заметку"
      :disabled="disabledCreate"
      @click.stop.prevent="addNoteWithTodoToList(createNoteForm)"
    />
  </form>
</template>

<style lang="scss">
.create-note-form {
  padding: 16px;
  background-color: #eee;
  margin-top: 24px;
  border-radius: 8px;

  &__line {
    height: 1px;
    background-color: #fff;
    margin: 0;
    border: none;
  }
}

.add-note-button {
  background-color: #fff;
  border: 1px solid #339999;
  span {
    color: #339999;
  }
}
</style>
