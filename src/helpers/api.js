import axios from 'axios'

const baxios = axios.create({
  baseURL: '/api',
})

const bracketApi = {
  getBracket (year) {
    return baxios.get('/brackets/' + year).then(response => {
      return response.data
    })
  }
}
export {bracketApi}
