<template>

  <div class="add-group-form-wrap ml-2 mt-3">
    <div class="add-group-form">
      <v-text-field
        v-model="newGroupName"
        name="group"
        placeholder="Add new..."
        class="pt-0"
        @keyup.enter="addGroup()"
      />
      <v-btn :disabled="!newGroupName" color="accent" @click.prevent="addGroup()">
        Add group
      </v-btn>
    </div>
  </div>

</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      newGroupName: '',
    }
  },
  computed: {
    ...mapGetters([
      'groups',
    ]),
  },
  methods: {
    addGroup() {
      if (this.groups.indexOf(this.newGroupName) === -1) {
        this.$store.commit('addGroup', this.newGroupName)
        this.newGroupName = ''
      }
    },
  },
}
</script>

<style scoped>
  .add-group-form-wrap {
    max-width: 300px;
  }

  .add-group-form {
    display: flex;
    align-items: baseline;
  }

  .add-group-form /deep/ .input-group__details {
    min-height: 1px;
  }
</style>
