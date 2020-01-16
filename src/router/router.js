import Vue from 'vue'
import Router from 'vue-router'

/**
 * 路由出口文件
 * 王圣哲
 */

// 获取所有的路由文件
// const routerFile = require.context("./", true, "/.js$/");

Vue.use(Router)
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/logindev/logindev.vue') // 惰性加载
    }
  ]
})
