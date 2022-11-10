import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    redirect: '/customPage/index',
  },

  {
    path: '/form/index',
    name: 'formIndex',
    component: () => import('@/views/form/index.vue'),
    meta: {
      title: '设计表单',
      keepAlive: true
    }
  },

  {
    path: '/customPage/index',
    name: 'customPageIndex',
    component: () => import('@/views/customizePage/customPage/index.vue'),
    meta: {
      title: '自定义设计页面',
      keepAlive: true
    }
  },

  {
    path: '/customizePagePreview/:id',
    name: '自定义页面预览',
    component: () => import('@/views/customizePage/customizePagePreview/index'),
    title: '自定义页面预览',
    hidden: true,
  },

]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
