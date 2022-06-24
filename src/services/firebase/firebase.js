import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import firebaseConfig from '../../firebase-config.js'
import store from '../../store/store.js'
import { getStateFromLocalStorage } from '../localStorage/getStateFromLocalStorage.js'

export function initFirebase() {
  initializeApp(firebaseConfig)
  getAuth().onAuthStateChanged(user => {
    if (user) {
      store.dispatch('autoSignIn', user)
    } else {
      getStateFromLocalStorage()
      store.commit('setLoginTriedOrFinished')
    }
  })
}
