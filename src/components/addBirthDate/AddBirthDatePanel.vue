<template>
  <ExpandablePanel
    :panel-header-title="panelHeaderTitle"
    :show-content="isPanelExpanded"
    @isExpanded="isExpanded => (isPanelExpanded = isExpanded)"
    class="mb-1"
  >
    <AddBirthDate :is-birthday-form-open="isPanelExpanded" />
  </ExpandablePanel>
</template>

<script>
  import { mapGetters } from 'vuex'

  // Components
  import ExpandablePanel from '../ExpandablePanel'
  import AddBirthDate from './AddBirthDate'

  export default {
    name: 'AddBirthDatePanel',
    components: {
      ExpandablePanel,
      AddBirthDate,
    },
    data: () => ({
      isPanelExpanded: false,
    }),
    computed: {
      ...mapGetters(['loginTriedOrFinished', 'importantPersons']),
      panelHeaderTitle() {
        if (this.loginTriedOrFinished && this.importantPersons.length === 0) {
          return `Add your first person's birthday to the list`
        }
        return `Add someone's birthday`
      },
    },
    watch: {
      loginTriedOrFinished() {
        if (this.importantPersons.length === 0) {
          this.isPanelExpanded = true
        }
      },
      'importantPersons.length': {
        handler() {
          if (this.importantPersons.length === 0) {
            this.isPanelExpanded = true
          }
        },
      },
    },
  }
</script>
