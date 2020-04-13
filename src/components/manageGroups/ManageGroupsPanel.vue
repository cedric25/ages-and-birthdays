<template>
  <v-expansion-panels v-model="indexPanelExpanded" flat class="one-panel mt-1">
    <v-expansion-panel>
      <v-expansion-panel-header>
        Manage groups
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <ManageGroups :is-groups-form-open="indexPanelExpanded === 0" />
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
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
