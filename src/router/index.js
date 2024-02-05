import { createRouter, createWebHistory} from 'vue-router'
import axios from 'axios'


const requireAuth = (to, from, next) => {
  const userToken = sessionStorage.getItem("userToken");
  if(userToken) {
    axios.post('https://localhost:7227/api/authentication/authenticate', { 
    headers: {
      'Authorization': 'Bearer ' + userToken
    } 
  })
  .then(response => {
    sessionStorage.setItem("isUserAuthenticated", true)
    console.log("authenticated")
    next();
  })
  .catch(error => {
    router.push({name: "login"})
  })
  }
  // this.$root.$emit("authentication", true)
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import( '../views/Home.vue'),
    beforeEnter: requireAuth,
  },
  {
    path: '/about',
    name: 'about',
    component: () => import( '../views/About.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import( '../views/auth/Login.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import( '../views/auth/Signup.vue')
  },
  {
    path: '/books',
    name: 'books',
    component: () => import( '../views/library/Books.vue'),
    beforeEnter: requireAuth
  },
  {
    path: '/customers',
    name: 'customers',
    component: () => import( '../views/library/Customers.vue'),
    beforeEnter: requireAuth,
  },
  {
    path: '/reservations',
    name: 'reservations',
    component: () => import( '../views/library/Reservations.vue'),
    beforeEnter: requireAuth,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
