import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/layout/first'
  },
  {
    path: '/login',
    component: () => import('@/views/Login')
  },
  {
    path: '/layout',
    component: () => import('@/views/Layout'),
    children: [
      {
        path: 'first',
        component: () => import('@/views/First')
      },
      {
        path: 'find',
        component: () => import('@/views/Find')
      },
      {
        path: 'search',
        component: () => import('@/views/Search')
      },
      {
        path: 'home',
        component: () => import('@/views/Home')
      }
    ]
  },
  {
    path: '/citylist',
    component: () => import('@/views/First/cityList.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
