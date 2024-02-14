import { defineStore } from "pinia";

interface IFormNote {
  title: string;
  tasks: any[];
}

export const useHistoryTodo = defineStore("history", {
  state: () => ({
    history: <any[]>[],
    currentHistoryId: <number>0,
  }),
  getters: {
    getHistory(): any {
      return this.history;
    },
    getCurrentHistoryId(): number {
      return this.currentHistoryId;
    },
  },
  actions: {
    upToHisroty: function (): void {
      if (
        this.getCurrentHistoryId >= 0 &&
        this.getCurrentHistoryId <= this.history.length - 1
      ) {
        if (this.currentHistoryId != this.history.length - 1) {
          this.updateCurrentId("+");
        }
        return this.history[this.getCurrentHistoryId];
      }
    },
    downToHisroty: function (): any {
      if (this.currentHistoryId >= 0) {
        if (this.currentHistoryId > 0) {
          this.updateCurrentId("-");
        }
        return this.history[this.getCurrentHistoryId];
      }
    },
    logHistory: function (historyItem: IFormNote) {
      this.history.push(historyItem);
      this.currentHistoryId = this.history.length - 1;
    },
    updateCurrentId: function (operations: string): number {
      switch (operations) {
        case "+": {
          return (this.currentHistoryId += 1);
        }
        case "-": {
          return (this.currentHistoryId -= 1);
        }
        default: {
          return this.getCurrentHistoryId;
        }
      }
    },
  },
});
