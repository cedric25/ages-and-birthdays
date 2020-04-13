<template>
  <v-expansion-panels v-model="isPanelExpanded">
    <v-expansion-panel>
      <v-expansion-panel-header>
        {{ addPersonLabel }}
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <AddBirthDate :is-birthday-form-open="!!isPanelExpanded" />
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
      isPanelExpanded: 1,
      addPersonLabel: `Add someone's birthday`,
    }),
    computed: {
      ...mapGetters(['importantPersons', 'loginTried']),
    },
    created() {
      if (this.loginTried > 0) {
        this.updatePanelTitle()
      }
    },
    methods: {
      updatePanelTitle() {
        if (this.importantPersons.length === 0) {
          this.isBirthdayFormOpen = true
          this.addPersonLabel = `Add your first person's birthday to the list`
        } else {
          this.isBirthdayFormOpen = false
          this.addPersonLabel = `Add someone's birthday`
        }
      },
    },
  }
</script>

<style scoped></style>
