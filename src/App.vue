<template>
  <v-app light>

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
</style>
