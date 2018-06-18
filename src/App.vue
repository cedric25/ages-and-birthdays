<template>
  <v-app light>

    <v-toolbar app dark color="primary">
      <router-link to="/">
        <v-toolbar-title class="white--text">
          Ages and Birthdays
        </v-toolbar-title>
      </router-link>
      <v-spacer />
      <v-toolbar-items>
        <v-btn flat to="/about">
          About
        </v-btn>
        <ab-google-signin />
      </v-toolbar-items>
    </v-toolbar>

    <v-content>
      <router-view class="child-view" />
    </v-content>

  </v-app>
</template>

<script>
import GoogleSignin from './components/GoogleSignin'

export default {
  components: {
    'ab-google-signin': GoogleSignin,
  },
}
</script>

<style scoped>
  a {
    text-decoration: none;
  }
</style>
