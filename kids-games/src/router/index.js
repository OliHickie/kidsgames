import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import PairsView from "../views/PairsView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/pairs",
    name: "pairs",
    component: PairsView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
