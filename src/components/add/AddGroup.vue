<template>

  <div class="add-group-form-wrap ml-2 mt-3">
    <div class="add-group-form">
      <v-text-field
        v-model="newGroupName"
        name="group"
        placeholder="Add new..."
        class="new-group-input pt-0"
        @keyup.enter="addGroup()"
        :error="hasError"
      />
      <v-btn :disabled="!newGroupName" color="accent" @click.prevent="addGroup()">
        Add group
      </v-btn>
      <div v-if="showError" class="red--text">
        {{ errorMessage }}
      </div>
    </div>
  </div>

</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      newGroupName: '',
      errorMessage: 'This group already exists...',
      showError: false,
    }
  },
  computed: {
    ...mapGetters([
      'groups',
    ]),
    hasError() {
      return this.groups.indexOf(this.newGroupName) !== -1
    },
  },
  watch: {
    newGroupName() {
      this.showError = false
    }
  },
  methods: {
    addGroup() {
      if (this.hasError) {
        this.showError = true
        return
      }
      this.$store.commit('addGroup', this.newGroupName)
      this.newGroupName = ''
    },
  },
}
</script>

<style scoped>
  .add-group-form {
    display: flex;
    align-items: baseline;
  }

  .new-group-input {
    max-width: 200px;
  }

  .add-group-form /deep/ .input-group__details {
    min-height: 1px;
  }
</style>
