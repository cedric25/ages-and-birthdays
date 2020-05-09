<template>
  <div class="text-right">
    <button type="button" class="btn btn-admin" @click="clearList">
      Clear list?
    </button>
  </div>
</template>

<script>
  import * as importantPersons from '@/helpers/importantPersons'

  export default {
    name: 'ClearList',
    data: () => ({
      confirmClearDialog: false,
    }),
    methods: {
      clearList() {
        importantPersons.removeAllPersons(this.$store)
        this.confirmClearDialog = false
      },
    },
  }
</script>
