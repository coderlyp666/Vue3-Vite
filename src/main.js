import { createApp } from "vue";
import "./style.css";
import "../src/assets/css/index.less";
import router from "./router";
import ElementPlus from "element-plus";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import "element-plus/dist/index.css";
import iconFun from "./global/icon";

import App from "./App.vue";

const app = createApp(App);
app.use(router);
app.use(iconFun);
app.use(ElementPlus, {
  locale: zhCn,
});
app.mount("#app");
