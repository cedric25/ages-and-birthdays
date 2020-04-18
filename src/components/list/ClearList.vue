<template>
  <!--  <div v-model="confirmClearDialog" @keydown.esc="confirmClearDialog = false">-->
  <div @keydown.esc="confirmClearDialog = false">
    <button>
      Clear list?
    </button>
    <div v-if="false">
      <div class="headline grey lighten-2">
        Please confirm...
      </div>
      <div class="mt-4">
        This will delete all persons...
      </div>

      <div>
        <button type="button" class="btn" @click="confirmClearDialog = false">
          No
        </button>
        <button type="button" class="btn btn-blue" @click="clearList">
          Yes
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import * as importantPersons from '../../helpers/importantPersons'

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
