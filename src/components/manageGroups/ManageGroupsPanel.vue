<template>
  <ExpandablePanel
    panel-header-title="Manage groups"
    :prefix-icon="'fa fa-user-friends'"
  >
    <ManageGroups :is-groups-form-open="isPanelExpanded" />
  </ExpandablePanel>
</template>

<script>
export default {
  name: 'ManageGroupsPanel',
  data: () => ({
    isPanelExpanded: false,
  }),
}
</script>
