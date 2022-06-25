import type { User } from '@/@types/User'
import type { Person } from '@/@types/Person'
import type { Group } from '@/@types/Group';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { onValue } from 'firebase/database'
import { defineStore } from 'pinia'
import * as db from '@/helpers/db'
import { checkDbUserData } from '@/services/firebase/checkDbUserData'
import { useAppStore } from '@/store/app/app.store'

type State = {
  user: User | null
  loginTriedOrFinished: number
}

export const useUserStore = defineStore('user', {
  state: (): State => ({
    user: null,
    loginTriedOrFinished: 0,
  }),
  actions: {
    // ----- SETTERS -----
    setUser(payload: User | null) {
      this.user = payload
    },
    setLoginTriedOrFinished() {
      this.loginTriedOrFinished++
    },
    // ----- ACTIONS -----
    // = Don't directly mutate state, go through setters
    autoSignIn(payload: {
      uid: string
      displayName: string
      email: string
      photoURL: string
    }) {
      this.setUser({
        id: payload.uid,
        name: payload.displayName,
        email: payload.email,
        photoUrl: payload.photoURL,
      })
      this.signInDone()
    },
    signUserInGoogle() {
      signInWithPopup(getAuth(), new GoogleAuthProvider())
        .then(result => {
          const user = result.user as {
            uid: string
            displayName: string
            email: string
            photoURL?: string
          }
          this.setUser({
            id: user.uid,
            name: user.displayName,
            email: user.email,
            photoUrl: user.photoURL || '',
          })
          this.signInDone()
        })
        .catch(error => {
          console.log(error)
        })
    },
    signInDone() {
      if (!this.user) {
        return
      }
      const appStore = useAppStore()
      appStore.setSyncingDb(true)
      getUserData(this.user)
      db.updateUserLastSeenAt(this.user.id)
    },
    signOut() {
      getAuth().signOut()
      this.setUser(null)
      const appStore = useAppStore()
      appStore.$reset()
    },
  },
})

function getUserData(user: User) {
  const appStore = useAppStore()
  db.readUserDataOnce(user.id)
    .then((userDataSnapshot: any) => {
      const userData = userDataSnapshot.val()
      if (!userData) {
        const { importantPersons, groups } = appStore
        uploadLocalStateToDb(user, importantPersons, groups)
          .then(() => {
            appStore.setSyncingDb(false)
            watchForDbChanges(user.id)
          })
          .catch(() => appStore.setSyncingDb(false))
      } else {
        const isDbDataValid = checkDbUserData(userData)
        if (!isDbDataValid) {
          appStore.setSyncingDb(false)
          throw new Error('There is data to be synced but invalid... :(')
          // Keep local data...
        }
        // Override local state with what's in Firebase
        // TODO Message to ask if override okay?
        useDbState(userData)
        appStore.setSyncingDb(false)
        watchForDbChanges(user.id)
      }
      const userStore = useUserStore()
      userStore.setLoginTriedOrFinished()
    })
    .catch((err: any) => {
      appStore.setSyncingDb(false)
      console.error('Error...', err)
    })
}

function uploadLocalStateToDb(
  user: User,
  importantPersons: Person[],
  groups: Group[]
) {
  return db
    .setUserData(user.id, {
      user,
      importantPersons,
      groups,
    })
    .then(() => console.log('Firebase write all good'))
    .catch((err: any) => console.error('Firebase write failed...', err))
}

function useDbState(userData: { importantPersons: any; groups: any }) {
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

function watchForDbChanges(userId: string) {
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
