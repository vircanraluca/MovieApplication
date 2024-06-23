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
    path: "/movies",
    component: () => import("@/views/Movies.vue"),
  },
  {
    path: "/favorites",
    component: () => import("@/views/FavoritesMovie.vue"),
  },
  {
    path: "/comments/:id",
    name: "Comments",
    component: () => import("@/views/Comments.vue"), // Adjust the path as needed
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
