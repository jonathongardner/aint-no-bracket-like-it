<template>
  <div id="app">
    <nav class="navbar is-dark is-over-pageloader" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <router-link to="/" class="navbar-item lobster is-size-3">
          ANBLI
        </router-link>
      </div>
      <div id='anbli-navbar' class="navbar-menu">
        <div class="navbar-start navbar-router">
          <router-link class="navbar-item" :class="{ 'is-active' : isRoute('home', false) }" to="/">
            Home
          </router-link>
          <router-link class="navbar-item" :class="{ 'is-active' : isRoute('bracket', false) }" to="/brackets">
            Brackets
          </router-link>
          <div class="navbar-item has-dropdown is-hoverable" v-if='hasToken'>
            <a class="navbar-link">
              My Brackets
            </a>
            <div class="navbar-dropdown is-right is-dark">
              <router-link class="navbar-item" :class="{ 'is-active' : isRoute('saved-brackets', true) }" :to="{ name: 'saved-brackets'}">
                Saved
              </router-link>
              <hr class="navbar-divider">
              <router-link class="navbar-item" :class="{ 'is-active' : isRoute('create-bracket', true) }" :to="{ name: 'create-bracket'}">
                Create
              </router-link>
            </div>
          </div>
        </div>
        <div class="navbar-end navbar-router">
          <router-link class="navbar-item" :class="{ 'is-active' : isRoute('about', false) }" to="/about">
            About
          </router-link>
          <div class="navbar-item has-dropdown is-hoverable" v-if='hasToken'>
            <a class="navbar-link">
              User
            </a>
            <div class="navbar-dropdown is-right is-dark">
              <div class="navbar-item">
                {{ username }}
              </div>
              <hr class="navbar-divider">
              <a class="navbar-item" @click='signOut'>
                Sign Out
              </a>
              <a class="navbar-item">
                Other stuff
              </a>
            </div>
          </div>
          <router-link class="navbar-item" v-else to="/login">
            Sign in
          </router-link>
        </div>
      </div>
    </nav>
    <loading :class="{'is-active': loading}" />
    <login-page v-if='showLoginPage'/>
    <router-view v-else :key='$route.name'/>
    <!-- Put key on so when the route name changes the page will reload -->
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import {LOGOUT, SETTOKEN, REMOVETOKEN} from '@/mutation-types'
import {authenticationApi} from '@/helpers/api.js'
import Loading from '@/components/loading.vue'
import LoginPage from '@/views/LoginPage.vue'

export default {
  name: 'App',
  components: {
    Loading,
    LoginPage
  },
  computed: {
    ...mapState(['username', 'loading', 'jwt']),
    ...mapGetters(['hasToken']),
    showLoginPage() {
      return !this.hasToken && this.$route.meta.requiresAuth
    },
  },
  // Using username means the user might show as logged in when they're not
  // This would be when session is false and token is expired. This will be
  // okay becasue when user clicks something that does require authenticated user
  // it they will just ask them to log back in. If you use a method that depends on
  // time (because a computed will not update) it will only change on page refresh
  // because app will only update on refresh.
  methods: {
    signOut() {
      authenticationApi.signOut().then(() => {
        this.$store.dispatch(LOGOUT)
        this.$toasted.show('Signed out!', {type : 'success', icon: 'check'})
      })
    },
    isRoute(name) {
      return (this.$route.name === name)
    }
  },
  created() {
    const token = localStorage.getItem('token')
    if (token) {
      this.$store.commit(SETTOKEN, token)
    } else {
      localStorage.setItem('newOpen', true)
      localStorage.removeItem('newOpen')
    }
    // Listen to storage for token updates
    window.addEventListener('storage', (ev) => {
      if(!ev.newValue) return;
      // dont use dispatch because you dont want to share
      if (ev.key === 'token') {
        this.$store.commit(SETTOKEN, ev.newValue)
        return
      }
      if (this.hasToken) {
        if(ev.key === 'forgetToken') {
          this.$store.commit(REMOVETOKEN, ev.newValue)
        } else if (ev.key === 'newOpen') {
          localStorage.setItem('newOpenToken', this.jwt)
          localStorage.removeItem('newOpenToken')
        }
      } else {
        // TODO might not need newOpenToken but dont want to set all tokens again when tab is open
        if (ev.key === 'newOpenToken') {
          this.$store.commit(SETTOKEN, ev.newValue)
        }
      }
    });
  }
}

</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.lobster {
  font-family: 'Lobster', cursive;
}
.is-over-pageloader {
  z-index: 999999;
}
</style>
