import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

// 注册接口插件使用
import api from "./server";
Vue.use(api);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
