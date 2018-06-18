<template>
  <div class="google-signin ml-3">

    <a
      v-if="!user"
      @click.prevent="googleSignin()"
    >
      <v-icon large>face</v-icon>
    </a>

    <a
      v-if="user"
      @click.prevent="signout()"
    >
      <v-avatar
        slot="activator"
        size="36px"
      >
        <img
          v-if="user.photoUrl"
          :src="user.photoUrl"
          :alt="user.name"
        >
        <v-icon v-else color="blue">{{ user.name.substr(0, 1) }}</v-icon>
      </v-avatar>
    </a>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'GoogleSignin',
  computed: {
    ...mapGetters([
      'user',
    ]),
  },
  methods: {
    googleSignin() {
      this.$store.dispatch('signUserInGoogle')
    },
    signout() {
      this.$store.dispatch('signout')
    },
  }
}
</script>

<style scoped>
  .google-signin {
    display: flex;
    align-items: center;
  }
</style>
