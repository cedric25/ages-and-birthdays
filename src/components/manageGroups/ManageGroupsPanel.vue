<template>
  <div>
    <div class="text-xl">
      Manage groups
    </div>
    <div>
      <ManageGroups :is-groups-form-open="indexPanelExpanded === 0" />
    </div>
  </div>
</template>

<script>
  import ManageGroups from './ManageGroups.vue'

  export default {
    name: 'ManageGroupsPanel',
    components: {
      ManageGroups,
    },
    data: () => ({
      indexPanelExpanded: null,
    }),
  }
</script>

<style scoped>
  .one-panel {
    max-width: 95%;
    margin: auto;
  }
</style>
