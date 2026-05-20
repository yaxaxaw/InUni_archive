import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '@/views/HomePage.vue'
import LoginPage from '@/views/LoginPage.vue'
import RegisterPage from '@/views/RegisterPage.vue'
import TeamsPage from '../views/TeamsPage.vue'

const routes = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/login',
    component: LoginPage,
  },
  {
    path: '/register',
    component: RegisterPage,
  },
  {
    path: '/teams',
    name: 'teams',
    component: TeamsPage
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {

  const token = localStorage.getItem('token')

  const protectedPages = ['/teams']

  const authRequired = protectedPages.includes(to.path)

  if (authRequired && !token) {
    next('/login')
  } else {
    next()
  }
})

export default router
