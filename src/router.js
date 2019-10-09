import Vue from 'vue'
import Router from 'vue-router'
import AuthRequired from '@/utils/AuthRequired'

Vue.use(Router)

const routes = [
  {
    path: '/',
    component: () => import('./views/app'),
    redirect: '/app/gestion-billet',
    beforeEnter: AuthRequired,
    children: [
      {
        path: 'app/gestion-billet',
        component: () => import('./views/app/gestionBillet')
      },
      {
        path: 'app/gestion-client',
        component: () => import('./views/app/gestionClient')
      },
      {
        path: 'app/gestion-autre',
        component: () => import('./views/app/gestionAutre')
      }
    ]
  },
  { path: '/error', component: () => import('./views/Error') },
  {
    path: '/user',
    component: () => import('./views/user'),
    redirect: '/user/login',
    children: [
      { path: 'login', component: () => import('./views/user/Login') },
      { path: 'register', component: () => import('./views/user/Register') }
    ]
  },
  { path: '*', component: () => import('./views/Error') }
]

const router = new Router({
  linkActiveClass: 'active',
  routes,
  mode: 'history'
})

export default router
