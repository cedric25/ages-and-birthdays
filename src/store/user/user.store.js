import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { onValue } from 'firebase/database'
import { defineStore } from 'pinia'
import * as db from '@/helpers/db'
import { checkUserData } from '@/helpers/checkUserData.js'
import { useAppStore } from '@/store/app/app.store.js'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    loginTriedOrFinished: 0,
  }),
  actions: {
    // ----- SETTERS -----
    setUser(payload) {
      this.user = payload
    },
    setLoginTriedOrFinished() {
      this.loginTriedOrFinished++
    },
    // ----- ACTIONS -----
    // = Don't directly mutate state, go through setters
    autoSignIn(payload) {
      this.setUser({
        id: payload.uid,
        name: payload.displayName,
        email: payload.email,
        photoUrl: payload.photoURL,
      })
      this.signinDone()
    },
    signUserInGoogle() {
      signInWithPopup(getAuth(), new GoogleAuthProvider())
        .then(result => {
          const user = result.user
          const userStore = useUserStore()
          userStore.setUser({
            id: user.uid,
            name: user.displayName,
            email: user.email,
            photoUrl: user.photoURL,
          })
          userStore.signinDone()
        })
        .catch(error => {
          console.log(error)
        })
    },
    signinDone() {
      const appStore = useAppStore()
      appStore.setSyncingDb(true)
      db.readUserDataOnce(this.user.id)
        .then(userDataSnapshot => {
          const userData = userDataSnapshot.val()
          if (!userData) {
            const { importantPersons, groups } = appStore
            uploadLocalStateToDb(this.user, importantPersons, groups)
              .then(() => {
                appStore.setSyncingDb(false)
                watchForDbChanges(this.user.id)
              })
              .catch(() => appStore.setSyncingDb(false))
          } else {
            const validData = checkUserData(userData)
            if (!validData) {
              appStore.setSyncingDb(false)
              throw new Error('There is data to be synced but invalid... :(')
              // Keep local this...
            }
            // Override local state with what's in Firebase
            // TODO Message to ask if override okay?
            useDbState(userData)
            appStore.setSyncingDb(false)
            watchForDbChanges(this.user.id)
          }
          this.setLoginTriedOrFinished()
        })
        .catch(err => {
          appStore.setSyncingDb(false)
          console.error('Error...', err)
        })
    },
    signOut() {
      getAuth().signOut()
      this.setUser(null)
      this.setAllPersons([])
      this.setAllGroups(['Family', 'Friends'])
    },
  },
})

function uploadLocalStateToDb(user, importantPersons, groups) {
  return db
    .setUserData(user.id, {
      user,
      importantPersons,
      groups,
    })
    .then(() => console.log('Firebase write all good'))
    .catch(err => console.error('Firebase write failed...', err))
}

function useDbState(userData) {
  const personsState = []
  const appStore = useAppStore()
  if (userData.importantPersons) {
    for (const personKey of Object.keys(userData.importantPersons)) {
      personsState.push(userData.importantPersons[personKey])
    }
  }
  userData.importantPersons && appStore.setAllPersons(personsState)
  userData.groups && appStore.setAllGroups(userData.groups)
}

function watchForDbChanges(userId) {
  const MIN_LOADING_TIME = 250

  const appStore = useAppStore()

  const importantPersonsRef = db.getImportantPersonsRef(userId)
  onValue(importantPersonsRef, personsSnapshot => {
    appStore.setSyncingDb(true)

    if (!personsSnapshot.val()) {
      appStore.setAllPersons([])
    } else {
      // Check that all persons got a birthday prop, otherwise it might be a local Firebase value...
      const allPersonsFine = personsSnapshot
        .val()
        .every(person => !!person.birthday)
      if (allPersonsFine) {
        appStore.setAllPersons(personsSnapshot.val())
      }
    }

    setTimeout(() => {
      appStore.setSyncingDb(false)
    }, MIN_LOADING_TIME)
  })

  const groupsRef = db.getGroupsRef(userId)
  onValue(groupsRef, groupsSnapshot => {
    appStore.setSyncingDb(true)
    appStore.setAllGroups(groupsSnapshot.val() || [])
    setTimeout(() => {
      appStore.setSyncingDb(false)
    }, MIN_LOADING_TIME)
  })
}
