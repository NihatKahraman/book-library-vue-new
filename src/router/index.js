import { createRouter, createWebHistory } from 'vue-router'
import BookList from '../views/books/BookList.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: BookList
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
