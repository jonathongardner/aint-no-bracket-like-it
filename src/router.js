import Vue from 'vue'
import Router from 'vue-router'
import store from './vuex'
import HomePage from './views/HomePage.vue'
import BracketPage from './views/BracketPage.vue'
import ManageBracketPage from './views/ManageBracketPage.vue'
import SavedBracketsPage from './views/SavedBracketsPage.vue'
import NotFoundPage from './views/NotFoundPage.vue'
import bracketOptions from '@/helpers/bracketOptions.js'
import authentication from '@/helpers/authentication.js'

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
      path: '/my-brackets/new',
      name: 'create-bracket',
      component: ManageBracketPage,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/my-brackets/:id',
      name: 'edit-bracket',
      component: ManageBracketPage,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/my-brackets',
      name: 'saved-brackets',
      component: SavedBracketsPage,
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
    authentication.validToken(store).then(() => {
      next()
    }).catch(() => {
      next({name: 'login', params: {routedFrom: to.name}})
    })
    // if (authentication.validToken(store)) {
    //   next()
    // } else {
    //   next({name: 'login', params: {routedFrom: to.name}})
    // }
  } else {
    next()
  }
})


export default router
