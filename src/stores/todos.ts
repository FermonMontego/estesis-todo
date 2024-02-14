import { defineStore } from "pinia";

import { ref, computed, watch } from "vue";

interface IFormNote {
  title: string;
  tasks: any[];
}

interface ITask {
  content: string;
  isComplete: boolean;
}

const checkTodosOnLocalStorage = (): IFormNote[] => {
  if (window.localStorage.getItem("todos")) {
    const dataTodoFromStorage: string | any =
      window.localStorage.getItem("todos");

    return JSON.parse(dataTodoFromStorage);
  }

  return [];
};

export const useTodosStore = defineStore("todos", {
  state: () => ({
    todos: <IFormNote[]>checkTodosOnLocalStorage(),
  }),
  getters: {
    getCountAllTodos(): number {
      return this.todos.length;
    },

    getTodosList(): any[] {
      return this.todos;
    },
  },

  actions: {
    addNoteWithTodos(value: IFormNote) {
      this.todos.unshift({ ...value });
      this.updateTodosOnStorage(this.todos);
    },

    deleteNote(index: number): void {
      this.todos.splice(index, 1);
      this.updateTodosOnStorage(this.todos);
    },

    removingTaskFromNote(todoId: number, taskId: number) {
      this.todos[todoId].tasks.splice(taskId, 1);
      this.updateTodosOnStorage(this.todos);
    },

    updateNoteById(todo: IFormNote, index: number): void {
      this.todos.splice(index, 1, todo);
      this.updateTodosOnStorage(this.todos);
    },

    updateTaskById(todoId: number, taskId: number, task: ITask): void {
      this.todos[todoId].tasks[taskId] = task;
      this.updateTodosOnStorage(this.todos);
    },

    updateTodosOnStorage(todos: IFormNote[]): void {
      window.localStorage.setItem("todos", JSON.stringify(todos));
    },

    getTodoForPageByTodo(id: number): IFormNote {
      return this.todos[id];
    },
  },
});
