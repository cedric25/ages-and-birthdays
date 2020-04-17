<template>
  <div class="top-menu">
    <router-link to="/" class="text-xl">
      Ages and Birthdays
    </router-link>

    <router-link to="/about">
      ABOUT
    </router-link>

    <!--    <GoogleSignin />-->

    <!--    <SyncLoader v-if="user" />-->
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  // Components
  // import GoogleSignin from './GoogleSignin'
  // import SyncLoader from './SyncLoader'

  export default {
    name: 'TopMenu',
    // components: {
    // GoogleSignin,
    // SyncLoader,
    // },
    computed: {
      ...mapGetters(['user']),
    },
  }
</script>

<style scoped lang="scss">
  .top-menu {
    height: 56px;
    @apply flex items-center justify-between;
    @apply px-4;
    @apply bg-blue-600 text-white;
    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14),
      0 1px 10px 0 rgba(0, 0, 0, 0.12);
  }
</style>
