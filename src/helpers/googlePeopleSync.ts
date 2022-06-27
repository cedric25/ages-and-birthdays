import { nanoid } from 'nanoid'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { useAppStore } from '@/store/app/app.store'
import {
  loadGoogleApiClient,
  initGoogleClient,
  getConnectionNamesAndBirthdays,
} from '@/services/googlePeopleApi/googlePeopleApi.functions.js'
import { addNewPerson } from './importantPersons'

dayjs.extend(customParseFormat)

type GoogleConnection = {
  names: Array<{
    displayName: string
  }>
  birthdays: any[]
}

declare global {
  interface Window {
    gapi: any
  }
}

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
    .isSignedIn.listen(updateSignInStatusCallback)

  // Handle the initial sign-in state.
  const isSignedIn = window.gapi.auth2.getAuthInstance().isSignedIn.get()
  updateSignInStatusCallback(isSignedIn)

  // 3. Show consent popup
  if (!isSignedIn) {
    console.log('3. Show consent popup')
    window.gapi.auth2.getAuthInstance().signIn()
  }

  // 4. Get user answer and go get Google connections
  // (See updateSignInStatusCallback())
}

async function updateSignInStatusCallback(isSignedIn: boolean) {
  if (isSignedIn) {
    console.log('4. Consent given, go find connections.')
    await getConnectionsAndAddPersons()
  } else {
    console.log('else...')
  }
}

export async function getConnectionsAndAddPersons(pageToken?: string) {
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

async function addPersonsFromConnections(googlePeopleResponse: any) {
  if (!googlePeopleResponse?.result?.connections) {
    throw new Error(
      `Invalid Google People API answer: ${googlePeopleResponse?.result}`
    )
  }

  const addConnectionCallStack: Array<{
    addFromGoogleConnection: typeof addFromGoogleConnection
    connection: GoogleConnection
  }> = []

  googlePeopleResponse.result.connections
    .filter(
      (connection: GoogleConnection) =>
        !!connection.birthdays && connection.birthdays.length > 0
    )
    .forEach((connection: GoogleConnection) => {
      addConnectionCallStack.push({ addFromGoogleConnection, connection })
    })

  // Add fake delay...
  return new Promise(async (resolve: Function) => {
    for (const {
      addFromGoogleConnection,
      connection,
    } of addConnectionCallStack) {
      await new Promise((resolveOneCall: Function) => {
        setTimeout(() => {
          addFromGoogleConnection(connection)
          resolveOneCall()
        }, randomIntFromInterval(50, 450))
      })
    }
    resolve()
  })
}

function randomIntFromInterval(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

async function addFromGoogleConnection(connection: GoogleConnection) {
  const displayName = connection.names[0].displayName
  let birthday
  try {
    birthday = buildBirthdayFromConnection(connection)
    if (!birthday) {
      return
    }
    const personId = nanoid()
    await addNewPerson({
      personId,
      personInfo: {
        id: personId,
        name: displayName,
        birthday,
        meta: {
          from: 'google',
        },
      },
    })
  } catch (err: any) {
    err.message = `${err.message} for "${displayName}"`
    console.error(err)
  }
}

export function buildBirthdayFromConnection(
  connection: GoogleConnection
): Date | undefined {
  const { date, text } = connection.birthdays[0]
  if (!date && !text) {
    return
  }
  if (date) {
    const { year = 1896, month, day } = connection.birthdays[0].date
    return new Date(Date.UTC(year, month - 1, day))
  }
  if (text) {
    const firstTry = dayjs(text, 'MMMM D, YYYY')
    if (firstTry.isValid()) {
      return firstTry.toDate()
    }
    const secondTry = dayjs(text, 'MMMM D', true)
    if (secondTry.isValid()) {
      return secondTry.year(1896).toDate()
    }
    throw new Error(`Could not build birthday from text "${text}"`)
  }
}
