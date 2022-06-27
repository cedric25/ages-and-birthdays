// npm t adult.dobAndAge.spec

import { beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import PersonDobAndAge from '../PersonDobAndAge.vue'

describe('PersonDobAndAge component', () => {
  let wrapper: any

  beforeEach(() => {
    wrapper = mount(PersonDobAndAge, {
      props: {
        personId: '123',
        birthday: new Date('1988-12-25'),
        dob: '25/12/1988',
        isYearKnown: true,
        age: {
          value: 30,
          unit: 'years',
        },
        daysUntilBirthday: 295,
        isEditMode: false,
        wrongDateEntered: false,
      },
    })
  })

  describe('ageValue', function () {
    it('should give 31y old', function () {
      // --- THEN
      expect(wrapper.vm.ageValue).toEqual({
        value: 30,
        unit: 'y old',
      })
    })
  })

  describe('isBirthdayToday', function () {
    it('should say no', function () {
      expect(wrapper.vm.isBirthdayToday).toEqual(false)
    })
  })

  describe('nextAge', function () {
    it('should be 31', function () {
      expect(wrapper.vm.nextAge).toBe(31)
    })
  })

  describe('textBeforeDays', function () {
    it('should give "Will turn x in"', function () {
      expect(wrapper.vm.textBeforeDays).toEqual('Will turn 31 in')
    })
  })
})
