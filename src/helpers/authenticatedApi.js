import store from '@/vuex'
import axios from 'axios'

const abaxios = axios.create({
  baseURL: '/api',
  headers: {
    'authorization': {
      toString() {
        // Use this so axios will reavalute every time
        return 'Bearer token=' + store.state.jwt
      }
    }
  }
})

const authenticationApi = {
  signOut () {
    return abaxios.delete('/auth/sign_out').then(response => {
      return response.data
    })
  },
  updateToken () {
    return abaxios.get('/auth/update_session_token').then(response => {
      return response.data
    })
  },
}
export {authenticationApi}
