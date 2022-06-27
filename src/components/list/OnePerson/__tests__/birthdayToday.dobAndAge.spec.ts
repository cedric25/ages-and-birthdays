// npm t birthdayToday.dobAndAge.spec

import dayjs from 'dayjs'
import { beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import PersonDobAndAge from '../PersonDobAndAge.vue'

describe('PersonDobAndAge component - Birthday is today', () => {
  let wrapper: any

  beforeEach(() => {
    wrapper = mount(PersonDobAndAge, {
      props: {
        personId: '345',
        birthday: new Date(),
        dob: dayjs().format('DD/MM/YYYY'),
        isYearKnown: true,
        age: {
          value: 23,
          unit: 'years',
        },
        daysUntilBirthday: 0,
        isEditMode: false,
        wrongDateEntered: false,
      },
    })
  })

  describe('isBirthdayToday', function () {
    it('should say yes!', function () {
      expect(wrapper.vm.isBirthdayToday).toEqual(true)
    })
  })

  describe('textBeforeDays', function () {
    it('should give "Turning x today!"', function () {
      expect(wrapper.vm.textBeforeDays).toEqual('Turning 23 today!')
    })
  })
})

describe('PersonDobAndAge component - Birthday today AND year unknown', () => {
  let wrapper: any

  beforeAll(() => {
    wrapper = mount(PersonDobAndAge, {
      props: {
        personId: '345',
        birthday: new Date(new Date().setFullYear(1900)),
        dob: dayjs().format('DD/MM'),
        isYearKnown: false,
        age: null,
        daysUntilBirthday: 0,
        isEditMode: false,
        wrongDateEntered: false,
      },
    })
  })

  describe('Computed props > textBeforeDays', () => {
    it("should give 'Birthday today!'", () => {
      expect(wrapper.vm.textBeforeDays).toBe('Birthday today!')
    })
  })
})
