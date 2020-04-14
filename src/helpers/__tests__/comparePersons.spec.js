// npm t comparePersons.spec

import comparePersons from '../comparePersons'

describe('comparePersons()', () => {

  describe('when comparing names', () => {
    test('should answer -1', () => {
      const result = comparePersons({ name: 'Arthur' }, { name: 'Bob' }, 'name')
      expect(result).toBe(-1)
    })
  })

  describe('when comparing names with accents', () => {
    test('should answer -1', () => {
      const result = comparePersons({ name: 'Cédric' }, { name: 'Christelle' }, 'name')
      expect(result).toBe(-1)
    })
  })

  describe('when comparing days until birthday', () => {
    test('should answer > 0', () => {
      const result = comparePersons(
        { daysUntilBirthday: 295 }, { daysUntilBirthday: 266 }, 'daysUntilBirthday'
      )
      expect(result).toBeGreaterThan(0)
    })
  })

  describe('when comparing ages', () => {
    describe('When both persons are older than 1 year old, and first person is older', () => {
      test('should answer > 0', () => {
        const result = comparePersons(
          { age: { value: 30, unit: 'years' } },
          { age: { value: 28, unit: 'years' } },
          'age'
        )
        expect(result).toBeGreaterThan(0)
      })
    })
    describe('When both persons are older than 1 year old, and same age', () => {
      test('should answer 0', () => {
        const result = comparePersons(
          { age: { value: 15, unit: 'years' } },
          { age: { value: 15, unit: 'years' } },
          'age'
        )
        expect(result).toBe(0)
      })
    })
    describe('When both persons are younger than 1 year old, and same age', () => {
      test('should answer 0', () => {
        const result = comparePersons(
          { age: { value: 3, unit: 'months' } },
          { age: { value: 3, unit: 'months' } },
          'age'
        )
        expect(result).toBe(0)
      })
    })
    describe('When first person is 3 months old and 2nd person is 2y old', () => {
      test('should answer < 0', () => {
        const result = comparePersons(
          { age: { value: 3, unit: 'months' } },
          { age: { value: 2, unit: 'years' } },
          'age'
        )
        expect(result).toBeLessThan(0)
      })
    })
    describe('When first person is 10 years old and 2nd person is 10 months old', () => {
      test('should answer > 0', () => {
        const result = comparePersons(
          { age: { value: 10, unit: 'years' } },
          { age: { value: 10, unit: 'months' } },
          'age'
        )
        expect(result).toBeGreaterThan(0)
      })
    })
    describe('When one unit is unknown', () => {
      test('should simply compare values', () => {
        const result = comparePersons(
          { age: { value: 15, unit: 'oops' } },
          { age: { value: 10, unit: 'months' } },
          'age'
        )
        expect(result).toBeGreaterThan(0)
      })
    })
    describe('When the first person has no unit (year of birth unknown)', () => {
      test('should put the second person first', () => {
        const result = comparePersons(
          { age: { value: null, unit: '' } },
          { age: { value: 10, unit: 'years' } },
          'age'
        )
        expect(result).toBeGreaterThan(0)
      })
    })
    describe('When the second person has no unit (year of birth unknown)', () => {
      test('should put the first person first', () => {
        const result = comparePersons(
          { age: { value: 15, unit: 'years' } },
          { age: { value: null, unit: '' } },
          'age'
        )
        expect(result).toBeLessThan(0)
      })
    })
  })

  describe('when giving an invalid sorting attribute', () => {
    test('should sort by upcoming birthdays by default', () => {
      const result = comparePersons({
        name: 'Cédric',
        age: 30,
        daysUntilBirthday: 295,
      }, {
        name: 'Christelle',
        age: 28,
        daysUntilBirthday: 266,
      }, 'invalidSortingAttribute')
      expect(result).toBeGreaterThan(-1)
    })
  })

})
