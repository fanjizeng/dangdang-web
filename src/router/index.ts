import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/ctgy'
  },
  {
    path: '/ctgy',
    name: '分类页面',
    meta: {
      title: '分类页',
    },
    component: () => import('@/pages/ctgy/index.vue')
  },
  {
    path: '/books',
    name: '书本页面',
    meta: {
      title: '书本页',
    },
    component: () => import('@/pages/books/index.vue')
  },
  {
    path: '/shopcartlist',
    name: '购物车列表',
    meta: {
      title: '购物车',
    },
    component: () => import('@/pages/shopcartlist/index.vue')
  },
  {
    path: '/search',
    name: '搜索',
    meta: {
      title: '搜索',
    },
    component: () => import('@/pages/search/index.vue')
  },
  // 替代vue2中的'*'通配符路径
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL), // histort 模式则使用 createWebHistory()，
  routes,
})

export default router