<template>
  <div class="app-vue">
    <TopMenu />

    <transition name="slide" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
  import TopMenu from './components/TopMenu'

  export default {
    components: {
      TopMenu,
    },
  }
</script>

<style scoped lang="scss">
  .app-vue {
    font-family: Roboto, 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    background-color: #fafafa;
  }
</style>

<style lang="scss">
  @import 'assets/global.scss';
</style>
