import {bracket} from './data.js'

const bracketApi = {
  getBracket:  jest.fn((year) => {
    console.log('ran')
    if (year === 2000) {
      return Promise.reject(Error('I couldnt get that.'))
    }
    return Promise.resolve()
  }),
}

const saveBracketApi = {
}

const authenticationApi = {
}
export {bracketApi, saveBracketApi, authenticationApi}
