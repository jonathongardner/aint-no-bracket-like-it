<template>
  <div class='has-text-centered'>
    <div>
      Could not confirm your email.
    </div>
    <loading :class="{'is-active': loading}"/>
  </div>
</template>

<script>
import {userApi} from '@/helpers/api.js'
import Loading from '@/components/loading'

export default {
  name: 'ConfirmEmail',
  components: {
    Loading,
  },
  data() {
    return {
      loading: true
    }
  },
  created() {
    userApi.validateEmail({
      email_confirmation_token: this.$route.params.token
    }).then(() => {
      this.$toasted.global.success({message: 'Email Confirmed'})
      this.$router.push('/')
    }).catch(() => {
      this.loading = false
    })
  }
}
</script>
