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
const saveBracketApi = {
  saveBracket(params) {
    return abaxios.post('/saved_brackets', {saved_bracket: params}).then(response => {
      return response.data
    })
  },
  updateBracket(id, params) {
    return abaxios.patch('/saved_brackets/' + id, {saved_bracket: params}).then(response => {
      return response.data
    })
  },
  savedBrackets() {
    return abaxios.get('/saved_brackets').then(response => {
      return response.data
    })
  },
  deleteBracket(id) {
    return abaxios.delete('/saved_brackets/' + id).then(response => {
      return response.data
    })
  },
}

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
export {authenticationApi, saveBracketApi}
