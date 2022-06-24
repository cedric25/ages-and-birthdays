const prefix = 'ages-and-birthdays'
const importantPersonsKey = `${prefix}/importantPersons`
const groupsKey = `${prefix}/groups`
const listOrderKey = `${prefix}/listOrder`

export function getPersons() {
  return window.localStorage.getItem(importantPersonsKey)
}

export function setPersons(persons) {
  window.localStorage.setItem(importantPersonsKey, JSON.stringify(persons))
}

export function getGroups() {
  return window.localStorage.getItem(groupsKey)
}

export function setGroups(groups) {
  window.localStorage.setItem(groupsKey, JSON.stringify(groups))
}

export function getListOrder() {
  return window.localStorage.getItem(listOrderKey)
}

export function saveListOrder(listOrder) {
  return window.localStorage.setItem(listOrderKey, listOrder)
}
