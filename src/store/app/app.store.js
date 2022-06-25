import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    importantPersons: [],
    groups: ['Family', 'Friends'],
    isSyncingDb: false,
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
    setSyncingDb(isSyncingDb) {
      this.isSyncingDb = isSyncingDb
    },

    setDoingImportFromGoogle(isDoing) {
      this.doingImportFromGoogle = isDoing
    },
    setImportFromGoogleDone(isDone) {
      this.isImportFromGoogleDone = isDone
    },
    setTotalConnections(totalConnections) {
      this.totalConnections = totalConnections
    },

    // ------------------------- IMPORTANT PERSONS -------------------------

    setAllPersons(allPersons) {
      this.importantPersons = allPersons
    },

    addNewImportantPerson(newPerson) {
      this.importantPersons.push(newPerson)
    },

    updatePerson(newInfo) {
      this.importantPersons.forEach((person, index) => {
        if (person.id === newInfo.id) {
          const updatedPerson = Object.assign(
            {},
            person,
            { name: newInfo.name },
            { birthday: newInfo.birthday }
          )
          this.importantPersons[index] = updatedPerson
        }
      })
    },

    addGroupToPerson({ personId, groupToAdd }) {
      const personToUpdate = this.importantPersons.find(
        person => person.id === personId
      )

      let newGroupsList = (personToUpdate.groups || []).concat([groupToAdd])

      const updatedPerson = Object.assign({}, personToUpdate, {
        groups: newGroupsList,
      })

      let newPersonsList = this.importantPersons.filter(person => {
        return person.id !== personId
      })
      newPersonsList.push(updatedPerson)

      this.importantPersons = newPersonsList
    },

    removeGroupFromPerson({ personId, groupToRemove }) {
      const personToUpdate = this.importantPersons.find(
        person => person.id === personId
      )
      personToUpdate.groups = personToUpdate.groups.filter(
        group => group !== groupToRemove
      )
    },

    deletePerson(personId) {
      this.importantPersons = this.importantPersons.filter(person => {
        return person.id !== personId
      })
    },

    removeAllPersons() {
      this.importantPersons = []
    },

    // ------------------------- GROUPS -------------------------

    setAllGroups(allGroups) {
      this.groups = allGroups
    },

    addGroup(newGroupLabel) {
      const groups = this.groups
      groups.push(newGroupLabel)
      const sortedGroups = groups.sort((groupOne, groupTwo) => {
        return groupOne.toLowerCase().localeCompare(groupTwo.toLowerCase())
      })
      this.groups = sortedGroups
    },

    deleteGroup(groupToDelete) {
      // Remove group from all persons having it
      this.importantPersons.forEach(person => {
        if (person.groups && person.groups.includes(groupToDelete)) {
          person.groups = person.groups.filter(group => group !== groupToDelete)
        }
      })

      this.groups.splice(this.groups.indexOf(groupToDelete), 1)
    },

    renameGroup({ oldName, newName }) {
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
