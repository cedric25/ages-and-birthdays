import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { useUserStore } from '@/store/user/user.store.ts'
import { getStateFromLocalStorage } from '@/services/localStorage/getStateFromLocalStorage.ts'
import firebaseConfig from '@/services/firebase/firebase-config'

export function initFirebase() {
  initializeApp(firebaseConfig)
  getAuth().onAuthStateChanged(user => {
    const userStore = useUserStore()
    if (user) {
      userStore.autoSignIn(user)
    } else {
      getStateFromLocalStorage()
      userStore.setLoginTriedOrFinished()
    }
  })
}
