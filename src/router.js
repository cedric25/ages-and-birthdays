import { createRouter, createWebHistory } from 'vue-router'

import Home from './views/Home/Home.vue'
import About from './views/About.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
