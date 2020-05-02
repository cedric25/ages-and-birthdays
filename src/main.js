import Vue from 'vue'
import firebase from 'firebase/app'
import 'firebase/auth'
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
  },
}).$mount('#app')
