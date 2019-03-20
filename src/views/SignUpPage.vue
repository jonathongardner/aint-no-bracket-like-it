<template>
  <div class="hero-body">
    <div class="container has-text-centered">
      <div class="column is-4 is-offset-4">
        <h3 class="title has-text-grey">Sign Up</h3>
        <p class="subtitle has-text-grey">Thanks for joining!</p>
        <div class="box">
          <form @submit.prevent="signUp">
            <errors :responseError='responseError' defaultMessage='Could not sign up.' class="field" />
            <div class="field">
              <div class="control">
                <input class="input is-large" type="email" placeholder="Email" autofocus="" v-model='email'>
              </div>
            </div>
            <div class="field">
              <div class="control">
                <input class="input is-large" type="username" placeholder="Username" autofocus="" v-model='username'>
              </div>
            </div>
            <div class="field">
              <div class="control">
                <input class="input is-large" type="password" placeholder="Password" v-model='pword'>
              </div>
              <p v-if='pwordNotComplicatedEnough' class="help is-danger">Password must be 6 Characters or more.</p>
            </div>
            <div class="field">
              <div class="control">
                <input class="input is-large" type="password" placeholder="Password Confirmation" v-model='pwordCon'>
              </div>
              <p v-if='pwordsDontMatch' class="help is-danger">Passwords don't match.</p>
            </div>
            <div class="field">
              <label class="checkbox">
                <input type="checkbox" v-model='rembemberMe'> Remember me
              </label>
            </div>
            <button id='submitButton' type="submit" class="button is-block is-info is-large is-fullwidth"
              :class="{'is-disabled': dontSubmit}" :disabled='dontSubmit'>
              Sign Up!
            </button>
          </form>
        </div>
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
      email: '',
      username: '',
      pword: '',
      pwordCon: '',
      rembemberMe: false,
    }
  },
  computed: {
    pwordNotComplicatedEnough() {
      return !(this.pword && this.pword.length <= 6)
    },
    pwordsDontMatch() {
      return this.pword != this.pwordCon
    },
    dontSubmit() {
      return !this.email || !this.username || this.pwordNotComplicatedEnough || this.pwordsDontMatch
    }
  },
  methods: {
    signUp() {
      this.responseError = null
      authenticationApi.signUp({
        user: {
          email: this.email,
          username: this.username,
          password: this.pword,
          password_confirmation: this.pwordCon,
        },
        session: this.rembemberMe,
      }).then(() => {
        // Token will automatically be caught by baxios (our custom axious)
        this.$toasted.show('Signed up!', {type : 'success', icon: 'check'})
        this.$router.push('/')
      }).catch(error => {
        this.responseError = error
      }).then(() => {
        this.pword = ''
        this.pwordCon = ''
      })
    },
  }
}
</script>
