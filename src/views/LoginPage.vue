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
            <button id='submitButton' type="submit" class="button is-block is-info is-large is-fullwidth"
              :class="{'is-disabled': dontSubmit}" :disabled='dontSubmit'>
              Login
            </button>
          </form>
        </div>
        <p class="has-text-grey">
          <router-link to="/sign-up">Sign Up</router-link> &nbsp;·&nbsp;
          <router-link :to="{name: 'forgot-password', params: {email: loginIsEmail}}">Forgot Password?</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import {authenticationApi} from '@/helpers/api.js'
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
    },
    loginIsEmail() {
      return this.loginId.includes('@') ? this.loginId : ''
    },
  },
  methods: {
    authenticate() {
      this.responseError = null
      authenticationApi.signIn({
        login: this.loginId,
        password: this.pword,
        session: this.rembemberMe,
      }).then(() => {
        // Token will automatically be caught by baxios (our custom axious)
        this.$toasted.global.success({message: 'Signed in!'})
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
