<template>
  <div>
    <div class="group-chip mr-2 mb-2" v-for="group in groupsList" :key="group.name">
      <div v-if="group.isEditMode" class="group-name-input-wrap">
        <input
          ref="newGroupName"
          :value="newGroupName"
          @input="event => inputGroupName(event, group.name)"
          name="group"
          hide-details
          append-icon="mdi-check"
          @click:append="() => submitNewGroupName(group)"
          @keyup.enter="submitNewGroupName(group)"
          class="group-name-input mt-0 pt-0"
          :style="'width: ' + groupNameInputSize + 'px'"
          :error="inputHasError"
          @keyup.esc="cancelEdit"
        />
        <div class="to-get-text-width">
          {{ newGroupName }}
        </div>
      </div>
      <Chip v-if="!group.isEditMode" color="secondary" close @click:close="deleteGroup(group)">
        {{ group.name }}
        <button
          type="button"
          icon
          depressed
          color="white"
          class="edit-icon"
          @click="editGroup(group)"
        >
          <i class="fa fa-pencil-alt" />
        </button>
      </Chip>
    </div>
    <div class="clear-fix"></div>

    <AddGroup :is-group-form-open="isGroupsFormOpen" />
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import * as groups from '../../helpers/groups'

  // Components
  import AddGroup from './AddGroup'
  import Chip from '../Chip'

  export default {
    name: 'ManageGroups',
    components: {
      AddGroup,
      Chip,
    },
    props: {
      isGroupsFormOpen: { type: Boolean, required: true },
    },
    data() {
      return {
        groupsList: [],
        newGroupName: '',
        groupNameInputSize: 0,
        inputHasError: false,
      }
    },
    computed: {
      ...mapGetters(['groups']),
    },
    mounted() {
      const sortedGroups = this.groups.sort((groupOne, groupTwo) => {
        return groupOne.toLowerCase().localeCompare(groupTwo.toLowerCase())
      })
      this.groupsList = sortedGroups.map(group => ({ name: group, isEditMode: false }))
    },
    created() {
      this.$store.watch(
        () => this.$store.getters.groups,
        newStoreGroups => {
          const clonedStoreGroups = [...newStoreGroups]
          const sortedGroups = clonedStoreGroups.sort((groupOne, groupTwo) => {
            return groupOne.toLowerCase().localeCompare(groupTwo.toLowerCase())
          })
          this.groupsList = sortedGroups.map(group => ({ name: group, isEditMode: false }))
        }
      )
    },
    methods: {
      deleteGroup(group) {
        groups.deleteGroup(this.$store, group.name)
      },
      editGroup(groupToEdit) {
        this.groupsList = this.groupsList.map(group => {
          if (group.name === groupToEdit.name) {
            this.newGroupName = groupToEdit.name
            return {
              name: group.name,
              isEditMode: true,
            }
          }
          return {
            name: group.name,
            isEditMode: false,
          }
        })

        this.$nextTick(() => {
          this.inputGroupName(this.newGroupName, this.newGroupName)
          this.$refs['newGroupName'][0].focus()
        })
      },
      submitNewGroupName(groupToEdit) {
        if (this.inputHasError) {
          return
        }

        this.groupsList = this.groupsList.map(group => {
          if (group.name === groupToEdit.name) {
            return {
              name: this.newGroupName,
              isEditMode: false,
            }
          }
          return group
        })
        groups.renameGroup(this.$store, groupToEdit.name, this.newGroupName)
      },
      inputGroupName(newName, originalName) {
        this.newGroupName = newName

        const groupsMinusEditingOne = this.groups.filter(group => {
          return group !== originalName
        })
        if (newName !== originalName) {
          groupsMinusEditingOne.push(this.newGroupName)
        }
        this.inputHasError = groupsMinusEditingOne.length !== new Set(groupsMinusEditingOne).size

        setTimeout(() => {
          const textWidthDiv = this.$el.querySelector('.to-get-text-width')
          this.groupNameInputSize = textWidthDiv.clientWidth + 60
        })
      },
      cancelEdit() {
        this.groupsList.forEach(group => {
          group.isEditMode = false
        })
      },
    },
  }
</script>

<style scoped>
  .group-chip {
    float: left;
  }

  .clear-fix {
    float: none;
    clear: both;
  }

  .edit-icon {
    margin-left: 5px;
    margin-right: -3px;
  }

  .group-name-input-wrap {
    padding-left: 12px;
    padding-right: 5px;
  }

  .to-get-text-width {
    width: auto;
    display: inline-block;
    visibility: hidden;
    position: fixed;
    overflow: auto;
  }
</style>

<style>
  .group-name-input input {
    padding-bottom: 4px;
  }
</style>
