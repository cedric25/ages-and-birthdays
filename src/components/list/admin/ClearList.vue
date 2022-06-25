<template>
  <div class="text-right">
    <button type="button" class="btn btn-admin" @click="clearList">
      Clear list?
    </button>
  </div>
</template>

<script>
import { removeAllPersons } from '@/helpers/importantPersons.ts'

export default {
  name: 'ClearList',
  data: () => ({
    confirmClearDialog: false,
  }),
  methods: {
    clearList() {
      removeAllPersons()
      this.confirmClearDialog = false
    },
  },
}
</script>
