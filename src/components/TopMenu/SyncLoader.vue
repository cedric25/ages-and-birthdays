<template>
  <div style="margin-bottom: -24px;">
    <i v-if="isSyncingDb" class="syncing fas fa-circle-notch fa-spin text-lg"></i>

    <span v-else class="synced">
      <i class="fa fa-check-circle text-lg" />
    </span>
  </div>
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
