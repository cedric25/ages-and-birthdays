<template>
  <ExpandablePanel
    :panel-header-title="panelHeaderTitle"
    :prefix-icon="'fa fa-user-plus'"
    :show-content="isPanelExpanded"
    @isExpanded="isExpanded => (isPanelExpanded = isExpanded)"
    class="mb-1"
  >
    <AddBirthDate :is-birthday-form-open="isPanelExpanded" />
  </ExpandablePanel>
</template>

<script>
import { mapState } from 'pinia'
import { useUserStore } from '@/store/user/user.store.ts'
import { useAppStore } from '@/store/app/app.store.ts'

export default {
  name: 'AddBirthDatePanel',
  data: () => ({
    isPanelExpanded: false,
  }),
  computed: {
    ...mapState(useUserStore, ['loginTriedOrFinished']),
    ...mapState(useAppStore, ['importantPersons']),
    panelHeaderTitle() {
      if (this.loginTriedOrFinished && this.importantPersons.length === 0) {
        return `Add your first person's birthday`
      }
      return `Add someone's birthday`
    },
  },
  // watch: {
  //   loginTriedOrFinished() {
  //     if (this.importantPersons.length === 0) {
  //       this.isPanelExpanded = true
  //     }
  //   },
  //   'importantPersons.length': {
  //     handler() {
  //       if (this.importantPersons.length === 0) {
  //         this.isPanelExpanded = true
  //       }
  //     },
  //   },
  // },
}
</script>
