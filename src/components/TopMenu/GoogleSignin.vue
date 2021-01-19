<template>
  <div>
    <div v-if="!user" class="tooltip">
      <button type="button" class="flex" @click="googleSignin">
        <i
          class="fas text-3xl"
          :class="`fa-${smileType}`"
          style="margin-right: 10px"
        />
      </button>
      <span class="tooltip-text"> Signin </span>
    </div>

    <div v-if="user" class="tooltip">
      <button
        type="button"
        class="flex"
        style="width: 36px; height: 36px"
        @click="signout"
      >
        <img
          v-if="user.photoUrl"
          :src="user.photoUrl"
          :alt="user.name"
          class="rounded-full"
        />
        <div
          v-else
          class="bg-blue-700 rounded-full h-full flex items-center justify-center text-xl"
        >
          {{ user.name.substr(0, 1) }}
        </div>
        <span class="tooltip-text"> Signout </span>
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'GoogleSignin',
  data: () => ({
    smileType: 'smile',
    showSigninTooltip: false,
    showSignoutTooltip: false,
  }),
  computed: {
    ...mapGetters(['user']),
  },
  mounted() {
    setInterval(() => {
      this.smileType = 'smile-wink'
      setTimeout(() => {
        this.smileType = 'smile'
      }, 500)
    }, 20000)
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

<style scoped>
.tooltip .tooltip-text {
  @apply absolute opacity-0 invisible;
  @apply text-center text-sm;
  @apply bg-gray-600 rounded;
  @apply px-4 py-1;
  @apply transition duration-300 ease-out;
  z-index: 100;
  right: 6px;
  top: 47px;
}
.tooltip:hover .tooltip-text {
  @apply visible;
  @apply transform translate-y-1;
  opacity: 0.95;
}
</style>
