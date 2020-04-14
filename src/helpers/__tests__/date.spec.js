// npm t date.spec

import { containsYear } from '../date'

describe('containsYear()', () => {

  describe('when giving 01/01/2000', () => {
    test('should answer true', () => {
      const result = containsYear('01/01/2000')
      expect(result).toBe(true)
    })
  })

  describe('when giving 31/12', () => {
    test('should answer false', () => {
      const result = containsYear('31/12')
      expect(result).toBe(false)
    })
  })

  describe('when giving 1/1', () => {
    test('should not crash and answer false', () => {
      const result = containsYear('1/1')
      expect(result).toBe(false)
    })
  })

})
