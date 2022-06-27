import { defineStore } from 'pinia'
import type { Person, PersonUpdateInput } from '@/@types/Person'
import type { Group } from '@/@types/Group'

type State = {
  importantPersons: Person[]
  groups: Group[]
  isSyncingDb: boolean
  doingImportFromGoogle: boolean
  isImportFromGoogleDone: boolean
  totalConnections: number | null
}

export const useAppStore = defineStore('app', {
  state: (): State => ({
    importantPersons: [],
    groups: ['Family', 'Friends'],
    isSyncingDb: true,
    doingImportFromGoogle: false,
    isImportFromGoogleDone: false,
    totalConnections: null,
  }),
  getters: {
    sortedGroups: state => {
      return state.groups.sort(function (a, b) {
        return a.toLowerCase().localeCompare(b.toLowerCase())
      })
    },
  },
  actions: {
    // ----- SETTERS -----
    setSyncingDb(isSyncingDb: boolean) {
      this.isSyncingDb = isSyncingDb
    },

    setDoingImportFromGoogle(isDoing: boolean) {
      this.doingImportFromGoogle = isDoing
    },
    setImportFromGoogleDone(isDone: boolean) {
      this.isImportFromGoogleDone = isDone
    },
    setTotalConnections(totalConnections: number) {
      this.totalConnections = totalConnections
    },

    // ------------------------- IMPORTANT PERSONS -------------------------

    setAllPersons(allPersons: Person[]) {
      this.importantPersons = allPersons
    },

    addNewImportantPerson(newPerson: Person) {
      this.importantPersons.push(newPerson)
    },

    updatePerson(personId: string, personToUpdate: Person) {
      const personToUpdateIndex = this.importantPersons.findIndex(
        person => person.id === personId
      )
      if (personToUpdateIndex === -1) {
        return
      }
      const person = this.importantPersons[personToUpdateIndex]
      const { name, birthday, groups, parentOne, parentTwo, children } =
        personToUpdate
      const updatedPerson = Object.assign({}, person, {
        name,
        birthday,
        groups,
        ...(parentOne && { parentOne }),
        ...(parentTwo && { parentTwo }),
        ...(children && { children }),
      })
      this.importantPersons[personToUpdateIndex] = updatedPerson
    },

    addGroupToPerson({
      personId,
      groupToAdd,
    }: {
      personId: string
      groupToAdd: string
    }): Person | undefined {
      const personToUpdate = this.importantPersons.find(
        person => person.id === personId
      )
      if (!personToUpdate) {
        return
      }

      personToUpdate.groups = (personToUpdate.groups || []).concat([groupToAdd])

      // const updatedPerson = Object.assign({}, personToUpdate, {
      //   groups: newGroupsList,
      // })
      //
      // let newPersonsList = this.importantPersons.filter(person => {
      //   return person.id !== personId
      // })
      // newPersonsList.push(updatedPerson)
      //
      // this.importantPersons = newPersonsList

      return personToUpdate
    },

    removeGroupFromPerson({
      personId,
      groupToRemove,
    }: {
      personId: string
      groupToRemove: string
    }): Person | undefined {
      const personToUpdate = this.importantPersons.find(
        person => person.id === personId
      )
      if (!personToUpdate) {
        return
      }
      personToUpdate.groups = personToUpdate.groups.filter(
        group => group !== groupToRemove
      )

      return personToUpdate
    },

    deletePerson(personId: string) {
      this.importantPersons = this.importantPersons.filter(person => {
        return person.id !== personId
      })
    },

    removeAllPersons() {
      this.importantPersons = []
    },

    // ------------------------- GROUPS -------------------------

    setAllGroups(allGroups: Group[]) {
      this.groups = allGroups
    },

    addGroup(newGroupLabel: string) {
      const groups = this.groups
      groups.push(newGroupLabel)
      const sortedGroups = groups.sort((groupOne, groupTwo) => {
        return groupOne.toLowerCase().localeCompare(groupTwo.toLowerCase())
      })
      this.groups = sortedGroups
    },

    deleteGroup(groupToDelete: string) {
      // Remove group from all persons having it
      this.importantPersons.forEach(person => {
        if (person.groups && person.groups.includes(groupToDelete)) {
          person.groups = person.groups.filter(group => group !== groupToDelete)
        }
      })

      this.groups.splice(this.groups.indexOf(groupToDelete), 1)
    },

    renameGroup({ oldName, newName }: { oldName: string; newName: string }) {
      const currentGroups = this.groups
      currentGroups.splice(currentGroups.indexOf(oldName), 1)
      currentGroups.push(newName)
      this.groups = currentGroups

      this.importantPersons.forEach(person => {
        if (person.groups && person.groups.includes(oldName)) {
          person.groups = person.groups.map(group => {
            if (group === oldName) {
              return newName
            }
            return group
          })
        }
      })
    },
  },
})
