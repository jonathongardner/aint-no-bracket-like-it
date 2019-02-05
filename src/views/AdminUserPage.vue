<template>
  <div>
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>Username</th>
          <th>Email</th>
          <th>Approved</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for='user in usersToShow' :key='user.id'>
          <td>
            <i class="fas fa-user"></i> {{ user.username }}
          </td>
          <td>
            <a :href='user.email | mailTo'>
              <i class="fas fa-envelope"></i> {{ user.email }}
            </a>
          </td>
          <td>
            <div class="field" @click="updateUser(user.id, !user.approved)">
              <input type="checkbox" class="switch is-rounded" :checked='user.approved'>
              <label></label>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {adminApi} from '@/helpers/api.js'

export default {
	name: 'AdminPage',
	data() {
		return {
			users: [],
		}
	},
	computed: {
		usersToShow() {
			return this.users
		},
	},
  filters: {
		mailTo(email) {
			return 'mailto:' + email
		},
  },
	methods: {
    apiGetUsers() {
      if (this.$route.name === 'admin-users') {
        return adminApi.getUsers()
      }
      return adminApi.getApprovedUsers()
    },
    updateUser(id, approve) {
      adminApi.updateUsers(id, approve).then((data) => {
        const userIndex = this.users.findIndex((u) => {
          return u.id === id
        })
        if(userIndex >= 0) {
          this.$set(this.users, userIndex, data)
        } else {
          this.$toasted.global.failed("Failed to approve/unapprove user.")
        }
      }).catch(() => {
				this.$toasted.global.failed("Failed to approve/unapprove user.")
			})
    },
    getUsers() {
      this.apiGetUsers().then((data) => {
        this.users = data
      }).catch(() => {
				this.$toasted.global.failed("Error loading users.")
			})
    },
	},
	created() {
		this.getUsers()
	}
}
</script>
