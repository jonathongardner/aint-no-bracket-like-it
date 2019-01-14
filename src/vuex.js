import Vue from 'vue'
import Vuex from 'vuex'
import {authenticationApi} from '@/helpers/api.js'
import { LOGIN } from './mutation-types'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    jwt: '',
    exp: 0,
    session: false,
    userId: -1,
    username: '',
  },
  // getters: {
  //   expired: (state, getters) => {
  //     // This might have to be changed to an action?
  //     // Add 2 minutes
  //     return (new Date().getTime() / 1000) + 120 > state.exp
  //   },
  //   validToken: (state, getters) => {
  //     return !!state.jwt && !getters.expired
  //   }
  // },
  mutations: {
    [LOGIN] (state, token) {
      const decoded = JSON.parse(atob(token.split('.')[1]))
      state.jwt = token
      state.exp = decoded.exp
      state.session = !!decoded.session
      state.userId = decoded.user.id
      state.username = decoded.user.username
    }
  },
  actions: {
    [LOGIN] ({commit}, params) {
      return authenticationApi.authenticate(params).then((data) => {
        commit(LOGIN, data.token)
      })
    }
  }
})
