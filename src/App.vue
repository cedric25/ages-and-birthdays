<template>
  <TopMenu />
  <div style="padding-top: 56px">
    <router-view></router-view>
  </div>
</template>

<script setup>
import firebase from 'firebase/app'
import 'firebase/auth'
import firebaseConfig from './firebase-config.js'
import { store } from './store'
import * as localStorageHelper from './helpers/localStorageHelper.js'

// Components
import TopMenu from './components/TopMenu/TopMenu.vue'

try {
  firebase.initializeApp(firebaseConfig)
} catch {}

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    store.dispatch('autoSignIn', user)
  } else {
    getStateFromLocalStorage()
    store.commit('setLoginTriedOrFinished')
  }
})

function getStateFromLocalStorage() {
  const importantPersons = localStorageHelper.getPersons()
  const groups = localStorageHelper.getGroups()
  if (importantPersons) {
    store.commit('setAllPersons', JSON.parse(importantPersons))
  }
  if (groups) {
    store.commit('setAllGroups', JSON.parse(groups))
  }
}
</script>
