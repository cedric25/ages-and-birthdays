// npm t OnePerson-noYear

import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { useAppStore } from '@/store/app/app.store.ts'
import OnePerson from '../OnePerson.vue'

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
    wrapper = mount(OnePerson, {
      shallow: true,
      global: {
        plugins: [createTestingPinia()],
      },
      props: { person },
    })

    const appStore = useAppStore()
    appStore.importantPersons = []
    appStore.groups = ['Family', 'Friends']
  })

  describe('Computed props', () => {
    test(`readableBirthday, should give '25 Feb'`, () => {
      expect(wrapper.vm.readableBirthday).toBe('25 Feb')
    })

    test('ageValue, should give null', () => {
      expect(wrapper.vm.ageValue).toEqual({
        value: null,
        unit: 'y old',
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
