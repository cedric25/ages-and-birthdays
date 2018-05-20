import comparePersons from '@/helpers/comparePersons'

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
    test('should answer -1', () => {
      const result = comparePersons(
        { daysUntilBirthday: 295 }, { daysUntilBirthday: 266 }, 'daysUntilBirthday'
      )
      expect(result).toBeGreaterThan(0)
    })
  })

  describe('when comparing ages', () => {
    test('should answer -1', () => {
      const result = comparePersons({ age: 30 }, { age: 28 }, 'age')
      expect(result).toBeGreaterThan(0)
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
