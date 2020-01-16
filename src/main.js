import Vue from 'vue'
import Raven from 'raven-js'
import RavenVue from 'raven-js/plugins/vue'
import App from './App.vue'
import router from './router/router'
import store from './vuex/store'
Vue.config.productionTip = false;
window.$Raven = Raven
// Vue.use(Element)
// 注册接口插件使用
import api from './server'
Vue.use(api)
Raven.config(
    'https://8f4a23680c8744b382da02c4fc004941@sentry.io/1879049', {
      environment: process.env.NODE_ENV
    }, {
      release: 'vue-cli 1.0'
    }
  )
  .addPlugin(RavenVue, Vue)
  .install()
Vue.config.errorHandler = function (err, vm, info) {
  Raven.captureException(err)
}
// 全局方法
import lib from './lib'
Vue.use(lib)

// 全局注册过滤器
import filters from './filters'
Object.keys(filters).forEach(val => {
  Vue.filter(val, filters[val])
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')