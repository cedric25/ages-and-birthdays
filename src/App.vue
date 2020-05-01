<template>
  <div>
    <TopMenu />

    <button type="button" @click="askForConsent" class="mt-24 ml-8">
      Import from Google?
    </button>

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
    methods: {
      askForConsent() {
        window.gapi.auth2.getAuthInstance().signIn()
      },
    },
  }
</script>

<style lang="scss">
  @import 'assets/styles/global.scss';
</style>
