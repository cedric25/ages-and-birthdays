<template>
  <ExpandablePanel panel-header-title="Manage groups">
    <ManageGroups :is-groups-form-open="isPanelExpanded" />
  </ExpandablePanel>
</template>

<script>
  // Components
  import ExpandablePanel from '../ExpandablePanel'
  import ManageGroups from './ManageGroups.vue'

  export default {
    name: 'ManageGroupsPanel',
    components: {
      ExpandablePanel,
      ManageGroups,
    },
    data: () => ({
      isPanelExpanded: false,
    }),
  }
</script>

<style scoped>
  .one-panel {
    max-width: 95%;
    margin: auto;
  }
</style>
