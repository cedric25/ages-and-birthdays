// npm t findGroups.spec

import { findGroups } from '../findGroups'

describe('findGroups()', () => {
  describe('when there is only one person with one group', () => {
    it('should answer with this group', () => {
      const persons = [
        {
          name: 'Eric',
          groups: ['Friends'],
        },
      ]
      const groups = findGroups(persons)
      expect(groups).toEqual(['Friends'])
    })
  })

  describe('when there is 2 persons having the same group', () => {
    it('should answer with this group, and no duplicate', () => {
      const persons = [
        {
          name: 'Eric',
          groups: ['Friends'],
        },
        {
          name: 'François',
          groups: ['Friends'],
        },
      ]
      const groups = findGroups(persons)
      expect(groups).toEqual(['Friends'])
    })
  })

  describe('when there is 3 persons with multiple groups and some in common', () => {
    it('should answer with the correct list of groups', () => {
      const persons = [
        {
          name: 'Eric',
          groups: ['Friends', 'Spain'],
        },
        {
          name: 'François',
          groups: ['Friends', 'University', 'Uni second year'],
        },
        {
          name: 'Tim',
          groups: ['Family', 'Babies'],
        },
      ]
      const groups = findGroups(persons)
      expect(groups).toEqual([
        'Friends',
        'Spain',
        'University',
        'Uni second year',
        'Family',
        'Babies',
      ])
    })
  })
})
