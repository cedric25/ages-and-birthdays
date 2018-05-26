<template>
  <div>

    <div
      class="float-left"
      v-for="group in groupsList"
      :key="group.name"
    >

      <div
        v-if="group.isEditMode"
        class="group-name-input-wrap"
      >
        <v-text-field
          ref="newGroupName"
          :value="newGroupName"
          @input="(event) => { inputGroupName(event, group.name) }"
          name="group"
          append-icon="check"
          :append-icon-cb="() => submitNewGroupName(group)"
          @keyup.enter="submitNewGroupName(group)"
          class="group-name-input"
          :style="'width: ' + groupNameInputSize + 'px'"
          :error="inputHasError"
          v-click-outside="cancelEdit"
          @keyup.esc="cancelEdit"
        />
        <div class="to-get-text-width">
          {{ newGroupName }}
        </div>
      </div>
      <v-chip
        v-if="!group.isEditMode"
        color="secondary"
        text-color="white"
        class="blue-chip"
        close
        @input="deleteGroup(group)"
      >
        {{ group.name }}
        <div class="chip__close edit-icon" @click="editGroup(group)">
          <i aria-hidden="true" class="icon material-icons">
            edit
          </i>
        </div>
      </v-chip>

    </div>
    <div class="clear-fix"></div>

    <add-group
      :isGroupFormOpen="isGroupFormOpen"
    />

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AddGroup from './AddGroup'

/**
 * TODO
 * Fix 'saute' due to input shown before having calculating its right width
 *   (hide with an animation?)
 * Try to have a dark rounded submit icon?
 */

export default {
  components: {
    AddGroup,
  },
  props: {
    isGroupFormOpen: {
      type: Boolean,
      required: true,
    }
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
    ...mapGetters([
      'groups',
    ]),
  },
  mounted() {
    const sortedGroups = this.groups.sort((groupOne, groupTwo) => {
      return groupOne.toLowerCase().localeCompare(groupTwo.toLowerCase())
    })
    this.groupsList = sortedGroups.map(group => ({ name: group, isEditMode: false }))
  },
  created() {
    this.$store.watch(
      state => this.$store.getters.groups,
      newStoreGroups => {
        const clonedStoreGroups = [ ...newStoreGroups ]
        const sortedGroups = clonedStoreGroups.sort((groupOne, groupTwo) => {
          return groupOne.toLowerCase().localeCompare(groupTwo.toLowerCase())
        })
        this.groupsList = sortedGroups.map(group => ({ name: group, isEditMode: false }))
      }
    )
  },
  methods: {
    deleteGroup (group) {
      this.$store.commit('deleteGroup', group.name)
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
            isEditMode: false
          }
        }
        return group
      })
      this.$store.commit('renameGroup', {
        oldName: groupToEdit.name,
        newName: this.newGroupName,
      })
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
  }
}
</script>

<style scoped>
  .float-left {
    float: left;
  }
  .clear-fix {
    float: none;
    clear: both;
  }

  .edit-icon {
    margin-right: -3px;
  }

  .group-name-input-wrap {
    padding-left: 12px;
    padding-right: 5px;
  }

  .group-name-input {
    padding-top: 7px;
  }

  .group-name-input /deep/ .input-group__details {
    min-height: 1px;
  }

  .to-get-text-width {
    width: auto;
    display: inline-block;
    visibility: hidden;
    position: fixed;
    overflow: auto;
  }
</style>
