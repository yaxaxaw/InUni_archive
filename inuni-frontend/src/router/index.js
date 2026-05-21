import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '../pages/HomePage.vue'
import LoginPage from '../pages/LoginPage.vue'
import RegisterPage from '../pages/RegisterPage.vue'
import ProfilePage from '../pages/ProfilePage.vue'
import TeamsPage from '../pages/TeamsPage.vue'
import SwipePage from '../pages/SwipePage.vue'
import ChatPage from '../pages/ChatPage.vue'
import { getToken } from '../utils/token'

const routes = [
  {
    path: "/",
    component: HomePage,
  },
  {
    path: "/login",
    component: LoginPage,
  },
  {
    path: "/register",
    component: RegisterPage,
  },
  {
    path: "/teams",
    component: TeamsPage,
    meta: {
      requiresAuth: true,
    },
  },
  { path: '/hackathons', redirect: (to) => ({ path: '/teams', query: { ...to.query, tab: 'hackathon' } }) },
  { path: '/projects', redirect: (to) => ({ path: '/teams', query: { ...to.query, tab: 'all' } }) },

  {
    path: '/profile',
    component: ProfilePage
  },
  {
    path: '/swipe',
    component: SwipePage }
  ,
  {
    path: '/chat',
    component: ChatPage
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {

  const token = getToken();

  if (to.meta.requiresAuth && !token) {
    next("/login");
    return;
  }

  next();
});

export default router
