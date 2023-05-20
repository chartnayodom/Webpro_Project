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
    meta: { login: true },
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
    meta: { login: true },
    component: () => import('../views/blog/Updateblog.vue') 
  },
  {
    path: '/login',
    name: 'Loginpage',
    meta: { guess: true },
    component: () => import('../views/Loginpage.vue') 
  },
  {
    path: '/signup',
    name: 'Signuppage',
    meta: { guess: true },
    component: () => import('../views/Signuppage.vue') 
  },
  {
    path: '/repairshop/addshop',
    name: 'Addshop',
    meta: { login: true },
    component: () => import('../views/repairshop/Addshop.vue') 
  },
  {
    path: '/repairshop',
    name: 'Shoprecomment',
    component: () => import('../views/repairshop/Shoprecomment.vue') 
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
router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem('token')

  if (to.meta.login && !isLoggedIn) {
    alert('Please login first!')
    next({ path: '/user/login' })
  }

  if (to.meta.guess && isLoggedIn) {
    alert("You've already logged in")
    next({ path: '/' })
  }

  next()
})

export default router