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
    store.commit(UPDATETOKEN, response.headers.authorization)
  }
  return response
}, (error) => {
  if (error.response && error.response.status === 401) {
    store.commit(LOGOUT)
    return false
  }
  return Promise.reject(error);
});
export default baxios