export default function comparePersons(personOne, personTwo, sortingAttribute) {
  const personOneValue = personOne[sortingAttribute]
  const personTwoValue = personTwo[sortingAttribute]
  if (sortingAttribute === 'name') {
    return personOneValue.localeCompare(personTwoValue)
  }
  if (sortingAttribute === 'age' || sortingAttribute === 'daysUntilBirthday') {
    return personOneValue - personTwoValue
  }
  return personOne.daysUntilBirthday - personTwo.daysUntilBirthday
}
