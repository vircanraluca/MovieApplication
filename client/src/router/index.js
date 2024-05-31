// Composables
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "",
        name: "Home",
        component: () => import("@/views/Home.vue"),
      },
    ],
  },
  {
    path: "/login",
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/register",
    component: () => import("@/views/Register.vue"),
  },
  {
    path: "/watchlist",
    component: () => import("@/views/WatchList.vue"),
  },
  {
    path: "/favorites",
    component: () => import("@/views/FavoritesMovie.vue"),
  },
  {
    path: "/about",
    component: () => import("@/views/AboutPage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
