import baxios from './baxios.js'

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

const uniqueBracketApi = {
  getGameAvailability (games) {
    return baxios.post('/unique_brackets/available', {games: games}).then(response => {
      return response.data
    })
  },
}

const saveBracketApi = {
  createBracket(params) {
    return baxios.post('/saved_brackets', {saved_bracket: params}).then(response => {
      return response.data
    })
  },
  updateBracket(id, params) {
    return baxios.patch('/saved_brackets/' + id, {saved_bracket: params}).then(response => {
      return response.data
    })
  },
  savedBrackets() {
    return baxios.get('/saved_brackets').then(response => {
      return response.data
    })
  },
  savedBracket(id) {
    return baxios.get('/saved_brackets/' + id).then(response => {
      return response.data
    })
  },
  deleteBracket(id) {
    return baxios.delete('/saved_brackets/' + id).then(response => {
      return response.data
    })
  },
}

const authenticationApi = {
  signIn (params) {
    return baxios.post('/auth/sign_in', params)
  },
  signOut () {
    return baxios.delete('/auth/sign_out').then(response => {
      return response.data
    })
  },
  updateToken () {
    return baxios.get('/auth/update_session_token')
  },
  signUp (params) {
    return baxios.post('/users', params)
  },
}

const adminApi = {
  getUsers () {
    return baxios.get('/users').then(response => {
      return response.data
    })
  },
  getApprovedUsers () {
    return baxios.get('/users?approved=false').then(response => {
      return response.data
    })
  },
  updateUsers (id, approved) {
    return baxios.post('/users/' + id + '/approve', {approved: approved}).then(response => {
      return response.data
    })
  }
}
export {bracketApi, uniqueBracketApi, saveBracketApi, authenticationApi, adminApi}
