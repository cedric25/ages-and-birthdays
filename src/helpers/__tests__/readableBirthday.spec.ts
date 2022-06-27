// npm t readableBirthday.spec

import { getReadableBirthday } from '@/helpers/readableBirthday'

describe('getReadableBirthday', function () {
  describe("when giving date of '2018-02-01'", function () {
    it('should answer a more human readable format', function () {
      // --- WHEN
      const readableBirthday = getReadableBirthday(new Date('2018-02-01'))

      // --- THEN
      expect(readableBirthday).toBe('1 Feb 2018')
    })
  })

  describe("when giving date of '1988-12-25'", function () {
    it('should answer a more human readable format', function () {
      // --- WHEN
      const readableBirthday = getReadableBirthday(new Date('1988-12-25'))

      // --- THEN
      expect(readableBirthday).toBe('25 Dec 1988')
    })
  })
})
