import Vue from 'vue'
import Vuex from 'vuex'
import {authenticationApi as authenticationApi1} from '@/helpers/api.js'
import {authenticationApi as authenticationApi2} from '@/helpers/authenticatedApi.js'
import * as moduleTypes from './mutation-types'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    jwt: '',
    exp: 0,
    session: false,
    userId: -1,
    username: '',
    loading: false,
  },
  // getters: {
  // Cant use getter because as time changes it will not update
  // Use helper so its at least in on place
  //   validToken: (state) => {
  //     return !!state.jwt && state.exp > ((new Date().getTime() / 1000) + 30)
  //   }
  // },
  mutations: {
    [moduleTypes.LOGIN] (state, token) {
      const decoded = JSON.parse(atob(token.split('.')[1]))
      state.jwt = token
      state.exp = decoded.exp
      state.session = !!decoded.session
      state.userId = decoded.user.id
      state.username = decoded.user.username
      // TODO add to local storage
      // TODO Notify other tabs about login
    },
    [moduleTypes.LOGOUT] (state) {
      state.jwt = ''
      state.exp = 0
      state.session = false
      state.userId = -1
      state.username = ''
      // TODO add to local storage
      // TODO Notify other tabs about login
    },
    [moduleTypes.LOADING] (state, loading) {
      state.loading = loading
    }
  },
  actions: {
    [moduleTypes.LOGIN] ({commit}, params) {
      return authenticationApi1.signIn(params).then((data) => {
        commit(moduleTypes.LOGIN, data.token)
      })
    },
    [moduleTypes.LOGOUT] ({commit}) {
      // TODO change this to log out api
      return authenticationApi2.signOut().then(() => {
        commit(moduleTypes.LOGOUT)
      })
    },
    [moduleTypes.UPDATETOKEN] ({commit}) {
      return authenticationApi2.updateToken().then((data) => {
        commit(moduleTypes.LOGIN, data.token)
      })
    },
  }
})
