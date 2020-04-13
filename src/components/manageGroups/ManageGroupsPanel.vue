<template>
  <v-expansion-panels v-model="isPanelExpanded">
    <v-expansion-panel>
      <v-expansion-panel-header>
        Manage groups
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <ManageGroups :is-groups-form-open="!!isPanelExpanded" />
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
      isPanelExpanded: 1, // 1 = collapsed
    }),
  }
</script>
