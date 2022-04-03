<template>
  <div class="add-group-form-wrap ml-2 mt-3">
    <form class="add-group-form">
      <input
        ref="group"
        v-model="newGroupName"
        name="group"
        placeholder="Add new..."
        class="input new-group-input mr-2 pt-0"
        :error="hasError"
      />
      <button
        type="submit"
        :disabled="!newGroupName"
        class="btn btn-blue"
        style="padding-right: 0.9rem"
        @click.prevent="addGroup"
      >
        <i class="fa fa-plus text-xs" />
      </button>
      <div v-if="showError" class="ml-4 text-red-600">
        {{ errorMessage }}
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import * as groups from '../../helpers/groups'

export default {
  name: 'AddGroup',
  props: {
    isGroupFormOpen: { type: Boolean, required: false },
  },
  data() {
    return {
      newGroupName: '',
      errorMessage: 'This group already exists...',
      showError: false,
    }
  },
  computed: {
    ...mapGetters(['groups']),
    hasError() {
      return this.groups.indexOf(this.newGroupName) !== -1
    },
  },
  watch: {
    newGroupName() {
      this.showError = false
    },
    isGroupFormOpen(value) {
      value && this.focusGroupInputDelay()
    },
  },
  methods: {
    focusGroupInputDelay() {
      setTimeout(() => this.$refs.group.focus(), 300)
    },
    addGroup() {
      if (this.hasError) {
        this.showError = true
        return
      }
      groups.addGroup(this.$store, this.newGroupName)
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

.add-group-form >>> .input-group__details {
  min-height: 1px;
}
</style>
