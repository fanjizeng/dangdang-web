import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import storage from '@/utils/goodStorageUtil'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/ctgy'
  },
  {
    path: '/login',
    name: '用户登陆',
    meta: {
      title: '用户登陆',
    },
    component: () => import('@/pages/userinfo/login.vue'),
    beforeEnter(to, from, next) {
      const token = storage.get('token')
      if (token) {
        next({ path: '/home' })
      }else {
        next()
      }
    }
  },
  {
    path: '/home',
    name: '首页',
    meta: {
      title: '首页',
    },
    component: () => import('@/pages/home/index.vue')
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
    path: '/order',
    name: '订单信息',
    meta: {
      title: '订单信息',
    },
    component: () => import('@/pages/orderinfo/index.vue')
  },
  {
    path: '/orderSort',
    name: '订单分类',
    meta: {
      title: '订单分类',
    },
    component: () => import('@/pages/orderinfo//ordersort/index.vue')
  },
  {
    path: '/search',
    name: '搜索',
    meta: {
      title: '搜索',
    },
    component: () => import('@/pages/search/index.vue')
  },
  {
    path: '/bookdetail',
    redirect: '/goods',
    name: '图书详情',
    meta: {
      title: '图书详情',
    },
    component: () => import('@/pages/bookdetail/index.vue'),
    children: [
      {
        name: '商品',
        path: '/goods',
        component: ()=> import('@/pages/bookdetail/components/goods.vue')
      },
      {
        name: '评论',
        path: '/evaluate',
        component: ()=> import('@/pages/bookdetail/components/evaluate/index.vue')
      }
    ]
  },
  // 替代vue2中的'*'通配符路径
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL), // histort 模式则使用 createWebHistory()，
  routes,
})

router.beforeEach((to, from, next) => {
  const token = storage.get('token')
  if (token || to.path === '/login') {
    next()
  }else {
    next({ path: '/login' })
  }
})

export default router