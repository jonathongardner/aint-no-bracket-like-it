<template>
  <div class="hero-body">
    <div class="container has-text-centered">
      <div class="column is-4 is-offset-4">
        <h3 class="title has-text-grey">Reset Password</h3>
        <div class="box">
          <form @submit.prevent="resetPassword">
            <errors :responseError='responseError' defaultMessage='Could not sign up.' class="field" />
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
            <button id='submitButton' type="submit" class="button is-block is-info is-large is-fullwidth"
              :class="{'is-disabled': dontSubmit}" :disabled='dontSubmit'>
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {userApi} from '@/helpers/api.js'
import Errors from '@/components/errors'

export default {
  name: 'ResetPassword',
  components: {
    Errors,
  },
  data() {
    return {
      responseError: null,
      pword: '',
      pwordCon: '',
    }
  },
  computed: {
    pwordNotComplicatedEnough() {
      return !(this.pword && this.pword.length > 6)
    },
    pwordsDontMatch() {
      return this.pword != this.pwordCon
    },
    dontSubmit() {
      return this.pwordNotComplicatedEnough || this.pwordsDontMatch
    }
  },
  methods: {
    resetPassword() {
      this.responseError = null
      userApi.resetPassword({
        reset_password_token: this.$route.params.token,
        password: this.pword,
        password_confirmation: this.pwordCon,
      }).then(() => {
        // Token will automatically be caught by baxios (our custom axious)
        this.$toasted.global.success({message: 'Updated Password!'})
        this.$router.push('/login')
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
