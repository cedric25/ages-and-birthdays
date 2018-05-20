import Vue from 'vue'
import Vuex from 'vuex'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import ImportantPersons from '@/components/list/ImportantPersons.vue'

// Try here to test a Vue component method, see how feasible it is instead of pulling out
// the function I want to test to another "non-vue" file
// --> Not easy!
// Use store, mock it with all attributes, whole component gets mounted... Not necessary here!
// And still a warning in the console about unknown Vuetify components
// Also needed 'stage-2 in .babelrc, otherwise ...mapGetters([...]) was making it fail

Vue.use(Vuex)

describe('ImportantPersons component', () => {

  describe('nbPersonsWithinGroup()', () => {
    test('nbPersonsWithinGroup()', () => {

      const localVue = createLocalVue()

      const store = new Vuex.Store({
        state: {
          importantPersons: [{
            id: '123',
            name: 'Franck',
            birthday: new Date('2000-05-01'),
            groups: ['Friends'],
          }, {
            id: '456',
            name: 'Sophie',
            birthday: new Date('1998-03-15'),
            groups: ['Friends']
          }],
          groups: ['Friends']
        },
        getters: {
          importantPersons(state) {
            return state.importantPersons
          },
          groups(state) {
            return state.groups
          },
        }
      })

      const wrapper = shallowMount(ImportantPersons, {
        localVue,
        store,
      })

      const nbPersons = wrapper.vm.nbPersonsWithinGroup('Friends')

      expect(nbPersons).toBe(2)
    })
  })

})
