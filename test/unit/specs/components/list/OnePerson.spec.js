// Run it with:
// npm t -- OnePerson.spec.js

import Vue from 'vue'
import Vuex from 'vuex'
import { shallowMount } from '@vue/test-utils'
import OnePerson from '@/components/list/OnePerson.vue'

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
      birthday: new Date('1988-02-25'),
      age: {
        value: 30,
        unit: 'years',
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

  test('should render the first name as a title', () => {
    expect(wrapper.vm.$el.querySelector('h3').textContent.trim()).toBe('Cédric')
  })

  describe('Computed props', () => {

    test('hasGroups, should be true', () => {
      expect(wrapper.vm.hasGroups).toBe(true)
    })

    test(`readableBirthday, should give '25 Feb 1988'`, () => {
      expect(wrapper.vm.readableBirthday).toBe('25 Feb 1988')
    })

    test(`otherGroups, should give ['Friends']`, () => {
      expect(wrapper.vm.otherGroups).toEqual(['Friends'])
    })

    test('isBaby, should be false', () => {
      expect(wrapper.vm.isBaby).toBe(false)
    })

    test('ageValue, should give 30y', () => {
      expect(wrapper.vm.ageValue).toEqual({
        value: 30,
        unit: 'y'
      })
    })

    test('nextAge, should give 31', () => {
      expect(wrapper.vm.nextAge).toBe(31)
    })

    test('isYearKnown, should be true', () => {
      expect(wrapper.vm.isYearKnown).toBe(true)
    })

    test('isBirthdayToday, should be false', () => {
      expect(wrapper.vm.isBirthdayToday).toBe(false)
    })

    test(`textBeforeDays, should give 'Will turn 31 in'`, () => {
      expect(wrapper.vm.textBeforeDays).toBe('Will turn 31 in')
    })

  })

  describe('Methods', () => {
    test(`isInGroup() of 'Family' should be true`, () => {
      expect(wrapper.vm.isInGroup('Family')).toBe(true)
    })
    test(`isInGroup() of 'Friends' should be false`, () => {
      expect(wrapper.vm.isInGroup('Friends')).toBe(false)
    })
  })

})

describe('OnePerson component - Less than 1y old', () => {

  let person
  let wrapper

  beforeAll(() => {
    person = {
      id: '234',
      name: 'Tommy',
      birthday: new Date('2018-02-01'),
      age: {
        value: 4,
        unit: 'months',
      },
      daysUntilBirthday: 240,
      personGroups: ['Friends'],
    }
    wrapper = shallowMount(OnePerson, {
      propsData: { ...person },
    })
  })

  describe('Computed props', () => {

    test('isBaby, should be true', () => {
      expect(wrapper.vm.isBaby).toBe(true)
    })

    test('ageValue, should give 4 months', () => {
      expect(wrapper.vm.ageValue).toEqual({
        value: 4,
        unit: '&nbsp;months'
      })
    })

    test('nextAge, should give 1', () => {
      expect(wrapper.vm.nextAge).toBe(1)
    })

  })

})

describe('OnePerson component - Birthday is today', () => {

  let person
  let wrapper

  beforeAll(() => {
    person = {
      id: '345',
      name: 'Xavier',
      birthday: new Date(),
      age: {
        value: 30,
        unit: 'years',
      },
      daysUntilBirthday: 0,
    }
    wrapper = shallowMount(OnePerson, {
      propsData: { ...person },
    })
  })

  describe('Computed props', () => {

    test(`textBeforeDays, should give 'Turning 30 today!'`, () => {
      expect(wrapper.vm.textBeforeDays).toBe('Turning 30 today!')
    })

  })

})

describe('OnePerson component - Year unknown', () => {

  let person
  let wrapper

  beforeAll(() => {
    person = {
      id: '345',
      name: 'Leila',
      birthday: new Date('1900-03-21'),
      age: {
        value: null,
        unit: '',
      },
      daysUntilBirthday: 32,
    }
    wrapper = shallowMount(OnePerson, {
      propsData: { ...person },
    })
  })

  describe('Computed props', () => {

    test(`readableBirthday, should give '21 March'`, () => {
      expect(wrapper.vm.readableBirthday).toBe('21 Mar')
    })

    test(`textBeforeDays, should give 'Birthday in'`, () => {
      expect(wrapper.vm.textBeforeDays).toBe('Birthday in')
    })

  })

})

describe('OnePerson component - Birthday today AND year unknown', () => {

  let person
  let wrapper

  beforeAll(() => {
    person = {
      id: '345',
      name: 'Lauria',
      birthday: new Date(new Date().setFullYear(1900)),
      age: {
        value: null,
        unit: '',
      },
      daysUntilBirthday: 0,
    }
    wrapper = shallowMount(OnePerson, {
      propsData: { ...person },
    })
  })

  describe('Computed props', () => {

    test(`textBeforeDays, should give 'Birthday in'`, () => {
      expect(wrapper.vm.textBeforeDays).toBe('Birthday today!')
    })

  })

})
