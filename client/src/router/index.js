import Vue from 'vue'
import Router from 'vue-router'
import AuthGuard from './auth-guard'
import Login from '@/components/Login'
import Dashboard from '@/components/Dashboard'
import PageNotFound from '@/components/PageNotFound'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
      beforeEnter: AuthGuard
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '*',
      component: PageNotFound
    }
  ],
  mode: 'history'
})
