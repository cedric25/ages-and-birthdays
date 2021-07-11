import Vue from 'vue'
import firebase from 'firebase/app'
import 'firebase/auth'
import { registerSW } from 'virtual:pwa-register'
import firebaseConfig from './firebase-config'
import App from './App.vue'
import router from './router'
import store from './store'
import * as localStorageHelper from './helpers/localStorageHelper'

import './assets/styles/tailwind.css'
import './assets/styles/global.css'

registerSW()

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    firebase.initializeApp(firebaseConfig)
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
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
