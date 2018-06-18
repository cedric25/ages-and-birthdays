import * as firebase from 'firebase'

export function setImportantPersons(userId, importantPersons) {
  firebase.database().ref().update({
    [`users/${userId}/importantPersons`]: importantPersons
  }, err => {
    if (err) {
      console.error('Sync importantPersons into Firebase', err)
    } else {
      console.log('Sync importantPersons into Firebase done!')
    }
  })
}

export function setGroups(userId, groups) {
  firebase.database().ref().update({
    [`users/${userId}/groups`]: groups
  }, err => {
    if (err) {
      console.error('Sync groups into Firebase', err)
    } else {
      console.log('Sync groups into Firebase done!')
    }
  })
}
