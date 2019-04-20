import Vue from 'vue'
import Vuex from 'vuex'
import * as moduleTypes from './mutation-types'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    jwt: '',
    exp: 0,
    session: false,
    userId: -1,
    username: '',
    admin: false,
    approved: false,
    emailConfirmed: false,
    loading: false,
  },
  getters: {
    hasToken: (state) => {
      return !!state.jwt
    }
  },
  mutations: {
    [moduleTypes.SETTOKEN] (state, token) {
      const decoded = JSON.parse(atob(token.split('.')[1]))
      state.jwt = token
      state.exp = decoded.exp
      state.session = !!decoded.session
      state.userId = decoded.user.id
      state.username = decoded.user.username
      state.admin = decoded.user.admin
      state.approved = decoded.user.approved
      state.emailConfirmed = decoded.user.email_confirmed
    },
    [moduleTypes.SHARETOKEN] (state) {
      localStorage.setItem('token', state.jwt)
      if (!state.session) {
        localStorage.removeItem('token')
      }
    },
    [moduleTypes.REMOVETOKEN] (state) {
      // Set token to blank to LOGOUT
      state.jwt = ''
      state.exp = 0
      state.session = false
      state.userId = -1
      state.username = ''
    },
    [moduleTypes.FORGETTOKEN] () {
      // Need to use forgetToken so that when token is deleted becasue its not a session token
      // it can tell the difference
      localStorage.setItem('forgetToken', true)
      localStorage.removeItem('forgetToken')
      localStorage.removeItem('token') // Remove in case stored for session
    },
    [moduleTypes.LOADING] (state, loading) {
      state.loading = loading
    }
  },
  actions: {
    [moduleTypes.UPDATETOKEN] ({commit}, authentication) {
      const token = authentication.substring(13)
      commit(moduleTypes.SETTOKEN, token)
      commit(moduleTypes.SHARETOKEN)
    },
    [moduleTypes.LOGOUT] ({commit}) {
      commit(moduleTypes.REMOVETOKEN)
      commit(moduleTypes.FORGETTOKEN)
    },
  }
})
