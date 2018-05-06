import Vue from 'vue'
import Vuex from 'vuex'
import { shallow } from '@vue/test-utils'
import ImportantPersons from './ImportantPersons.vue'

// Try here to test a Vue component method, see how feasible it is instead of pulling out
// the function I want to test to another "non-vue" file
// --> Not easy!
// Use store, mock it with all attributes, whole component gets mounted... Not necessary here!

Vue.use(Vuex)

import createStore from '../../store/index'

describe('ImportantPersons component', () => {

  describe('nbPersonsWithinGroup()', () => {
    test('nbPersonsWithinGroup()', () => {

      const wrapper = shallow(ImportantPersons, {
        store: createStore(),
      })

      wrapper.vm.$store.state.importantPersons = [{
        id: '123',
        name: 'Franck',
        birthday: new Date('2000-05-01'),
        group: 'Friends',
      }, {
        id: '456',
        name: 'Sophie',
        birthday: new Date('1998-03-15'),
        group: 'Friends'
      }]

      const nbPersons = wrapper.vm.nbPersonsWithinGroup('Friends')

      expect(nbPersons).toBe(2)
    })
  })

})
