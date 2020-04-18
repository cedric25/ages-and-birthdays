<template>
  <div>
    <div class="text-xl">
      {{ panelHeaderTitle }}
    </div>
    <div>
      <AddBirthDate :is-birthday-form-open="indexPanelExpanded === 0" />
    </div>
  </div>
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
      ...mapGetters(['loginTriedOrFinished', 'importantPersons']),
      panelHeaderTitle() {
        if (this.importantPersons.length === 0) {
          return `Add your first person's birthday to the list`
        }
        return `Add someone's birthday`
      },
    },
    watch: {
      loginTriedOrFinished() {
        this.openOrClosePanel()
      },
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
