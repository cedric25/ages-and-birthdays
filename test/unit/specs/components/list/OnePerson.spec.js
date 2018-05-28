// Run it with:
// npx jest --config test/unit/jest.conf.js test/unit/specs/components/list/OnePerson.spec.js

import Vue from 'vue'
import Vuex from 'vuex'
import { shallowMount } from '@vue/test-utils'
import OnePerson from '@/components/list/OnePerson.vue'

Vue.use(Vuex)

describe('OnePerson component', () => {

  test('renders props.msg when passed', () => {
    const person = {
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
    const wrapper = shallowMount(OnePerson, {
      propsData: { ...person },
      store: new Vuex.Store({
        state: {
          importantPersons: [],
          groups: ['Family', 'Friends'],
        }
      }),
    })

    expect(wrapper.vm.$el.querySelector('h3').textContent.trim()).toBe('Cédric')
  })

})
