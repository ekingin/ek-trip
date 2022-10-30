import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      component: () => import('@/views/home/home.vue')
    },
    {
      path: '/favor',
      component: () => import('@/views/favor/favor.vue')
    },
    {
      path: '/message',
      component: () => import('@/views/message/message.vue')
    },
    {
      path: '/order',
      component: () => import('@/views/order/order.vue')
    },
    {
      path: '/city',
      component: () => import('@/views/city/city.vue'),
      // meta: { // 隐藏底部tabbar的方式之一，在App.vue文件中判断该字段
      //   isHiddenTabbar: true
      // }
    },
    {
      path: '/detail/:id',
      component: () => import('@/views/detail/detail.vue')
    },
  ]
})

export default router