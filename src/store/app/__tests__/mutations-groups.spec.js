// npm t mutations-groups

import { createPinia, setActivePinia } from 'pinia'
import { useAppStore } from '@/store/app/app.store.js'
import { addGroup, deleteGroup } from '@/helpers/groups.js'

beforeEach(function () {
  setActivePinia(createPinia())

  const appStore = useAppStore()
  appStore.importantPersons = []
  appStore.groups = ['Family', 'Friends']
})

describe('addGroup()', function () {
  test('it should add the group to the list', function () {
    const appStore = useAppStore()
    expect(appStore.groups.length).toBe(2)
    addGroup('Work')
    expect(appStore.groups.length).toBe(3)
    expect(appStore.groups).toEqual(['Family', 'Friends', 'Work'])
  })
})

describe('deleteGroup()', function () {
  test('it should delete the group from the list', function () {
    const appStore = useAppStore()
    expect(appStore.groups.length).toBe(2)
    deleteGroup('Family')
    expect(appStore.groups.length).toBe(1)
    expect(appStore.groups).toEqual(['Friends'])
  })

  describe('when 2 persons are associated to this group', function () {
    test('it should remove the group label from these 2 persons and delete the group from the list', function () {
      const appStore = useAppStore()
      appStore.importantPersons = [
        {
          id: '123',
          name: 'Bob',
          groups: ['Friends'],
        },
        {
          id: '456',
          name: 'Marie',
          groups: ['Family'],
        },
        {
          id: '789',
          name: 'Lucy',
          groups: ['Friends'],
        },
      ]
      deleteGroup('Friends')
      expect(appStore.importantPersons).toEqual([
        {
          id: '123',
          name: 'Bob',
          groups: [],
        },
        {
          id: '456',
          name: 'Marie',
          groups: ['Family'],
        },
        {
          id: '789',
          name: 'Lucy',
          groups: [],
        },
      ])
    })
  })
})
