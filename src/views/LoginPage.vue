<template>
  <div class="hero-body">
    <div class="container has-text-centered">
      <div class="column is-4 is-offset-4">
        <h3 class="title has-text-grey">Login</h3>
        <p class="subtitle has-text-grey">Please login to proceed.</p>
        <div class="box">
          <form @submit.prevent="authenticate">
            <errors :responseError='responseError' defaultMessage='Could not login.' class="field" />
            <div class="field">
              <div class="control">
                <input class="input is-large" type="login" placeholder="Your Email or Username" autofocus="" v-model='loginId'>
              </div>
            </div>
            <div class="field">
              <div class="control">
                <input class="input is-large" type="password" placeholder="Your Password" v-model='pword'>
              </div>
            </div>
            <div class="field">
              <label class="checkbox">
                <input type="checkbox" v-model='rembemberMe'> Remember me
              </label>
            </div>
            <button type="submit" class="button is-block is-info is-large is-fullwidth"
              :class="{'is-disabled':dontSubmit}" :disabled='dontSubmit'>
              Login
            </button>
          </form>
        </div>
        <p class="has-text-grey">
          <a href="../">Sign Up</a> &nbsp;·&nbsp;
          <a href="../">Forgot Password</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { LOGIN } from '@/mutation-types'
import Errors from '@/components/errors'

export default {
  name: 'LoginPage',
  components: {
    Errors,
  },
  data() {
    return {
      responseError: null,
      loginId: '',
      pword: '',
      rembemberMe: false,
    }
  },
  computed: {
    dontSubmit() {
      return !this.loginId || !this.pword
    }
  },
  methods: {
    ...mapActions({login: LOGIN}),
    authenticate() {
      this.responseError = null
      this.login({
        login: this.loginId,
        password: this.pword,
        session: this.rembemberMe,
      }).then(() => {
        this.$toasted.show('Signed in!', {type : 'success', icon: 'check'})
        if (this.$route.name === 'login') {
          this.$router.push({name: 'home'})
        }
      }).catch(error => {
        this.responseError = error
      }).then(() => {
        this.pword = ''
        // this.$router.push('/')
      })
    },
  }
}
</script>
