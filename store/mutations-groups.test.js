import mutations from './mutations.js'

const {
  addGroup,
} = mutations

let state

beforeEach(() => {
  state = {
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
