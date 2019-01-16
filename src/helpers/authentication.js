import {LOGOUT, LOADING, UPDATETOKEN} from '@/mutation-types'

const authentication = {
  validToken(store) {
    // return !!store.state.jwt && store.state.exp > ((new Date().getTime() / 1000) + 30)
    return new Promise(function(resolve, reject) {
      if(!!store.state.jwt && store.state.exp > ((new Date().getTime() / 1000) + 30)) {
        resolve()
      } else {
        if (store.state.session) {
          store.commit(LOADING, true)
          store.dispatch(UPDATETOKEN).then(() => {
            store.commit(LOADING, false)
            resolve()
          }).catch(() => {
            store.commit(LOGOUT)
            reject("Not logged in")
          }).then(() => {
            store.commit(LOADING, false)
          })
        } else {
          // token has expired need to log back in
          store.commit(LOGOUT)
          reject("Not logged in")
        }
      }
    });
  }
}

export default authentication
