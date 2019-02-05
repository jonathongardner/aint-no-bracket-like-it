<template>
  <div class='container'>
    <div class='column is-10 is-offset-1'>
      <h1 class='title has-text-centered'>Admin Panel</h1>
      <div class="tabs is-boxed">
        <ul>
          <li :class="{ 'is-active' : isRoute('admin-unapproved-users') }">
            <router-link :to="{name: 'admin-unapproved-users'}">Unapproved Users</router-link>
          </li>
          <li :class="{ 'is-active' : isRoute('admin-users') }">
            <router-link :to="{name: 'admin-users'}">All Users</router-link>
          </li>
        </ul>
      </div>
      <router-view :key='$route.name'></router-view>
    </div>
  </div>
</template>

<script>
export default {
	name: 'AdminPage',
  methods: {
    isRoute(name) {
      return (this.$route.name === name)
    }
  },
}
</script>
