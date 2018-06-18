import * as firebase from 'firebase'

export function addImportantPerson(userId, newPerson) {

  // Get a key for a new Person
  const newPersonKey = firebase.database().ref().child(`users/${userId}/importantPersons`).push().key

  firebase.database().ref().update({
    [`users/${userId}/importantPersons/${newPersonKey}`]: newPerson
  }, err => {
    if (err) {
      console.error('Sync newPerson into Firebase', err)
    } else {
      console.log('Sync newPerson into Firebase done!')
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
