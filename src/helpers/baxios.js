import axios from 'axios'
import store from '@/vuex'
import {UPDATETOKEN, LOGOUT} from '@/mutation-types'

const baxios = axios.create({
  baseURL: '/api',
})
baxios.interceptors.request.use((config) => {
  if (store.getters.hasToken) {
    config.headers.common['authorization'] = 'Bearer token=' + store.state.jwt
  }
  return config
})
baxios.interceptors.response.use((response) => {
  if (response.headers.authorization) {
    store.dispatch(UPDATETOKEN, response.headers.authorization)
  }
  return response
}, (error) => {
  // Dont catch error if signing in 
  if (!error.response.request.responseURL.endsWith('/api/auth/sign_in') && error.response && error.response.status === 401) {
    store.dispatch(LOGOUT)
    return false
  }
  return Promise.reject(error);
});
export default baxios
