import Vue from 'vue'
import Router from 'vue-router'
import HomePage from './views/HomePage.vue'
import BracketPage from './views/BracketPage.vue'
import LoginPage from './views/LoginPage.vue'
import ManageBracketPage from './views/ManageBracketPage.vue'
import SavedBracketsPage from './views/SavedBracketsPage.vue'
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
			component: LoginPage
		},
		{
			path: '/sign-up',
			name: 'sign-up',
			component: () => import('./views/SignUpPage.vue'),
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
			path: '/admin',
			component: () => import('./views/AdminPage.vue'),
			children: [
				{
					path: '',
					redirect: 'unapproved-users',
					name: 'admin',
				},
        {
          path: 'unapproved-users',
					name: 'admin-unapproved-users',
          component: () => import('./views/AdminUserPage.vue'),
					meta: {
						requiresAuth: true,
						requiresAdmin: true,
					},
        },
        {
          path: 'users',
					name: 'admin-users',
          component: () => import('./views/AdminUserPage.vue'),
					meta: {
						requiresAuth: true,
						requiresAdmin: true,
					},
        }
      ]
		},
		{
			path: '/about',
			name: 'about',
			// route level code-splitting
			// this generates a separate chunk (about.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import('./views/AboutPage.vue')
		},
		{
			path: '*',
			name: 'not-found',
			component: () => import('./views/NotFoundPage.vue')
		}
	]
})


export default router
