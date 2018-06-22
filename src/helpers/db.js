import * as firebase from 'firebase'

export function setImportantPersons(userId, importantPersons) {
  return firebase.database().ref().update({
    [`users/${userId}/importantPersons`]: importantPersons
  })
}

export function setGroups(userId, groups) {
  return firebase.database().ref().update({
    [`users/${userId}/groups`]: groups
  })
}
