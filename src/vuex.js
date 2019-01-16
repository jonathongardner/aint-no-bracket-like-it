import Vue from 'vue'
import Vuex from 'vuex'
import {authenticationApi} from '@/helpers/api.js'
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
  getters: {
    hasToken: (state) => {
      return !!state.jwt
    }
  // Cant use getter because as time changes it will not update
  // Use helper so its at least in on place
  //   validToken: (state) => {
  //     return !!state.jwt && state.exp > ((new Date().getTime() / 1000) + 30)
  //   }
  },
  mutations: {
    [moduleTypes.UPDATETOKEN] (state, authorization) {
      const token = authorization.substring(13)
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
      return authenticationApi.signIn(params).then((response) => {
        commit(moduleTypes.UPDATETOKEN, response.headers.authorization)
      })
    },
    [moduleTypes.LOGOUT] ({commit}) {
      // TODO change this to log out api
      return authenticationApi.signOut().then(() => {
        commit(moduleTypes.LOGOUT)
      })
    },
    [moduleTypes.UPDATETOKEN] ({commit}) {
      return authenticationApi.updateToken().then((response) => {
        commit(moduleTypes.UPDATETOKEN, response.headers.authorization)
      })
    },
  }
})
