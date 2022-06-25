<template>
  <div>
    <div class="flex flex-row flex-wrap items-center">
      <div
        class="mb-2 flex flex-wrap justify-center"
        v-for="(group, index) in groups"
        :key="group"
      >
        <div v-if="index === beingEditedGroupIndex">
          <form>
            <input
              ref="newGroupName"
              :value="newGroupName"
              @input="event => inputGroupName(event, group)"
              name="group"
              class="input ml-2"
              :style="'width: ' + groupNameInputSize + 'px'"
              :error="inputHasError"
              @keyup.esc="beingEditedGroupIndex = null"
            />
            <button
              type="submit"
              class="mr-2 inline-flex items-center justify-center rounded-full hover:bg-gray-200"
              style="width: 29px; height: 29px"
              @click.prevent="submitNewGroupName(group)"
            >
              <i class="fa fa-check" />
            </button>
            <div class="to-get-text-width">{{ newGroupName }}</div>
          </form>
        </div>
        <Chip v-else closable @close="deleteGroup(group)">
          {{ group }}
          <button
            type="button"
            class="ml-1 hover:text-gray-300"
            @click="editGroup(index, group)"
          >
            <i class="fa fa-pencil-alt" />
          </button>
        </Chip>
      </div>
    </div>

    <AddGroup :is-group-form-open="isGroupsFormOpen" />
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { useAppStore } from '@/store/app/app.store.ts'
import * as groups from '@/helpers/groups'

export default {
  name: 'ManageGroups',
  props: {
    isGroupsFormOpen: { type: Boolean, required: true },
  },
  data: () => ({
    // Initialize with these two groups for height of content to be the good one...
    // groupsList: ['Family', 'Friends'],
    newGroupName: '',
    beingEditedGroupIndex: null,
    groupNameInputSize: 0,
    inputHasError: false,
  }),
  computed: {
    ...mapState(useAppStore, { groups: 'sortedGroups' }),
  },
  methods: {
    deleteGroup(group) {
      groups.deleteGroup(group)
    },
    editGroup(index, groupToEdit) {
      this.beingEditedGroupIndex = index
      this.newGroupName = groupToEdit

      this.$nextTick(() => {
        this.inputGroupName(
          { target: { value: this.newGroupName } },
          this.newGroupName
        )
        this.$refs['newGroupName'][0].focus()
      })
    },
    submitNewGroupName(groupToEdit) {
      if (this.inputHasError) {
        return
      }
      groups.renameGroup(groupToEdit, this.newGroupName)
      this.beingEditedGroupIndex = null
    },
    inputGroupName($event, originalName) {
      const newName = $event.target.value
      this.newGroupName = newName

      const groupsMinusEditingOne = this.groups.filter(group => {
        return group !== originalName
      })
      if (newName !== originalName) {
        groupsMinusEditingOne.push(this.newGroupName)
      }
      this.inputHasError =
        groupsMinusEditingOne.length !== new Set(groupsMinusEditingOne).size

      setTimeout(() => {
        const textWidthDiv = this.$el.querySelector('.to-get-text-width')
        this.groupNameInputSize = textWidthDiv.clientWidth + 20
      })
    },
  },
}
</script>

<style scoped>
.to-get-text-width {
  width: auto;
  display: inline-block;
  visibility: hidden;
  position: fixed;
  overflow: auto;
}
</style>
