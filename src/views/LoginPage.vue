<template>
  <div class="hero-body">
    <div class="container has-text-centered">
      <div class="column is-4 is-offset-4">
        <h3 class="title has-text-grey">Login</h3>
        <p class="subtitle has-text-grey">Please login to proceed.</p>
        <div class="box">
          <form @submit.prevent="authenticate">
            <div class="field" v-if='message'>
              {{ message }}
            </div>
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

export default {
  name: 'LoginPage',
  data() {
    return {
      message: null,
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
      this.message = null
      this.login({
        login: this.loginId,
        password: this.pword,
        session: this.rembemberMe,
      }).then(() => {
        const routeTo = {name: this.$route.params.routedFrom || 'home'}
        this.$router.push(routeTo)
      }).catch(error => {
        if (error.response) {
          this.message = error.response.data.errors.authentication[0]
        } else {
          this.message = 'Could not login'
        }
      }).then(() => {
        this.pword = ''
        // this.$router.push('/')
      })
    },
  }
}
</script>
