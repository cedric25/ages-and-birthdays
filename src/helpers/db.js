import { getDatabase, ref, child, get, set } from 'firebase/database'

export function setImportantPersons(userId, importantPersons) {
  const db = getDatabase()
  return set(ref(db, `users/${userId}/importantPersons`), importantPersons)
}

export function setGroups(userId, groups) {
  const db = getDatabase()
  return set(ref(db, `users/${userId}/groups`), groups)
}

export function readUserDataOnce(userId) {
  const dbRef = ref(getDatabase())
  return get(child(dbRef, `users/${userId}`))
}

export function setUserData(userId, { user, importantPersons, groups }) {
  const db = getDatabase()
  return set(ref(db, `users/${userId}`), {
    user,
    importantPersons,
    groups,
  })
}

export function getImportantPersonsRef(userId) {
  const db = getDatabase()
  return ref(db, `users/${userId}/importantPersons`)
}

export function getGroupsRef(userId) {
  const db = getDatabase()
  return ref(db, `users/${userId}/groups`)
}
