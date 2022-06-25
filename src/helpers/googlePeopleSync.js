import { nanoid } from 'nanoid'
import parse from 'date-fns/parse'
import isValid from 'date-fns/isValid'
import { useAppStore } from '@/store/app/app.store.js'
import {
  loadGoogleApiClient,
  initGoogleClient,
  getConnectionNamesAndBirthdays,
} from '@/services/googlePeopleApi/googlePeopleApi.functions'
import { addNewPerson } from './importantPersons'

export async function askForConsent() {
  // 1. Load the JavaScript client library.
  console.log('1. Load the JavaScript client library.')
  await loadGoogleApiClient()

  // 2. Initialize the JavaScript client library.
  console.log('2. Initialize the JavaScript client library.')
  await initGoogleClient()

  console.log(window.gapi.auth2.getAuthInstance())

  // Listen for sign-in state changes.
  window.gapi.auth2
    .getAuthInstance()
    .isSignedIn.listen(updateSigninStatusCallback)

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

export async function getConnectionsAndAddPersons(pageToken) {
  const appStore = useAppStore()

  // Reset any previous import state
  appStore.setImportFromGoogleDone(false)

  appStore.setDoingImportFromGoogle(true)

  const pageResults = await getConnectionNamesAndBirthdays(pageToken)
  appStore.setTotalConnections(pageResults?.result?.totalItems)

  try {
    await addPersonsFromConnections(pageResults)
  } catch (err) {
    console.error('addPersonsFromConnections()', err)
  }

  const nextPageToken = pageResults?.result?.nextPageToken
  if (nextPageToken) {
    getConnectionsAndAddPersons(nextPageToken)
  } else {
    appStore.setDoingImportFromGoogle(false)
    appStore.setImportFromGoogleDone(true)
  }
}

async function addPersonsFromConnections(googlePeopleResponse) {
  if (!googlePeopleResponse?.result?.connections) {
    throw new Error(
      `Invalid Google People API answer: ${googlePeopleResponse?.result}`
    )
  }

  const addConnectionCallStack = []

  googlePeopleResponse.result.connections
    .filter(
      connection => !!connection.birthdays && connection.birthdays.length > 0
    )
    .forEach(connection => {
      addConnectionCallStack.push({ addFromGoogleConnection, connection })
    })

  // Add fake delay...
  return new Promise(async resolve => {
    for (const {
      addFromGoogleConnection,
      connection,
    } of addConnectionCallStack) {
      await new Promise(resolveOneCall => {
        setTimeout(() => {
          addFromGoogleConnection(connection)
          resolveOneCall()
        }, randomIntFromInterval(50, 450))
      })
    }
    resolve()
  })
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function addFromGoogleConnection(connection) {
  const displayName = connection.names[0].displayName
  let birthday
  try {
    birthday = buildBirthdayFromConnection(connection)
    addNewPerson({
      id: nanoid(),
      name: displayName,
      birthday,
      meta: {
        from: 'google',
      },
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
