// npm t OnePerson-noYear

import Vue from 'vue'
import Vuex from 'vuex'
import { shallowMount } from '@vue/test-utils'
import OnePerson from '../OnePerson.vue'

Vue.config.ignoredElements = [
  /^v-/
]

Vue.use(Vuex)

Vue.directive('click-outside', jest.fn())

describe('OnePerson component', () => {

  let person
  let wrapper

  beforeAll(() => {
    person = {
      id: '123',
      name: 'Cédric',
      birthday: new Date('1900-02-25'),
      age: {
        value: null,
        unit: '',
      },
      daysUntilBirthday: 295,
      personGroups: ['Family'],
    }
    wrapper = shallowMount(OnePerson, {
      propsData: { ...person },
      store: new Vuex.Store({
        state: {
          importantPersons: [],
          groups: ['Family', 'Friends'],
        },
        getters: {
          groups(state) {
            return state.groups.sort()
          },
        },
      }),
    })
  })

  describe('Computed props', () => {

    test(`readableBirthday, should give '25 Feb'`, () => {
      expect(wrapper.vm.readableBirthday).toBe('25 Feb')
    })

    test('ageValue, should give null', () => {
      expect(wrapper.vm.ageValue).toEqual({
        value: null,
        unit: 'y'
      })
    })

    test('nextAge, should give null', () => {
      expect(wrapper.vm.nextAge).toBe(1)
    })

    test('isYearKnown, should be false', () => {
      expect(wrapper.vm.isYearKnown).toBe(false)
    })

    test(`textBeforeDays, should give 'Birthday in'`, () => {
      expect(wrapper.vm.textBeforeDays).toBe('Birthday in')
    })

  })

})
