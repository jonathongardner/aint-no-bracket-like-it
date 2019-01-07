<template>
  <div id="app">
    <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <router-link to="/" class="navbar-item lobster is-size-3">
          ANBLI
        </router-link>
      </div>
      <div id='anbli-navbar' class="navbar-menu">
        <div class="navbar-start navbar-router">
          <router-link class="navbar-item" :class="{ 'is-active' : $route.name === 'home' }" to="/">
            Home
          </router-link>
          <router-link class="navbar-item" :class="{ 'is-active' : $route.name === 'bracket' }" to="/brackets">
            Brackets
          </router-link>
          <router-link class="navbar-item" :class="{ 'is-active' : $route.name === 'create-bracket' }" to="/create-bracket">
            Create Brackets
          </router-link>
        </div>
        <div class="navbar-end navbar-router">
          <router-link class="navbar-item" :class="{ 'is-active' : $route.name === 'about' }" to="/about">
            About
          </router-link>
        </div>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

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
</style>
