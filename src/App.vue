<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + Vite" />
  <p>
    <!-- use the router-link component for navigation. -->
    <!-- specify the link by passing the `to` prop. -->
    <!-- `<router-link>` will render an `<a>` tag with the correct `href` attribute -->
    <router-link to="/" class="mr-2">Go to Home</router-link>
    <router-link to="/about">Go to About</router-link>
  </p>
  <router-view></router-view>
</template>

<script setup>
import HelloWorld from './components/HelloWorld.vue'
</script>
