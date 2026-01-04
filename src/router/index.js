import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import EnginePage from '../views/EnginePage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/engine/:id',
    name: 'Engine',
    component: EnginePage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

