import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "@/assets/_main.scss";

if (process.env.NODE_ENV === 'production') {
  app.config.devtools = false; // Disable Vue Devtools
  app.config.productionTip = false; // Disable development mode warnings
}

createApp(App).use(store).use(router).mount("#app");
