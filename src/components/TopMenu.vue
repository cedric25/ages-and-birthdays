<template>
  <v-app-bar app dark color="primary" class="my-app-bar">
    <router-link to="/">
      <v-toolbar-title class="white--text header-title">
        Ages and Birthdays
      </v-toolbar-title>
    </router-link>
    <v-spacer />
    <v-toolbar-items>
      <v-btn text to="/about">
        About
      </v-btn>
      <ab-google-signin />
      <ab-sync-loader v-if="user" />
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
  import { mapGetters } from 'vuex'

  // Components
  import GoogleSignin from './GoogleSignin'
  import SyncLoader from './SyncLoader.js'

  export default {
    name: 'TopMenu',
    components: {
      'ab-google-signin': GoogleSignin,
      'ab-sync-loader': SyncLoader,
    },
    computed: {
      ...mapGetters(['user']),
    },
  }
</script>

<style>
  .my-app-bar a {
    text-decoration: none;
  }
</style>
