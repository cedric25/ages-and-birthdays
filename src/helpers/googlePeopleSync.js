import uuid from 'uuid/v4'
import parse from 'date-fns/parse'
import isValid from 'date-fns/isValid'
import store from '../store'
import { initGoogleClient } from '../services/googlePeopleApi/googlePeopleApi.functions'
import { addNewPerson } from './importantPersons'

export async function askForConsent() {
  // 1. Load the JavaScript client library.
  console.log('1. Load the JavaScript client library.')
  await new Promise((resolve, reject) => {
    window.gapi.load('client:auth2', resolve)
  })

  // 2. Initialize the JavaScript client library.
  console.log('2. Initialize the JavaScript client library.')
  await initGoogleClient()

  // Listen for sign-in state changes.
  window.gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatusCallback)

  // Handle the initial sign-in state.
  const isSignedIn = window.gapi.auth2.getAuthInstance().isSignedIn.get()
  updateSigninStatusCallback(isSignedIn)

  // 3. Show consent popup
  if (!isSignedIn) {
    console.log('3. Show consent popup')
    window.gapi.auth2.getAuthInstance().signIn()
  }

  // 4. Get user answer and go get Google connections
  // (See updateSigninStatusCallback())
}

async function updateSigninStatusCallback(isSignedIn) {
  if (isSignedIn) {
    console.log('4. Consent given, go find connections.')
    await getConnectionsAndAddPersons()
  } else {
    console.log('else...')
  }
}

async function getConnectionsAndAddPersons(pageToken) {
  // Aide pour la requête :
  // https://developers.google.com/people/api/rest/v1/people.connections/list
  let pageResults
  try {
    pageResults = await window.gapi.client.request({
      path: 'https://people.googleapis.com/v1/people/me/connections',
      params: {
        personFields: 'names,birthdays',
        pageSize: 100,
        pageToken: pageToken || undefined,
      },
    })
  } catch (err) {
    console.error('getConnections()', err)
  }
  try {
    addPersonsFromConnections(pageResults)
  } catch (err) {
    console.error('addPersonsFromConnections()', err)
  }

  const nextPageToken = pageResults?.result?.nextPageToken
  if (nextPageToken) {
    // Add fake delay
    setTimeout(() => {
      getConnectionsAndAddPersons(nextPageToken)
    }, 500)
  }
}

function addPersonsFromConnections(googlePeopleResponse) {
  console.log('addPersonsFromConnections...')
  if (!googlePeopleResponse?.result?.connections) {
    throw new Error(`Invalid Google People API answer: ${googlePeopleResponse?.result}`)
  }

  googlePeopleResponse.result.connections
    .filter(connection => !!connection.birthdays && connection.birthdays.length > 0)
    .forEach(connection => {
      try {
        addFromGoogleConnection(connection)
      } catch (err) {
        console.error(err)
      }
    })
}

function addFromGoogleConnection(connection) {
  const displayName = connection.names[0].displayName
  let birthday
  try {
    birthday = buildBirthdayFromConnection(connection)
    addNewPerson(store, {
      id: uuid(),
      name: displayName,
      birthday,
    })
  } catch (err) {
    err.message = `${err.message} for "${displayName}"`
    console.error(err)
  }
}

export function buildBirthdayFromConnection(connection) {
  const { date, text } = connection.birthdays[0]
  if (date) {
    const { year = 1900, month, day } = connection.birthdays[0].date
    return new Date(Date.UTC(year, month - 1, day))
  }
  if (text) {
    const firstTry = parse(text, 'MMMM do, yyyy', new Date(1900, 0, 1))
    if (isValid(firstTry)) {
      return firstTry
    }
    const secondTry = parse(text, 'MMMM d', new Date(1900, 0, 1))
    if (isValid(secondTry)) {
      return secondTry
    }
    throw new Error(`Could not build birthday from text "${text}"`)
  }
}
