import Vue from 'vue'
import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './firebase-config'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import * as localStorageHelper from './helpers/localStorageHelper'

import './assets/styles/tailwind.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    firebase.initializeApp(firebaseConfig)
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log('--> user', user)
        this.$store.dispatch('autoSignIn', user)

        // 1. Load the JavaScript client library.
        // window.gapi.load('client:auth2', start);
      } else {
        this.getStateFromLocalStorage()
        this.$store.commit('setLoginTriedOrFinished')
      }
    })

    // 1. Load the JavaScript client library.
    window.gapi.load('client:auth2', start);
  },
  methods: {
    getStateFromLocalStorage() {
      const importantPersons = localStorageHelper.getPersons()
      const groups = localStorageHelper.getGroups()
      if (importantPersons) {
        this.$store.commit('setAllPersons', JSON.parse(importantPersons))
      }
      if (groups) {
        this.$store.commit('setAllGroups', JSON.parse(groups))
      }
    },
  }
}).$mount('#app')

function start() {
  // 2. Initialize the JavaScript client library.
  window.gapi.client.init({
    // Note: when you authorize your application using Oauth 2.0, you do not also need to set the API key as in the first example. However, it is a good practice to do so, in case your code ever expands to handle unauthorized requests.
    // 'apiKey': 'AIzaSyCyhBHHmtRypmBwh_Af13Jt3GVw1FRpk1M',
    // Your API key will be automatically added to the Discovery Document URLs.
    'discoveryDocs': ['https://people.googleapis.com/$discovery/rest'],
    // clientId and scope are optional if auth is not required.
    'clientId': '302369470244-g8vmssum3j1e0tuc9pll5dq7iu2vp3e7.apps.googleusercontent.com',
    // 'scope': 'profile',
    // Scopes à demander : https://developers.google.com/identity/protocols/oauth2/scopes#people
    'scope': 'https://www.googleapis.com/auth/contacts.readonly',
  }).then(function() {

    // Code d'exemple trouvé ici : https://github.com/google/google-api-javascript-client/blob/master/samples/authSample.html
    // Autres liens :
    // https://developers.google.com/identity/protocols/oauth2
    // https://github.com/google/google-api-javascript-client/blob/master/docs/samples.md#authorizing-and-making-authorized-requests

    // Listen for sign-in state changes.
    window.gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

    // Handle the initial sign-in state.
    updateSigninStatus(window.gapi.auth2.getAuthInstance().isSignedIn.get());

  });
}

function updateSigninStatus(isSignedIn) {
  console.log('?? isSignedIn', isSignedIn)
  console.log('window.gapi.auth2.getAuthInstance()', window.gapi.auth2.getAuthInstance())
  if (isSignedIn) {
  //   authorizeButton.style.display = 'none';
  //   signoutButton.style.display = 'block';
    makeApiCall();
  }
  // else {
  //   authorizeButton.style.display = 'block';
  //   signoutButton.style.display = 'none';
  // }
}

function makeApiCall() {

  // Aide pour la requête :
  // https://developers.google.com/people/api/rest/v1/people.connections/list

  window.gapi.client.request({
    'path': 'https://people.googleapis.com/v1/people/me/connections',
    params: {
      personFields: 'names,birthdays',
      pageSize: 25,
    },
  }).then(function(response) {
    console.log('YES!!!', response);
    console.log(response.result);
    for (const connection of response.result.connections) {
      if (!connection.birthdays) continue
      const displayName = connection.names[0].displayName
      // const birthdayText = connection.birthdays[0].text
      const birthdayText = connection.birthdays[0].date
      console.log(`${displayName} -> ${JSON.stringify(birthdayText, null, 2)}`)
    }
  }, function(reason) {
    console.log('Error - reason', reason)
    // console.log('Error: ' + reason.result.error.message);
  });
}
