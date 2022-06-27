// npm t mutations-importantPersons

import { createPinia, setActivePinia } from 'pinia'
import { useAppStore } from '@/store/app/app.store.ts'

beforeEach(function () {
  setActivePinia(createPinia())

  const appStore = useAppStore()
  appStore.importantPersons = []
})

describe('addNewImportantPerson()', () => {
  test('it should add the person to the list', () => {
    const appStore = useAppStore()
    expect(appStore.importantPersons.length).toBe(0)
    appStore.addNewImportantPerson({
      id: '123',
      name: 'Bob',
    })
    expect(appStore.importantPersons.length).toBe(1)
  })
})

describe('updatePerson()', () => {
  test('it should update the person', () => {
    const appStore = useAppStore()
    appStore.importantPersons = [
      {
        id: '123',
        name: 'Bob',
      },
    ]
    appStore.updatePerson('123', {
      name: 'Bobby',
    })
    expect(appStore.importantPersons.length).toBe(1)
    expect(appStore.importantPersons[0].id).toBe('123')
    expect(appStore.importantPersons[0].name).toBe('Bobby')
  })
})

describe('addGroupToPerson()', () => {
  describe("When adding the 'Family' group to the person", () => {
    test('it should, well, add it to its list of groups', () => {
      const appStore = useAppStore()
      appStore.importantPersons = [
        {
          id: '123',
          name: 'Bob',
          groups: [],
        },
      ]
      appStore.addGroupToPerson({
        personId: '123',
        groupToAdd: 'Family',
      })
      expect(appStore.importantPersons).toEqual([
        {
          id: '123',
          name: 'Bob',
          groups: ['Family'],
        },
      ])
    })
  })
})

describe('removeGroupFromPerson()', () => {
  describe("When removing the 'Family' group from the person", () => {
    test('it should, well, remove it from its list of groups', () => {
      const appStore = useAppStore()
      appStore.importantPersons = [
        {
          id: '123',
          name: 'Bob',
          groups: ['Friends', 'Family'],
        },
      ]
      appStore.removeGroupFromPerson({
        personId: '123',
        groupToRemove: 'Family',
      })
      expect(appStore.importantPersons).toEqual([
        {
          id: '123',
          name: 'Bob',
          groups: ['Friends'],
        },
      ])
    })
  })
})

describe('deletePerson()', () => {
  describe('When deleting the only person in the list', () => {
    test('it should give an empty list at the end', () => {
      const appStore = useAppStore()
      appStore.importantPersons = [
        {
          id: '123',
          name: 'Bob',
        },
      ]
      appStore.deletePerson('123')
      expect(appStore.importantPersons.length).toBe(0)
    })
  })
  describe('When giving a non-existing person ID', () => {
    test('it should not change the list', () => {
      const appStore = useAppStore()
      appStore.importantPersons = [
        {
          id: '123',
          name: 'Bob',
        },
      ]
      appStore.deletePerson({
        id: '456',
      })
      expect(appStore.importantPersons.length).toBe(1)
    })
  })
})

describe('removeAllPersons()', () => {
  describe('When there is 2 persons in the list', () => {
    test('it should give an empty list at the end', () => {
      const appStore = useAppStore()
      appStore.importantPersons = [
        {
          id: '123',
          name: 'Bob',
        },
        {
          id: '345',
          name: 'Lucy',
        },
      ]
      expect(appStore.importantPersons.length).toBe(2)
      appStore.removeAllPersons()
      expect(appStore.importantPersons.length).toBe(0)
    })
  })
})
