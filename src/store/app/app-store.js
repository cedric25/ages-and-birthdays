import { mutations } from './app-mutations'

export default {
  state: {
    importantPersons: [],
    groups: ['Family', 'Friends'],
    isSyncingDb: false,
    doingImportFromGoogle: false,
    isImportFromGoogleDone: false,
    totalConnections: null,
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
