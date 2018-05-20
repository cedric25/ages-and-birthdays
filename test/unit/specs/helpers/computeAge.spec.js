import computeAge from '@/helpers/computeAge'

describe('computeAge()', () => {

  describe('when there is only 5 days in between the two dates', () => {
    test('should answer 0', () => {
      const age = computeAge(new Date('2018-05-06'), new Date('2018-05-01'))
      expect(age).toBe(0)
    })
  })

  describe('when there is one year and a half in between the two dates', () => {
    test('should answer 0', () => {
      const age = computeAge(new Date('2018-05-06'), new Date('2016-11-01'))
      expect(age).toBe(1)
    })
  })

  describe('when there is 88 full years in between the two dates', () => {
    test('should answer 0', () => {
      const age = computeAge(new Date('2018-05-06'), new Date('1929-05-10'))
      expect(age).toBe(88)
    })
  })

})
