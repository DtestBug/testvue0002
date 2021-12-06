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
      {path: '/home', redirect: '/casereport'},  

      {
          path: '/casereport',
          name: 'Casereport',
          component: () => import(/* webpackChunkName: "casereport" */ '../views/Casereport.vue')
      },

      {
        path: '/getuser',
        name: 'Getuser',
        component: () => import(/* webpackChunkName: "getuser" */ '../views/Getuser.vue')
      },

      {
        path: '/pets',
        name: 'Pets',
        component: () => import(/* webpackChunkName: "pets" */ '../views/Pets.vue')
      },

      {
        path: '/students',
        name: 'Students',
        component: () => import(/* webpackChunkName: "students" */ '../views/Students.vue')
      },

      {
        path: '/case',
        name: 'Case',
        component: () => import(/* webpackChunkName: "case" */ '../views/Case.vue')
      },

      {
        path: '/runcase',
        name: 'Runcase',
        component: () => import(/* webpackChunkName: "runcase" */ '../views/Runcase.vue')
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
