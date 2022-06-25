<template>
  <div style="margin-bottom: -24px">
    <i
      v-if="isSyncingDb"
      class="syncing fas fa-circle-notch fa-spin text-lg"
    ></i>

    <span v-else class="synced">
      <i class="fa fa-check-circle text-lg" />
    </span>
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { useAppStore } from '@/store/app/app.store.js'

export default {
  name: 'SyncLoader',
  computed: {
    ...mapState(useAppStore, ['isSyncingDb']),
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
