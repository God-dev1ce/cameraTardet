import { createRouter, createWebHistory } from 'vue-router'

const routes:any = [
  {
    path:'/',
    redirect:'/login'
  },
  {
    path:'/login',
    component: ()=>import('@/views/login/index.vue')
  },
  {
    path:'/home',
    component: () => import('@/components/Home.vue')
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
