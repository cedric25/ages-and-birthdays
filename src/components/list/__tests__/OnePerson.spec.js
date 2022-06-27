// npm t OnePerson.spec

import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import OnePerson from '../OnePerson.vue'

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
      groups: ['Family'],
    }
    wrapper = mount(OnePerson, {
      global: {
        plugins: [createTestingPinia()],
      },
      props: { person },
    })
  })

  it('should render the first name as a title', () => {
    expect(wrapper.vm.$el.querySelector('h3').textContent.trim()).toBe('Cédric')
  })

  describe('Computed props > ', () => {
    it('should be false', () => {
      expect(wrapper.vm.isBaby).toBe(false)
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
    wrapper = mount(OnePerson, {
      shallow: true,
      global: {
        plugins: [createTestingPinia()],
      },
      props: { person },
    })
  })

  describe('Computed props > isBaby', () => {
    it('should be true', () => {
      expect(wrapper.vm.isBaby).toBe(true)
    })
  })
})
