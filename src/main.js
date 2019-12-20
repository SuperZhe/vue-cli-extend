import Vue from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/reset.css'
import 'element-ui/lib/theme-chalk/index.css'
Vue.config.productionTip = false

Vue.use(Element)
// 注册接口插件使用
import api from './server'
Vue.use(api)
import * as Sentry from '@sentry/browser'
import * as Integrations from '@sentry/integrations'

Sentry.init({
  dsn: 'https://9e9d66afce3a4310bb93e61e3fd79d99@sentry.io/1863066',
  integrations: [new Integrations.Vue({ Vue, attachProps: true })]
})
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
