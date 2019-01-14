import Vue from 'vue'
import Router from 'vue-router'
import store from './vuex'
import HomePage from './views/HomePage.vue'
import BracketPage from './views/BracketPage.vue'
import CreateBracketPage from './views/CreateBracketPage.vue'
import NotFoundPage from './views/NotFoundPage.vue'
import bracketOptions from '@/helpers/bracketOptions.js'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "about" */ './views/LoginPage.vue')
    },
    {
      path: '/brackets',
      redirect: '/brackets/' + bracketOptions.lastYear
    },
    {
      path: '/brackets/:year',
      name: 'bracket',
      component: BracketPage
    },
    {
      path: '/create-bracket',
      name: 'create-bracket',
      component: CreateBracketPage,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/AboutPage.vue')
    },
    {
      path: '*',
      name: 'not-found',
      component: NotFoundPage
    }
  ]
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (!!store.state.jwt && store.state.exp > (new Date().getTime() / 1000) + 30) {
      next()
    } else {
      console.log(to.name)
      next({name: 'login', params: {routedFrom: to.name}})
    }
  } else {
    next()
  }
})


export default router
