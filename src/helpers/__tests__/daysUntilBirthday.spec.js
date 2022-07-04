// npm t daysUntilBirthday.spec

import { daysUntilBirthday } from '@/helpers/daysUntilBirthday.ts'

describe('daysUntilBirthday', function () {
  beforeEach(() => {
    // tell vitest we use mocked time
    vi.useFakeTimers()
  })

  afterEach(() => {
    // restoring date after each test run
    vi.useRealTimers()
  })

  describe('When next birthday is to come THIS year', function () {
    it('should work', function () {
      // --- GIVEN
      vi.setSystemTime(new Date(2022, 6, 1)) // July 1st, 2022
      const dateOfBirth = new Date(1992, 6, 7) // July 7st, 1992

      // --- WHEN
      const diffDays = daysUntilBirthday(dateOfBirth)

      // --- THEN
      expect(diffDays).toBe(6)
    })
  })

  describe('When next birthday is to come NEXT year', function () {
    it('should work', function () {
      // --- GIVEN
      vi.setSystemTime(new Date(2022, 6, 1)) // July 1st, 2022
      const dateOfBirth = new Date(1992, 1, 15) // Feb 15st, 1997

      // --- WHEN
      const diffDays = daysUntilBirthday(dateOfBirth)

      // --- THEN
      expect(diffDays).toBe(229)
    })
  })
})
