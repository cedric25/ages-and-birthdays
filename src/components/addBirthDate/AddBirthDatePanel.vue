<template>
  <v-expansion-panels v-model="indexPanelExpanded" flat class="one-panel">
    <v-expansion-panel>
      <v-expansion-panel-header>
        {{ panelHeaderTitle }}
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <AddBirthDate :is-birthday-form-open="indexPanelExpanded === 0" />
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
  import AddBirthDate from './AddBirthDate'
  import { mapGetters } from 'vuex'

  export default {
    name: 'AddBirthDatePanel',
    components: {
      AddBirthDate,
    },
    data: () => ({
      indexPanelExpanded: null,
    }),
    computed: {
      ...mapGetters(['importantPersons', 'loginTried']),
      panelHeaderTitle() {
        if (this.importantPersons.length === 0) {
          return `Add your first person's birthday to the list`
        }
        return `Add someone's birthday`
      },
    },
    mounted() {
      this.openOrClosePanel()
    },
    methods: {
      openOrClosePanel() {
        this.indexPanelExpanded = this.importantPersons.length === 0 ? 0 : null
      },
    },
  }
</script>

<style scoped>
  .one-panel {
    max-width: 95%;
    margin: auto;
  }
</style>
