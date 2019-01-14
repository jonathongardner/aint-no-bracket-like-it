import axios from 'axios'

const baxios = axios.create({
  baseURL: '/api',
})

const bracketApi = {
  getBracket (year) {
    return baxios.get('/brackets/' + year).then(response => {
      return response.data
    })
  },
  getInitialBracket (year) {
    return baxios.get('/brackets/' + year + '/initial').then(response => {
      return response.data
    })
  },
  getBracketGameStats (gameNumber) {
    return baxios.get('/brackets/stats/' + gameNumber).then(response => {
      return response.data
    })
  }
}
const authenticationApi = {
  signIn (params) {
    return baxios.post('/auth/sign_in', params).then(response => {
      return response.data
    })
  },
}
export {bracketApi, authenticationApi}
