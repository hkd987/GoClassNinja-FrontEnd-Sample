import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Signup from '@/components/Signup'
import Help from '@/components/Help'
import Main from '@/components/Main'
import NoPage from '@/components/NoPage'
import ClassLocation from '@/components/ClassLocation'
import Chart from '@/components/Chart'
import TimeClock from '@/components/TimeClock'
import NewStudent from '@/components/NewStudent'
import store from '../store'

Vue.use(Router)

const PROTECTED = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next()
    return
  }
  next('/login')
}

const NO_PROTECTION = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next()
    return
  }
  next('/')
}

// NOTE: beforeEnter: ifAuthenticated USE THIS TO PROTECT ROUTES

export default new Router({
  routes: [
    {
      path: '/testing',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/help',
      name: 'Help',
      component: Help
    },
    {
      path: '/main',
      name: 'Main',
      component: Main,
      beforeEnter: PROTECTED
    },
    {
      path: '/class-location',
      name: 'ClassLocation',
      component: ClassLocation,
      beforeEnter: PROTECTED
    },
    {
      path: '/chart',
      name: 'Chart',
      component: Chart,
      beforeEnter: PROTECTED
    },
    {
      path: '/time-clock',
      name: 'TimeClock',
      component: TimeClock,
      beforeEnter: PROTECTED
    },
    {
      path: '/new-student',
      name: 'NewStudent',
      component: NewStudent,
      beforeEnter: PROTECTED
    },
    {
      path: '*',
      name: 'NoPage',
      component: NoPage
    }
  ]
})
