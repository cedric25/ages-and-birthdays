import mutations from './mutations.js'

const {
  addNewImportantPerson,
  updatePerson,
  deletePerson,
  removeAllPersons,
} = mutations

let state

beforeEach(() => {
  state = {
    importantPersons: [],
  }
})

describe('addNewImportantPerson()', () => {
  test('it should add the person to the list', () => {
    expect(state.importantPersons.length).toBe(0)
    addNewImportantPerson(state, {
      id: '123',
      name: 'Bob',
    })
    expect(state.importantPersons.length).toBe(1)
  })
})

describe('updatePerson()', () => {
  test('it should update the person', () => {
    state.importantPersons = [{
      id: '123',
      name: 'Bob',
    }]
    updatePerson(state, {
      id: '123',
      name: 'Bobby',
    })
    expect(state.importantPersons.length).toBe(1)
    expect(state.importantPersons[0].id).toBe('123')
    expect(state.importantPersons[0].name).toBe('Bobby')
  })
})

describe('deletePerson()', () => {
  describe('When deleting the only person in the list', () => {
    test('it should give an empty list at the end', () => {
      state.importantPersons = [{
        id: '123',
        name: 'Bob',
      }]
      deletePerson(state, {
        id: '123',
      })
      expect(state.importantPersons.length).toBe(0)
    })
  })
  describe('When giving a non-existing person ID', () => {
    test('it should not change the list', () => {
      state.importantPersons = [{
        id: '123',
        name: 'Bob',
      }]
      deletePerson(state, {
        id: '456',
      })
      expect(state.importantPersons.length).toBe(1)
    })
  })
})

describe('removeAllPersons()', () => {
  describe('When there is 2 persons in the list', () => {
    test('it should give an empty list at the end', () => {
      state.importantPersons = [{
        id: '123',
        name: 'Bob',
      }, {
        id: '345',
        name: 'Lucy',
      }]
      expect(state.importantPersons.length).toBe(2)
      removeAllPersons(state)
      expect(state.importantPersons.length).toBe(0)
    })
  })
})
