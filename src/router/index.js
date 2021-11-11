import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {path: '/', redirect: '/login'}, //重定向
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue'),
    children:[
      {path: '/home', redirect: '/general'},  

      {
          path: '/general',
          name: 'General',
          component: () => import(/* webpackChunkName: "general" */ '../views/General.vue')
      },

      {
        path: '/reptile',
        name: 'Reptile',
        component: () => import(/* webpackChunkName: "reptile" */ '../views/Reptile.vue')
      },

      {
        path: '/data',
        name: 'Data',
        component: () => import(/* webpackChunkName: "data" */ '../views/Data detection.vue')
      },

      {
        path: '/template2',
        name: 'Template2',
        component: () => import(/* webpackChunkName: "template2" */ '../views/Template2.vue')
      },

      {
        path: '/settings',
        name: 'Settings',
        component: () => import(/* webpackChunkName: "settings" */ '../views/Settings.vue')
      },

      {
        path: '/about',
        name: 'About',
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
      },
      
    ]
 
  }
]

const router = new VueRouter({
  mode:'history',
  routes
})

export default router
