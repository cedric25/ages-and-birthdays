<template>
  <v-app>
    <v-toolbar app dark color="primary">
      <router-link to="/">
        <v-toolbar-title class="white--text header-title">
          Ages and Birthdays
        </v-toolbar-title>
      </router-link>
      <v-spacer />
      <v-toolbar-items>
        <v-btn flat to="/about">
          About
        </v-btn>
        <ab-google-signin />
        <ab-sync-loader v-if="user" />
      </v-toolbar-items>
    </v-toolbar>

    <v-content>
      <router-view class="child-view" />
    </v-content>
  </v-app>
</template>

<script>
  import { mapGetters } from 'vuex'
  import GoogleSignin from './components/GoogleSignin'
  import SyncLoader from './components/SyncLoader.js'

  export default {
    components: {
      'ab-google-signin': GoogleSignin,
      'ab-sync-loader': SyncLoader,
    },
    computed: {
      ...mapGetters(['user']),
    },
  }
</script>

<style scoped lang="scss">
  a {
    text-decoration: none;
  }

  @media (max-width: 450px) {
    /deep/ .toolbar__content {
      margin-left: 16px;

      > a {
        margin-left: 0 !important;
      }
    }
    /deep/ .toolbar__items {
      margin-right: 16px !important;
    }

    .header-title {
      margin-left: 0;
    }
  }

  /deep/ .content--wrap {
    background-image: url(/static/img/material2-bw.jpg);
    background-attachment: fixed;
    background-position: center;
    background-size: auto 100%;
    @media (min-aspect-ratio: 35/20) {
      background-size: 100% auto;
    }
  }
</style>
