// npm t computeAge.spec

import { computeAge } from '../computeAge'

describe('computeAge()', () => {
  describe('when there is only 5 days in between the two dates', () => {
    test('should answer 0 and unit = months', () => {
      const age = computeAge(new Date('2018-05-06'), new Date('2018-05-01'))
      expect(age).toEqual({
        value: 0,
        unit: 'months',
      })
    })
  })

  describe('when there is one year and a half in between the two dates', () => {
    test('should answer 1 and unit = years', () => {
      const age = computeAge(new Date('2018-05-06'), new Date('2016-11-01'))
      expect(age).toEqual({
        value: 1,
        unit: 'years',
      })
    })
  })

  describe('when there is 88 full years in between the two dates', () => {
    test('should answer 88 and unit = years', () => {
      const age = computeAge(new Date('2018-05-06'), new Date('1929-05-10'))
      expect(age).toEqual({
        value: 88,
        unit: 'years',
      })
    })
  })

  describe('when year is 1900', () => {
    test('should answer null', () => {
      const age = computeAge(new Date('2018-05-06'), new Date('1900-02-15'))
      expect(age).toEqual({
        value: null,
        unit: '',
      })
    })
  })
})
