import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import mutations from './mutations'

Vue.use(Vuex)

const plugins = []
if (process.env.NODE_ENV !== 'test') {
  plugins.push(createPersistedState())
}

export default new Vuex.Store({
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
      return state.groups
    },
  },
  plugins,
})
