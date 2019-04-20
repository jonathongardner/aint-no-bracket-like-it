<template>
  <my-modal :value='value' @input='closeModal'>
    <template slot='header'>
      <p class="modal-card-title">Admin User Actions</p>
      <button class="delete" aria-label="close" @click='closeModal'></button>
    </template>
    <template slot='section'>
      <div class='action-button has-text-centered'>
        <button class='button is-warning' @click='sendEmailConfirmation'>
          Resend email confirmation
        </button>
      </div>
      <div class='action-button has-text-centered'>
        <button class='button is-warning' @click='sendForgotPassword'>
          Send reset password
        </button>
      </div>
    </template>
  </my-modal>
</template>

<script>
import {adminApi} from '@/helpers/api.js'
import MyModal from '@/components/my-modal.vue'

export default {
  name: 'admin-edit-user-modal',
  components: {
    MyModal,
  },
  props: {
    user: {
      type: Object,
      required: true,
    },
    value: { // Do require value so a v-if can be used with modal
      type: Boolean,
      required: false,
      default: true,
    },
  },
  // computed: {
  // },
  methods: {
    closeModal() {
      this.$emit('input', false)
    },
    sendEmailConfirmation() {
      adminApi.sendEmailConfirmation(this.user.id).then(() => {
        this.$toasted.global.success({message: "Sent email confirmation."})
      }).catch(() => {
				this.$toasted.global.failed({message: "Failed to send email confirmation."})
			})
    },
    sendForgotPassword() {
      adminApi.sendForgotPassword(this.user.id).then(() => {
        this.$toasted.global.success({message: "Sent reset password email."})
      }).catch(() => {
				this.$toasted.global.failed({message: "Failed to send reset password email."})
			})
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
.action-button {
  margin: 10px;
}
</style>
