<template>
  <v-layout align-center class="ml-3">

    <v-tooltip bottom open-delay="50" close-delay="100">
      <a
        v-if="!user"
        slot="activator"
        @click.prevent="googleSignin()"
      >
        <v-icon large>face</v-icon>
      </a>
      <span>Signin</span>
    </v-tooltip>

    <v-tooltip bottom open-delay="50" close-delay="100">
      <a
        v-if="user"
        slot="activator"
        @click.prevent="signout()"
      >
        <v-avatar
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
      <span>Signout</span>
    </v-tooltip>

  </v-layout>
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
