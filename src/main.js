import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "lib-flexible"; // 淘宝适配js
import store from "./store";
// 使用自动导入接口
import "./nodeServe/index";
// 导入 ui框架
import Vant from "vant";
import "vant/lib/index.css";
Vue.use(Vant);
Vue.config.productionTip = false;

// 注册接口插件使用
import api from "./server";
Vue.use(api);

// 全局方法
import lib from "./lib";
Vue.use(lib);

// 全局注册过滤器
import filters from "./filters";
Object.keys(filters).forEach(val => {
  Vue.filter(val, filters[val]);
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
