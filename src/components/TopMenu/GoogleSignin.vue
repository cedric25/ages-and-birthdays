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
        @click="signOut"
      >
        <img
          v-if="user.photoUrl"
          :src="user.photoUrl"
          :alt="user.name"
          class="rounded-full"
        />
        <div
          v-else
          class="flex h-full items-center justify-center rounded-full bg-blue-700 text-xl"
        >
          {{ user.name.substring(0, 1) }}
        </div>
        <span class="tooltip-text"> Signout </span>
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { useUserStore } from '@/store/user/user.store.ts'

export default {
  name: 'GoogleSignin',
  data: () => ({
    smileType: 'smile',
    showSigninTooltip: false,
    showSignoutTooltip: false,
  }),
  computed: {
    ...mapState(useUserStore, ['user']),
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
      const userStore = useUserStore()
      userStore.signUserInGoogle()
    },
    signOut() {
      this.showSigninTooltip = false
      this.showSignoutTooltip = false
      const userStore = useUserStore()
      userStore.signOut()
    },
  },
}
</script>

<style scoped>
.tooltip .tooltip-text {
  @apply invisible absolute opacity-0;
  @apply text-center text-sm;
  @apply rounded bg-gray-600;
  @apply px-4 py-1;
  @apply transition duration-300 ease-out;
  z-index: 100;
  right: 6px;
  top: 47px;
}
.tooltip:hover .tooltip-text {
  @apply visible;
  @apply translate-y-1 transform;
  opacity: 0.95;
}
</style>
