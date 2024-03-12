import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Post from "../views/Post.vue";
import Test from "../views/Test.vue";

const routes = [
  { path: "/test", name: "Test", component: Test },
  { path: "/", name: "Home", component: Home },
  { path: "/post/:id", name: "Post", component: Post },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
