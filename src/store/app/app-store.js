import mutations from './app-mutations'

export default {
  state: {
    importantPersons: [],
    groups: ['Family', 'Friends'],
  },
  mutations,
  getters: {
    importantPersons(state) {
      return state.importantPersons
    },
    groups(state) {
      return state.groups.sort()
    },
  },
}
