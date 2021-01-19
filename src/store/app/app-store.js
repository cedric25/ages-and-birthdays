import { mutations } from './app-mutations.js'

export default {
  state: {
    importantPersons: [],
    groups: ['Family', 'Friends'],
    isSyncingDb: false,
  },
  mutations,
  getters: {
    importantPersons(state) {
      return state.importantPersons
    },
    groups(state) {
      return state.groups.sort()
    },
    isSyncingDb(state) {
      return state.isSyncingDb
    },
  },
}
