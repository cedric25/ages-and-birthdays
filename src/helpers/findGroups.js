export function findGroups(persons) {
  const groups = persons.map(person => person.groups)
  const flatGroups = [].concat.apply([], groups)
  const groupsNoDuplicates = Array.from(new Set(flatGroups))
  return groupsNoDuplicates
}
