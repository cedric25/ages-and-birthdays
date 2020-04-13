// TODO Use Joi?
// TODO Unit test

export function checkUserData(userData) {
  return userData.user &&
    // userData.importantPersons &&
    userData.groups
}
