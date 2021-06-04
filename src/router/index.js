import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Err from '../views/Error.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/task',
    name: 'Task',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Task.vue')
  },
  {
    path: '/marketing',
    name: 'Marketing',
    component: () => import(/* webpackChunkName: "about" */ '../views/Marketing.vue')
  },
  {
    path: '/division',
    name: 'Division',
    component: () => import(/* webpackChunkName: "about" */ '../views/Division.vue')
  },
  {
    path: '*',
    name: 'Error',
    component: Err
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
