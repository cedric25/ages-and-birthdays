import mutations from './mutations.js'

const {
  addGroup,
  deleteGroup,
} = mutations

let state

beforeEach(() => {
  state = {
    importantPersons: [],
    groups: ['Family', 'Friends'],
  }
})

describe('addGroup()', () => {
  test('it should add the group to the list', () => {
    expect(state.groups.length).toBe(2)
    addGroup(state, 'Work')
    expect(state.groups.length).toBe(3)
    expect(state.groups).toEqual(['Family', 'Friends', 'Work'])
  })
})

describe('deleteGroup()', () => {
  test('it should delete the group from the list', () => {
    expect(state.groups.length).toBe(2)
    deleteGroup(state, 'Family')
    expect(state.groups.length).toBe(1)
    expect(state.groups).toEqual(['Friends'])
  })

  describe('when 2 persons are associated to this group', () => {
    test('it should remove the group label from these 2 persons and delete the group from the list', () => {
      state.importantPersons = [{
        id: '123',
        name: 'Bob',
        group: 'Friends',
      }, {
        id: '456',
        name: 'Marie',
        group: 'Family',
      }, {
        id: '789',
        name: 'Lucy',
        group: 'Friends',
      }]
      deleteGroup(state, 'Friends')
      expect(state.importantPersons).toEqual([{
        id: '123',
        name: 'Bob',
        group: '',
      }, {
        id: '456',
        name: 'Marie',
        group: 'Family',
      }, {
        id: '789',
        name: 'Lucy',
        group: '',
      }])
    })
  })
})
