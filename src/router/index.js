import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  // 重定向
  {
    path: '/',
    redirect: '/layout/first'
  },
  // 登录页面
  {
    path: '/login',
    component: () => import('@/views/Login')
  },
  // layout布局
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
  // 城市列表
  {
    path: '/citylist',
    component: () => import('@/views/First/cityList.vue')
  },
  // 收藏列表
  {
    path: '/mylove',
    component: () => import('@/views/Home/mylove')
  }
]

const router = new VueRouter({
  routes
})

export default router
