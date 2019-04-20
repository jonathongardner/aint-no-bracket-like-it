<template>
  <div>
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>Username</th>
          <th>Email</th>
          <th>Approved</th>
          <th />
        </tr>
      </thead>
      <tbody>
        <tr v-for='(user, index) in usersToShow' :key='user.id'>
          <td>
            <i class="fas fa-user"></i> {{ user.username }}
          </td>
          <td>
            <a :href='user.email | mailTo'>
              <i class="fas fa-envelope"></i> {{ user.email }}
            </a>
          </td>
          <td>
            <div class="field" @click="approveUser(user.id, !user.approved)">
              <input type="checkbox" class="switch is-rounded" :checked='user.approved'>
              <label></label>
            </div>
          </td>
          <td>
            <button class='button' @click='openEditUserModal(index)'>
              <i class="fas fa-eye"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <admin-edit-user-modal v-if='showModal' :user='user' @input='showModal = false'/>
  </div>
</template>

<script>
import {adminApi} from '@/helpers/api.js'
import AdminEditUserModal from '@/components/admin-edit-user-modal.vue'

export default {
	name: 'AdminPage',
  components: {
    AdminEditUserModal,
  },
	data() {
		return {
			users: [],
      showModal: false,
      selected_user_index: 0,
		}
	},
	computed: {
		usersToShow() {
			return this.users
		},
    user() {
      return this.usersToShow[this.selected_user_index]
    }
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
    approveUser(id, approve) {
      adminApi.approveUser(id, approve).then((data) => {
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
    openEditUserModal(index) {
      this.selected_user_index = index
      this.showModal = true
    },
	},
	created() {
		this.getUsers()
	}
}
</script>
