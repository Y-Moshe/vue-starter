import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/home-view.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: 'home',
      path: '/home',
      component: HomeView,
    },
    {
      name: 'login',
      path: '/auth/login',
      component: () => import('../views/auth-view.vue'),
      props: { isLogin: true },
    },
    {
      name: 'signup',
      path: '/auth/signup',
      component: () => import('../views/auth-view.vue'),
      props: { isLogin: false },
    },
  ],
})

export default router
