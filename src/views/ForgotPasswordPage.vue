<template>
  <div class="hero-body">
    <div class="container has-text-centered">
      <div class="column is-4 is-offset-4">
        <h3 class="title has-text-grey">Forgot Password</h3>
        <p class="subtitle has-text-grey">Please enter your email.</p>
        <div class="box">
          <form @submit.prevent="forgotPassword">
            <div class="field">
              <div class="control">
                <input class="input is-large" type="email" placeholder="Your Email" autofocus="" v-model='email'>
              </div>
            </div>
            <button id='submitButton' type="submit" class="button is-block is-info is-large is-fullwidth"
              :class="{'is-disabled': dontSubmit}" :disabled='dontSubmit'>
              Login
            </button>
          </form>
          <div v-if='successfullySent'>
            If you do not recieve an email from us shortly please contact us directly.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {userApi} from '@/helpers/api.js'

export default {
  name: 'ForgotPasswordPage',
  data() {
    return {
      email: this.$route.params.email || '',
      successfullySent: false,
    }
  },
  computed: {
    dontSubmit() {
      return !(this.email && this.email.includes('@'))
    }
  },
  methods: {
    forgotPassword() {
      this.responseError = null
      userApi.forgotPassword({
        email: this.email,
      }).then(() => {
        this.$toasted.global.success({message: 'Sent!'})
        this.successfullySent = true
        this.email = ''
        setTimeout(() => { this.successfullySent = false }, 6000)
      }).catch(() => {
        this.$toasted.global.failed({message: 'Sorry, something went wrong.'})
        this.successfullySent = false
      })
    },
  }
}
</script>
