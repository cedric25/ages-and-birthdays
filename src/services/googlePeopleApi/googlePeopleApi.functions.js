// const GOOGLE_API_KEY = import.meta.env.VITE_APP_GOOGLE_API_KEY
const GOOGLE_CLIENT_ID = import.meta.env.VITE_APP_GOOGLE_CLIENT_ID

const gapi = window.gapi

const GOOGLE_API_BASE_URL = 'https://people.googleapis.com/v1/people'

export function loadGoogleApiClient() {
  return new Promise((resolve, reject) => {
    gapi.load('client:auth2', resolve)
  })
}

export function initGoogleClient() {
  return gapi.client.init({
    // Note: when you authorize your application using Oauth 2.0, you do not also need to set the API key as in the first example. However, it is a good practice to do so, in case your code ever expands to handle unauthorized requests.
    // 'apiKey': GOOGLE_API_KEY,
    // Your API key will be automatically added to the Discovery Document URLs.
    discoveryDocs: ['https://people.googleapis.com/$discovery/rest'],
    // clientId and scope are optional if auth is not required.
    clientId: GOOGLE_CLIENT_ID,
    // 'scope': 'profile',
    // Scopes à demander : https://developers.google.com/identity/protocols/oauth2/scopes#people
    scope: 'https://www.googleapis.com/auth/contacts.readonly',
  })
}

export async function getConnectionNamesAndBirthdays(pageToken) {
  try {
    // https://developers.google.com/people/api/rest/v1/people.connections/list
    return await window.gapi.client.request({
      path: `${GOOGLE_API_BASE_URL}/me/connections`,
      params: {
        personFields: 'names,birthdays',
        pageSize: 100,
        pageToken: pageToken || undefined,
      },
    })
  } catch (err) {
    console.error('getConnectionNamesAndBirthdays()', err)
    throw err
  }
}
