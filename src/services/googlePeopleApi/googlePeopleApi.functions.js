const GOOGLE_API_KEY = process.env.VUE_APP_GOOGLE_API_KEY
const GOOGLE_CLIENT_ID = process.env.VUE_APP_GOOGLE_CLIENT_ID

export function initGoogleClient() {
  return window.gapi.client.init({
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
