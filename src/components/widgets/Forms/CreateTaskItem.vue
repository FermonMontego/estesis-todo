<script setup lang="ts">
defineProps<{
  data: any[];
}>();

const deleteTask = (index: number) => {
  emit("deleteTask", index);
};

const emit = defineEmits<{
  (e: "deleteTask", index: number): void;
}>();
</script>

<template>
  <form class="create-task-form">
    <ol class="create-task-form__list">
      <li
        class="create-task-form__list__item"
        v-for="(list, index) in data"
        :key="index"
      >
        <span>{{ index + 1 }}</span>
        <ui-input
          v-model="list.content"
          type="text"
          placeholder="Опишите пункт"
        ></ui-input>
        <div
          class="create-task-form__list__item__delete"
          @click="deleteTask(index)"
        >
          <ui-icon :pathName="'closeIcon'"></ui-icon>
        </div>
      </li>
    </ol>
  </form>
</template>

<style lang="scss">
.create-task-form {
  .input-label {
    width: 100%;
  }

  &__list {
    li {
      display: flex;
      align-items: center;

      & > span {
        height: 40px;
        width: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #bbb;
        background: #fff;
        border-radius: 8px 0 0 8px;
        line-height: 0;
      }

      input {
        border-radius: 0px 0px 0px 0;
        border-left: 0px;
        border-right: 0px;
      }
    }

    &__item {
      &__delete {
        height: 40px;
        width: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #bbb;
        background: #fff;
        border-radius: 0px 8px 8px 0px;
        line-height: 0;

        &:hover {
          box-shadow: 0px 0px 0px 3px rgba(255, 99, 71, 0.25);
        }
      }
    }
  }
}
</style>
