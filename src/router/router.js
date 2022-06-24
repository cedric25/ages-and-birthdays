import { createRouter, createWebHistory } from 'vue-router'

// Components
import Home from '../views/Home.vue'
import About from '../views/About.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// const router = new VueRouter({
//   mode: 'history',
//   base: import.meta.env.BASE_URL,
//   routes,
// })

export default router
