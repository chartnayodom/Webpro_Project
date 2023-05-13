import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: () => import('../views/HomePage.vue') // set home as path '/'
  },
  {
    path: '/blog/detail/',
    name: 'DetailBlog',
    component: () => import('../views/blog/DetailBlog.vue') // set home as path '/'
  },
  {
    path: '/login',
    name: 'Loginpage',
    component: () => import('../views/Loginpage.vue') // set home as path '/'
  },
  {
    path: '/signup',
    name: 'Signuppage',
    component: () => import('../views/Signuppage.vue') // set home as path '/'
  },
  {
    path: '/addblog',
    name: 'Addblog',
    component: () => import('../views/AddBlog.vue') // set home as path '/'
  },
  {
    path: '/addshop',
    name: 'Addshop',
    component: () => import('../views/Addshop.vue') // set home as path '/'
  },
  {
    path: '/Shoprecomment',
    name: 'Shoprecomment',
    component: () => import('../views/Shoprecomment.vue') // set home as path '/'
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router