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
}

const userApi = {
  signUp (params) {
    return baxios.post('/users', params)
  },
  updateUser (params) {
    return baxios.patch('/users', params)
  },
  validateEmail (params) {
    return baxios.patch('/users/validate_email', params).then(response => {
      return response.data
    })
  },
  forgotPassword (params) {
    return baxios.get('/users/forgot_password', params).then(response => {
      return response.data
    })
  },
  resetPassword (params) {
    return baxios.patch('/users/reset_password', params).then(response => {
      return response.data
    })
  },
}

const adminApi = {
  getUsers () {
    return baxios.get('/admin/users').then(response => {
      return response.data
    })
  },
  getApprovedUsers () {
    return baxios.get('/admin/users?approved=false').then(response => {
      return response.data
    })
  },
  approveUser (id, approved) {
    return baxios.patch('/admin/users/' + id + '/approve', {approved: approved}).then(response => {
      return response.data
    })
  },
  sendEmailConfirmation (id) {
    return baxios.get('/admin/users/' + id + '/email_confirmation').then(response => {
      return response.data
    })
  },
  sendForgotPassword (id) {
    return baxios.get('/admin/users/' + id + '/forgot_password').then(response => {
      return response.data
    })
  }
}
export {bracketApi, uniqueBracketApi, saveBracketApi, authenticationApi, userApi, adminApi}
