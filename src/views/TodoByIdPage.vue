<script setup lang="ts">
import UIButton from "@/components/UI/Buttons/UI-Button.vue";

import { reactive, ref, type Ref, watch, onMounted } from "vue";
import { useTodosStore } from "@/stores/todos";
import { useHistoryTodo } from "@/stores/historyTodo";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const storeTodos = useTodosStore();
const storeHistory = useHistoryTodo();

interface IFormNote {
  title: string;
  tasks: any[];
}

interface ITask {
  content: string;
  isComplete: boolean;
}

const currentDeleteNoteId = ref<number | null>(null);
const todo = ref<IFormNote>({
  ...storeTodos.getTodoForPageByTodo(Number(route.params.id)),
});
const isEditNote = ref<boolean>(false);
const isEditTask = ref<number | null>(null);
const referenceTodo = ref<IFormNote>(JSON.parse(JSON.stringify(todo.value)));
const cancelEditAccessShow = ref<boolean>(false);

onMounted(() => {
  document.addEventListener("keyup", keyupHandler);
  todoLogHandler(JSON.parse(JSON.stringify(todo.value)));
});

const deleteNoteById = (): void => {
  if (currentDeleteNoteId.value == null) {
    currentDeleteNoteId.value = Number(route.params.id);
    changeSomethings();
  }
};

const deleteNote = (id: number): void => {
  storeTodos.deleteNote(id);
  router.push({ name: "Home" });
};

const updateNoteById = (todo: IFormNote, id: number) => {
  storeTodos.updateNoteById(todo, Number(route.params.id));
  isEditNote.value = false;
  changeSomethings();
};

const editNoteToggle = () => {
  isEditNote.value = true;
};

const removingTaskFromNote = (todoId: number, taskId: number) => {
  storeTodos.removingTaskFromNote(todoId, taskId);
  changeSomethings();
};

const editTask = (id: number) => {
  isEditTask.value = id;
};

const checkedTaskComplete = () => {
  updateNoteById(todo.value, Number(route.params.id));
};

const accessEditTask = (todoId: number, taskId: number, task: ITask) => {
  storeTodos.updateTaskById(todoId, taskId, task);
  isEditTask.value = null;
  changeSomethings();
};

const cancelEdit = () => {
  if (!cancelEditAccessShow.value) {
    return (cancelEditAccessShow.value = true);
  }
  updateNoteById(referenceTodo.value, Number(route.params.id));
  todo.value = storeTodos.getTodoForPageByTodo(Number(route.params.id));
  cancelEditAccessShow.value = false;
  changeSomethings();
};

const keyupHandler = (event: any): void => {
  if (event.ctrlKey && event.key === "z") {
    undoHandler();
  } else if (event.ctrlKey && event.key === "y") {
    redoHandler();
  }
};

const todoLogHandler = (value: any): void => {
  storeHistory.logHistory(value);
};

const undoHandler = (): void => {
  todo.value = JSON.parse(JSON.stringify(storeHistory.downToHisroty()));
};
const redoHandler = (): void => {
  todo.value = JSON.parse(JSON.stringify(storeHistory.upToHisroty()));
};

const changeSomethings = (): void => {
  todoLogHandler(JSON.parse(JSON.stringify(todo.value)));
};
</script>
<template>
  <div class="container todo-by-id">
    <h3>
      <template v-if="isEditNote">
        <ui-input
          v-model="todo.title"
          type="text"
          placeholder="Заголовок"
          @change="updateNoteById(todo, Number(route.params.id))"
        ></ui-input>
      </template>
      <template v-else>
        {{ todo.title }}
      </template>
      <span
        style="margin-left: auto; margin-right: 24px; color: orange"
        @click="cancelEdit"
      >
        Отменить редактирование
      </span>
      <span style="margin-right: 24px; color: #bbb" @click="editNoteToggle">
        <ui-icon pathName="editIcon"></ui-icon>
        Редактировать запись
      </span>
      <span @click="deleteNoteById">
        <ui-icon pathName="closeIcon"></ui-icon>
        Удалить запись
      </span>
    </h3>

    <ul>
      <li v-for="(task, index) in todo.tasks" :key="index">
        <ui-icon
          v-if="isEditTask == index"
          pathName="accessIcon"
          @click="accessEditTask(Number(route.params.id), index, task)"
        ></ui-icon>
        <ui-icon v-else pathName="editIcon" @click="editTask(index)"></ui-icon>
        <ui-icon
          pathName="closeIcon"
          @click="removingTaskFromNote(Number(route.params.id), index)"
        ></ui-icon>
        <ui-input
          v-if="isEditTask == index"
          v-model="task.content"
          type="text"
          placeholder="Опишите пункт"
        ></ui-input>
        <ui-checkbox
          v-else
          v-model="task.isComplete"
          :label="task.content"
          :is_line_through="Boolean(task.isComplete)"
          :line_through_option="true"
          @input="checkedTaskComplete()"
        ></ui-checkbox>
      </li>
    </ul>
  </div>

  <ui-modal
    v-if="cancelEditAccessShow == true"
    @close="cancelEditAccessShow = false"
  >
    <div class="">
      <UIButton
        @click.stop="cancelEdit"
        type="button"
        content="Отменить редактирование"
      />
      <a @click="cancelEditAccessShow = false">Нет, продолжить</a>
    </div>
  </ui-modal>

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
.todo-by-id {
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 32px;

  h3 {
    font-size: 21px;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: space-between;

    span {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 16px;
      color: tomato;
      font-weight: 300;
      cursor: pointer;
    }
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 8px;

    li {
      display: flex;
      align-items: center;
      gap: 8px;
    }
  }
}
</style>
