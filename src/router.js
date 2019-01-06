import Vue from 'vue'
import Router from 'vue-router'
import HomePage from './views/HomePage.vue'
import BracketPage from './views/BracketPage.vue'
import CreateBracketPage from './views/CreateBracketPage.vue'
import NotFoundPage from './views/NotFoundPage.vue'
import bracketOptions from '@/helpers/bracketOptions.js'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
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
      component: CreateBracketPage
    },
    {
      path: '*',
      name: 'not-found',
      component: NotFoundPage
    }
  ]
})
