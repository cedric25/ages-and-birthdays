// npm t googlePeopleSync.spec

import { vi } from 'vitest'
import parseISO from 'date-fns/parseISO'
import format from 'date-fns/format'
import { setActivePinia, createPinia } from 'pinia'
import { useAppStore } from '@/store/app/app.store.js'
import * as googlePeopleApi from '@/services/googlePeopleApi/googlePeopleApi.functions.js'
import {
  getConnectionsAndAddPersons,
  buildBirthdayFromConnection,
} from '../googlePeopleSync'

describe('getConnectionsAndAddPersons', function () {
  beforeEach(function () {
    setActivePinia(createPinia())
  })

  it('should add one person', async () => {
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
        birthday: parseISO('1990-10-01T00:00:00.000Z'),
        meta: {
          from: 'google',
        },
      },
    ])
  })
})

describe('buildBirthdayFromConnection', () => {
  describe('When only the date object', () => {
    it('should return correct date', () => {
      const peopleBirthday = buildBirthdayFromConnection({
        birthdays: [
          {
            date: { year: 1990, month: 10, day: 1 },
          },
        ],
      })
      expect(format(peopleBirthday, 'dd/MM/yyyy')).toBe('01/10/1990')
    })
  })

  describe('When only the text', () => {
    it('should return correct date', () => {
      const peopleBirthday = buildBirthdayFromConnection({
        birthdays: [
          {
            text: 'January 28th, 1989',
          },
        ],
      })
      expect(format(peopleBirthday, 'dd/MM/yyyy')).toBe('28/01/1989')
    })
  })

  describe('When both date object and text', () => {
    it('should return correct date', () => {
      const peopleBirthday = buildBirthdayFromConnection({
        birthdays: [
          {
            date: { year: 1988, month: 3, day: 29 },
            text: 'March 29, 1988',
          },
        ],
      })
      expect(format(peopleBirthday, 'dd/MM/yyyy')).toBe('29/03/1988')
    })
  })

  describe('When no year', () => {
    it('should return correct date with default year', () => {
      const peopleBirthday = buildBirthdayFromConnection({
        birthdays: [
          {
            date: { month: 10, day: 24 },
            text: 'October 24',
          },
        ],
      })
      expect(format(peopleBirthday, 'dd/MM/yyyy')).toBe('24/10/1900')
    })
  })

  describe('When no year and only text', () => {
    it('should return correct date with default year', () => {
      const peopleBirthday = buildBirthdayFromConnection({
        birthdays: [
          {
            text: 'October 24',
          },
        ],
      })
      expect(format(peopleBirthday, 'dd/MM/yyyy')).toBe('24/10/1900')
    })
  })
})
