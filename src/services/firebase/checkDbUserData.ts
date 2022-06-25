export function checkDbUserData(userData: any) {
  if (!userData) {
    return false
  }
  return (
    userData.user &&
    // && userData.importantPersons
    userData.groups
  )
}
