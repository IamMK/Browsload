import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";

import BaseDialog from "./components/UI/BaseDialog.vue";

createApp(App)
  .use(createPinia())
  .component("base-dialog", BaseDialog)
  .mount("#app");
