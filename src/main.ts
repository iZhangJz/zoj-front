import { createApp } from "vue";
import App from "./App.vue";
import ArcoVue from "@arco-design/web-vue";
import "@arco-design/web-vue/dist/arco.css";
import router from "./router";
import store from "./store";
import axios from "axios";
import "@/access";
import "bytemd/dist/index.css";
import ArcoVueIcon from "@arco-design/web-vue/es/icon";

axios.defaults.withCredentials = true;

createApp(App)
  .use(store)
  .use(router)
  .use(ArcoVueIcon)
  .use(ArcoVue)
  .mount("#app");
