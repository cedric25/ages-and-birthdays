<template>

  <v-expansion-panel popout>
    <v-expansion-panel-content
      v-model="isBirthdayFormOpen"
    >
      <div slot="header">
        {{ addPersonLabel }}
      </div>
      <ab-add-birth-date
        :isBirthdayFormOpen="isBirthdayFormOpen"
      />
    </v-expansion-panel-content>

    <v-expansion-panel-content
      v-model="isGroupFormOpen"
    >
      <div slot="header">
        Manage groups
      </div>
      <div class="manage-groups">
        <ab-manage-groups
          :isGroupFormOpen="isGroupFormOpen"
        />
      </div>
    </v-expansion-panel-content>
  </v-expansion-panel>

</template>

<script>
import { mapGetters } from 'vuex'
import ManageGroups from './ManageGroups.vue'
import AddBirthDate from './AddBirthDate.vue'

export default {
  name: 'AddAndManage',
  components: {
    'ab-add-birth-date': AddBirthDate,
    'ab-manage-groups': ManageGroups,
  },
  data() {
    return {
      isBirthdayFormOpen: false,
      isGroupFormOpen: false,
      addPersonLabel: `Add someone's birthday`,
    }
  },
  computed: {
    ...mapGetters([
      'importantPersons',
      'loginTried',
    ]),
  },
  created() {
    if (this.loginTried > 0) {
      this.updatePanelTitle()
    }
  },
  watch: {
    loginTried(newValue) {
      if (newValue) {
        this.updatePanelTitle()
      }
    },
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
  }
}
</script>

<style scoped>
  .manage-groups {
    padding: 5px 20px 20px;
  }
</style>
