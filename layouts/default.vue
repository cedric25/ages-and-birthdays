<template>
  <v-app>
    <main>

      <v-toolbar dark color="primary">
        <router-link to="/">
          <v-toolbar-title class="white--text">
            Ages and Birthdays
          </v-toolbar-title>
        </router-link>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn flat to="/about">About</v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <nuxt/>
    </main>
  </v-app>
</template>

<style>
  html {
    font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    font-size: 16px;
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
  }

  *, *:before, *:after {
    box-sizing: border-box;
    margin: 0;
  }
</style>
