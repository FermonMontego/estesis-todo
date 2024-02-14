<script setup lang="ts">
import { ref } from "vue";

import { type IFormNote } from "../Forms/CreateNoteForm.interface";

import NumberOfRecords from "./NumberOfRecords.vue";
import UIButton from "@/components/UI/Buttons/UI-Button.vue";

import { useTodosStore } from "@/stores/todos";
import { useRouter } from "vue-router";
const storeTodos = useTodosStore();

const currentDeleteNoteId = ref<number | null>(null);
const currentEditNoteId = ref<number | unknown>(null);

const router = useRouter();

const deleteNote = (index: number | any) => {
  if (currentDeleteNoteId.value == null)
    return (currentDeleteNoteId.value = index);
  storeTodos.deleteNote(index);
  currentDeleteNoteId.value = null;
};

const selectItemToRouteCard = (index: number) => {
  router.push({
    name: "TodoById",
    params: {
      id: index,
    },
  });
};

const selectEditNoteId = (index: number) => {
  currentEditNoteId.value = index;
};

const accessEditToUpdate = (todo: IFormNote, index: number) => {
  storeTodos.updateNoteById(todo, index);
  currentEditNoteId.value = null;
};
</script>

<template>
  <NumberOfRecords />
  <div class="list-tasks">
    <div
      class="list-tasks__item"
      v-for="(todo, index) in storeTodos.getTodosList"
      :key="index"
      @click.stop="selectItemToRouteCard(index)"
    >
      <div class="list-tasks__item__delete">
        <ui-icon
          v-if="currentEditNoteId != index"
          :pathName="'editIcon'"
          @click.stop="selectEditNoteId(index)"
        ></ui-icon>
        <ui-icon
          v-else
          :pathName="'accessIcon'"
          @click.stop="accessEditToUpdate(todo, index)"
        ></ui-icon>
        <ui-icon
          :pathName="'closeIcon'"
          @click.stop="deleteNote(index)"
        ></ui-icon>
      </div>

      <h3 v-if="currentEditNoteId != index">{{ todo.title }}</h3>
      <ui-input
        v-else
        v-model="todo.title"
        type="text"
        placeholder="Заголовок"
        @click.stop="() => {}"
      ></ui-input>
      <ul>
        <li v-for="(task, key_index) in todo.tasks" :key="key_index">
          <template v-if="currentEditNoteId == index">
            <ui-input
              class="ui-input-edit"
              v-model="task.content"
              type="text"
              placeholder="Заполинте пункт"
              @click.stop="() => {}"
            ></ui-input>
          </template>
          <template v-else>
            {{ task.content }}
          </template>
        </li>
      </ul>
    </div>
  </div>

  <ui-modal
    v-if="currentDeleteNoteId != null"
    @close="currentDeleteNoteId = null"
  >
    <div class="">
      <UIButton
        @click.stop="deleteNote(currentDeleteNoteId)"
        type="button"
        content="Удалить"
      />
      <a @click="currentDeleteNoteId = null">Нет, отмена</a>
    </div>
  </ui-modal>
</template>

<style lang="scss">
.list-tasks {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 12px;

  &__item {
    border-radius: 8px;
    padding: 16px;
    border: 1px solid #339999;
    position: relative;
    overflow: hidden;

    &:hover {
      background-color: rgb(51, 153, 153, 0.25);
      cursor: pointer;
    }

    h3 {
      margin-bottom: 12px;
      font-size: 16px;
      font-weight: 500;
    }

    ul {
      display: flex;
      flex-direction: column;
      gap: 4px;
      li {
        font-size: 14px;
        font-weight: 300;
        position: relative;
        padding-left: 12px;
        &:after {
          content: "";
          position: absolute;
          top: 50%;
          left: 0;
          border-radius: 50%;
          width: 4px;
          height: 4px;
          background-color: black;
          transform: translateY(-50%);
        }
      }
    }

    &__delete {
      background: #fff;
      position: absolute;
      top: 0;
      right: 0;
      cursor: pointer;
      height: 32px;
      width: 64px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      border-radius: 0px 0px 0px 8px;
      border-left: 1px solid #339999;
      border-bottom: 1px solid #339999;
    }
  }
}

.ui-input-edit {
  input {
    border: none !important;
    border-radius: 0px;
    background-color: transparent;
    border-bottom: 1px solid #339999 !important;
    background-color: transparent;
    padding: 0;
  }
}
</style>
