// npm t googlePeopleSync.spec

import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useAppStore } from '@/store/app/app.store.ts'
import * as googlePeopleApi from '@/services/googlePeopleApi/googlePeopleApi.functions.js'
import {
  getConnectionsAndAddPersons,
  buildBirthdayFromConnection,
} from '../googlePeopleSync'

dayjs.extend(customParseFormat)

describe('getConnectionsAndAddPersons', function () {
  beforeEach(function () {
    setActivePinia(createPinia())
  })

  it('should add one person', async function () {
    const appStore = useAppStore()
    expect(appStore.importantPersons).toEqual([])
    vi.spyOn(
      googlePeopleApi,
      'getConnectionNamesAndBirthdays'
    ).mockResolvedValue({
      result: {
        connections: [
          {
            names: [
              {
                displayName: 'Tommy',
              },
            ],
            birthdays: [
              {
                date: { year: 1990, month: 10, day: 1 },
              },
            ],
          },
        ],
      },
    })
    await getConnectionsAndAddPersons()
    expect(appStore.importantPersons).toMatchObject([
      {
        id: expect.any(String),
        name: 'Tommy',
        birthday: dayjs('1990-10-01T00:00:00.000Z').toDate(),
        meta: {
          from: 'google',
        },
      },
    ])
  })
})

describe('buildBirthdayFromConnection', function () {
  describe('When only the date object', function () {
    it('should return correct date', function () {
      const peopleBirthday = buildBirthdayFromConnection({
        birthdays: [
          {
            date: { year: 1990, month: 10, day: 1 },
          },
        ],
      })
      expect(dayjs(peopleBirthday).format('DD/MM/YYYY')).toBe('01/10/1990')
    })
  })

  describe('When only the text', function () {
    it('should return correct date', function () {
      const peopleBirthday = buildBirthdayFromConnection({
        birthdays: [
          {
            text: 'January 28th, 1989',
          },
        ],
      })
      expect(dayjs(peopleBirthday).format('DD/MM/YYYY')).toBe('28/01/1989')
    })
  })

  describe('When both date object and text', function () {
    it('should return correct date', function () {
      const peopleBirthday = buildBirthdayFromConnection({
        birthdays: [
          {
            date: { year: 1988, month: 3, day: 29 },
            text: 'March 29, 1988',
          },
        ],
      })
      expect(dayjs(peopleBirthday).format('DD/MM/YYYY')).toBe('29/03/1988')
    })
  })

  describe('When no year', function () {
    it('should return correct date with default year', function () {
      const peopleBirthday = buildBirthdayFromConnection({
        birthdays: [
          {
            date: { month: 10, day: 24 },
            text: 'October 24',
          },
        ],
      })
      expect(dayjs(peopleBirthday).format('DD/MM/YYYY')).toBe('24/10/1900')
    })
  })

  describe('When no year and only text', function () {
    it('should return correct date with default year', function () {
      const peopleBirthday = buildBirthdayFromConnection({
        birthdays: [
          {
            text: 'October 24',
          },
        ],
      })
      expect(dayjs(peopleBirthday).format('DD/MM/YYYY')).toBe('24/10/1900')
    })
  })
})
