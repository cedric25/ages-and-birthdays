export function comparePersons(personOne, personTwo, sortingAttribute) {
  const personOneValue = personOne[sortingAttribute]
  const personTwoValue = personTwo[sortingAttribute]
  if (sortingAttribute === 'name') {
    return personOneValue.localeCompare(personTwoValue)
  }
  if (sortingAttribute === 'daysUntilBirthday') {
    return personOneValue - personTwoValue
  }
  if (sortingAttribute === 'age') {
    if (personOneValue.unit === personTwoValue.unit) {
      return personOneValue.value - personTwoValue.value
    }
    if (personOneValue.unit === 'months' && personTwoValue.unit === 'years') {
      return -1
    }
    if (personOneValue.unit === 'years' && personTwoValue.unit === 'months') {
      return 1
    }
    if (personOneValue.unit === '') {
      return 1
    }
    if (personTwoValue.unit === '') {
      return -1
    }
    console.warn(
      `Different and unknown units: '${personOneValue.unit}' and '${personTwoValue.unit}'`
    )
    return personOneValue.value - personTwoValue.value
  }
  return personOne.daysUntilBirthday - personTwo.daysUntilBirthday
}
