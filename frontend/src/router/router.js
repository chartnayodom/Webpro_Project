import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HomePage',
    // meta: { login: true },
    component: () => import('../views/HomePage.vue') 
  },
  {
    path: '/blogs',
    name: 'blog',
    // meta: { login: true },
    component: () => import('../views/HomePage.vue') 
  },
  {
    path: '/blog/addblog',
    name: 'Addblog',
    meta: { login: true },
    component: () => import('../views/blog/AddBlog.vue') 
  },
  {
    path: '/blogs/:id',
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
    path: '/user/login',
    name: 'Loginpage',
    meta: { guess: true },
    component: () => import('../views/user/Loginpage.vue') 
  },
  {
    path: '/user/signup',
    name: 'Signuppage',
    meta: { guess: true },
    component: () => import('../views/user/Signuppage.vue') 
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
    path: '/repairshop/update',
    name: 'Updateshop',
    component: () => import('../views/repairshop/Updateshop.vue') 
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
    path: '/predict/:asking',
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
    path: '/problem/edit/:id',
    name: 'EditProblem',
    component: () => import('../views/problem/Updateproblem.vue') 
  },
  {
    path: '/admin/login',
    name: 'Adminlogin',
    component: () => import('../views/admin/LoginPage.vue') 
  },
  {
    path: '/admin/signup',
    name: 'Adminsignup',
    component: () => import('../views/admin/SignupPage.vue') 
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

  // if (to.meta.guess && isLoggedIn) {
  //   alert("You've already logged in")
  //   next({ path: '/' })
  // }

  next()
})

export default router