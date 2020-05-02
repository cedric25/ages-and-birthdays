import uuid from 'uuid/v4'
import parse from 'date-fns/parse'
import isValid from 'date-fns/isValid'
import store from '../store'
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
  window.gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus)

  // Handle the initial sign-in state.
  const isSignedIn = window.gapi.auth2.getAuthInstance().isSignedIn.get()
  updateSigninStatus(isSignedIn)

  // 3. Show consent popup
  if (!isSignedIn) {
    console.log('3. Show consent popup')
    window.gapi.auth2.getAuthInstance().signIn()
  }

  // 4. Get user answer and go get Google connections
  // (See updateSigninStatus())
}

function initGoogleClient() {
  return window.gapi.client.init({
    // Note: when you authorize your application using Oauth 2.0, you do not also need to set the API key as in the first example. However, it is a good practice to do so, in case your code ever expands to handle unauthorized requests.
    // 'apiKey': 'AIzaSyCyhBHHmtRypmBwh_Af13Jt3GVw1FRpk1M',
    // Your API key will be automatically added to the Discovery Document URLs.
    discoveryDocs: ['https://people.googleapis.com/$discovery/rest'],
    // clientId and scope are optional if auth is not required.
    clientId: '302369470244-g8vmssum3j1e0tuc9pll5dq7iu2vp3e7.apps.googleusercontent.com',
    // 'scope': 'profile',
    // Scopes à demander : https://developers.google.com/identity/protocols/oauth2/scopes#people
    scope: 'https://www.googleapis.com/auth/contacts.readonly',
  })
}

async function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    console.log('4. Consent given, go find connections.')
    let googlePeopleResponse
    try {
      googlePeopleResponse = await getConnections()
    } catch (err) {
      console.error('getConnections()', err)
    }
    try {
      addPersonsFromConnections(googlePeopleResponse)
    } catch (err) {
      console.error('addPersonsFromConnections()', err)
    }
  } else {
    console.log('else...')
  }
}

function getConnections() {
  // Aide pour la requête :
  // https://developers.google.com/people/api/rest/v1/people.connections/list
  return window.gapi.client.request({
    path: 'https://people.googleapis.com/v1/people/me/connections',
    params: {
      personFields: 'names,birthdays',
      // pageSize: 25,
    },
  })
}

function addPersonsFromConnections(googlePeopleResponse) {
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
  const birthday = buildBirthdayFromConnection(connection)
  addNewPerson(store, {
    id: uuid(),
    name: displayName,
    birthday,
  })
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
