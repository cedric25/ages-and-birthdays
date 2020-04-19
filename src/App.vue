<template>
  <div>
    <TopMenu />

    <transition name="slide" mode="out-in">
      <div style="padding-top: 56px;">
        <router-view />
      </div>
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

<style lang="scss">
  @import 'assets/styles/global.scss';
</style>
