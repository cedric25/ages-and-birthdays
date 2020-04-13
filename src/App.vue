<template>
  <v-app>
    <TopMenu />

    <v-content>
      <transition name="slide" mode="out-in">
        <router-view class="child-view" />
      </transition>
    </v-content>
  </v-app>
</template>

<script>
  import TopMenu from './components/TopMenu.vue'

  export default {
    components: {
      TopMenu,
    },
  }
</script>

<style scoped lang="scss">
  .theme--light.v-application {
    background-color: #fafafa;
  }
</style>
