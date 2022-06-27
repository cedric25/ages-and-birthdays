// npm t baby.dobAndAge.spec

import { beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import PersonDobAndAge from '../PersonDobAndAge.vue'

describe('PersonDobAndAge component', () => {
  let wrapper: any

  beforeEach(() => {
    wrapper = mount(PersonDobAndAge, {
      props: {
        personId: '234',
        birthday: new Date('2018-02-01'),
        dob: '01/02/2018',
        isYearKnown: true,
        age: {
          value: 4,
          unit: 'months',
        },
        daysUntilBirthday: 240,
        isEditMode: false,
        wrongDateEntered: false,
      },
    })
  })

  describe('ageValue', function () {
    it('should give 4 months old', function () {
      // --- THEN
      expect(wrapper.vm.ageValue).toEqual({
        value: 4,
        unit: ' months old',
      })
    })
  })

  describe('isBirthdayToday', function () {
    it('should say no', function () {
      expect(wrapper.vm.isBirthdayToday).toEqual(false)
    })
  })

  describe('nextAge', function () {
    it('should be 1', function () {
      expect(wrapper.vm.nextAge).toBe(1)
    })
  })

  describe('textBeforeDays', function () {
    it('should give "Will turn in x days"', function () {
      expect(wrapper.vm.textBeforeDays).toEqual('Will turn 1 in')
    })
  })
})
