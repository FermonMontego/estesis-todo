// COMPONENTS IMPORT

import UIIcon from "./components/UI/Icons/UI-Icon.vue";
import UIInput from "./components/UI/Inputs/Input/Index.vue";
import Modal from "./components/UI/Modal/Modal.vue";
import Checkbox from "./components/UI/Inputs/Checkbox/Index.vue";
// END COMPONENTS IMPOT

import { createApp } from "vue";
import { createPinia } from "pinia";

import "@/assets/styles/main.scss";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.component("ui-icon", UIIcon);
app.component("ui-input", UIInput);
app.component("ui-modal", Modal);
app.component("ui-checkbox", Checkbox);

app.mount("#app");
