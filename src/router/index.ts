import { createRouter, createWebHistory } from "vue-router";

import Home from "@/views/HomePage.vue";
import TodoByIdPage from "@/views/TodoByIdPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/todo/:id",
      name: "TodoById",
      component: TodoByIdPage,
      beforeEnter: (to, from, next) => {
        next();
      },
    },
  ],
});

export default router;
