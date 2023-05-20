import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: () => import('../views/HomePage.vue') 
  },
  {
    path: '/blog/addblog',
    name: 'Addblog',
    component: () => import('../views/blog/AddBlog.vue') 
  },
  {
    path: '/blog/detail/',
    name: 'DetailBlog',
    component: () => import('../views/blog/DetailBlog.vue') 
  },
  {
    path: '/blog/edit',
    name: 'EditBlog',
    component: () => import('../views/blog/Updateblog.vue') 
  },
  {
    path: '/login',
    name: 'Loginpage',
    component: () => import('../views/Loginpage.vue') 
  },
  {
    path: '/signup',
    name: 'Signuppage',
    component: () => import('../views/Signuppage.vue') 
  },
  {
    path: '/addshop',
    name: 'Addshop',
    component: () => import('../views/Addshop.vue') 
  },
  {
    path: '/Shoprecomment',
    name: 'Shoprecomment',
    component: () => import('../views/Shoprecomment.vue') 
  },
  {
    path: '/checkdistance',
    name: 'CheckDistance',
    component: () => import('../views/Checkdistance.vue') 
  },
  {
    path: '/predict/predict',
    name: 'Predict',
    component: () => import('../views/predict/Predict.vue') 
  },
  {
    path: '/predict/quetion',
    name: 'Quetion',
    component: () => import('../views/predict/Quetion.vue') 
  },
  {
    path: '/predict/result',
    name: 'Result',
    component: () => import('../views/predict/Result.vue') 
  },
  {
    path: '/problem',
    name: 'Problem',
    component: () => import('../views/problem/Problem.vue') 
  },
  {
    path: '/problem/add',
    name: 'AddProblem',
    component: () => import('../views/problem/Addproblem.vue') 
  },
  {
    path: '/problem/edit',
    name: 'EditProblem',
    component: () => import('../views/problem/Updateproblem.vue') 
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router