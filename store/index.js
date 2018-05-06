import Vuex from 'vuex'

import mutations from './mutations'

/**
 * Example of 'importantPersons':
 * [
 *   {
 *     id: '9e30969d-458f-4d29-8bb0-56fbe4d6d39d',
 *     name: 'Cedric',
 *     ...
 *   }, {
 *     ...
 *   }
 * ]
 */

const createStore = () => {
  return new Vuex.Store({
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
  })
}

export default createStore
