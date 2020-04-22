<template>
  <div>
    <TopMenu />

    <div style="padding-top: 56px;">
      <transition name="slide" mode="out-in">
        <router-view />
      </transition>
    </div>
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
