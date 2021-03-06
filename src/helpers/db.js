import firebase from 'firebase/app'
import 'firebase/database'

export function setImportantPersons(userId, importantPersons) {
  return firebase
    .database()
    .ref()
    .update({
      [`users/${userId}/importantPersons`]: importantPersons,
    })
}

export function setGroups(userId, groups) {
  return firebase
    .database()
    .ref()
    .update({
      [`users/${userId}/groups`]: groups,
    })
}

export function readUserDataOnce(userId) {
  return firebase.database().ref(`users/${userId}`).once('value')
}

export function setUserData(userId, { user, importantPersons, groups }) {
  const userUpdates = {}
  userUpdates[`/users/${userId}/user`] = user
  userUpdates[`/users/${userId}/importantPersons`] = importantPersons
  userUpdates[`/users/${userId}/groups`] = groups
  return firebase.database().ref().update(userUpdates)
}

export function getImportantPersonsRef(userId) {
  return firebase.database().ref(`users/${userId}/importantPersons`)
}

export function getGroupsRef(userId) {
  return firebase.database().ref(`users/${userId}/groups`)
}
