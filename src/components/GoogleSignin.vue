<template>
  <v-layout align-center class="ml-3">
    <v-tooltip v-if="!user" v-model="showSigninTooltip" bottom open-delay="50" close-delay="100">
      <template v-slot:activator="{ on }">
        <a v-on="on" @click.prevent="googleSignin">
          <v-icon size="36" style="margin-right: 10px;">fa-smile</v-icon>
        </a>
      </template>
      <span>Signin</span>
    </v-tooltip>

    <v-tooltip v-if="user" v-model="showSignoutTooltip" bottom open-delay="50" close-delay="100">
      <template v-slot:activator="{ on }">
        <a v-on="on" @click.prevent="signout">
          <v-avatar size="36px">
            <img v-if="user.photoUrl" :src="user.photoUrl" :alt="user.name" />
            <v-icon v-else color="blue">{{ user.name.substr(0, 1) }}</v-icon>
          </v-avatar>
        </a>
      </template>
      <span>Signout</span>
    </v-tooltip>
  </v-layout>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'GoogleSignin',
    data() {
      return {
        showSigninTooltip: false,
        showSignoutTooltip: false,
      }
    },
    computed: {
      ...mapGetters(['user']),
    },
    methods: {
      googleSignin() {
        this.showSigninTooltip = false
        this.showSignoutTooltip = false
        this.$store.dispatch('signUserInGoogle')
      },
      signout() {
        this.showSigninTooltip = false
        this.showSignoutTooltip = false
        this.$store.dispatch('signout')
      },
    },
  }
</script>
