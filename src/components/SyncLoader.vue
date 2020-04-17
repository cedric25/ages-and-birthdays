<template>
  <v-layout align-end>
    <v-progress-circular
      v-if="isSyncingDb"
      indeterminate
      color="white"
      :size="19"
      :width="2"
      class="syncing mb-2"
    ></v-progress-circular>

    <span v-else class="synced mb-2">
      <v-icon :size="19">fa-check-circle</v-icon>
    </span>
  </v-layout>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'SyncLoader',
    computed: {
      ...mapGetters(['isSyncingDb']),
    },
  }
</script>

<style scoped>
  .syncing,
  .synced {
    margin-left: -10px;
    z-index: 2;
  }
</style>
