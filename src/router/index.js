import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/pages/home'
import store from '@/components/pages/store'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/store',
      name: 'store',
      component: store
    }
  ]
})
