import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { onValue } from 'firebase/database'
import { defineStore } from 'pinia'
import type { User } from '@/@types/User'
import type { Person } from '@/@types/Person'
import type { Group } from '@/@types/Group'
import format from 'date-fns/format'
import * as db from '@/helpers/db'
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
    async signUserInGoogle() {
      try {
        const result = await signInWithPopup(
          getAuth(),
          new GoogleAuthProvider()
        )
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
      } catch (err) {
        console.log(err)
      }
    },
    async signInDone() {
      if (!this.user) {
        return
      }
      const appStore = useAppStore()
      appStore.setSyncingDb(true)
      try {
        await getUserData(this.user)
        db.updateUserLastSeenAt(this.user.id)
      } catch {}
    },
    signOut() {
      getAuth().signOut()
      this.setUser(null)
      const appStore = useAppStore()
      appStore.$reset()
    },
  },
})

async function getUserData(user: User) {
  const appStore = useAppStore()
  try {
    const userDataSnapshot = await db.readUserDataOnce(user.id)
    const userData = userDataSnapshot.val()
    if (!userData) {
      const { importantPersons, groups } = appStore
      await oneTimeLocalStateUploadToDb(user, importantPersons, groups)
      appStore.setSyncingDb(false)
      return
    }
    watchForDbChanges(user.id)
    const userStore = useUserStore()
    userStore.setLoginTriedOrFinished()
  } catch (err) {
    appStore.setSyncingDb(false)
    console.error('Error...', err)
    throw err
  }
}

async function oneTimeLocalStateUploadToDb(
  user: User,
  importantPersons: Person[],
  groups: Group[]
) {
  try {
    await db.setUserData(user.id, {
      user: {
        ...user,
        createdAt: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss:SSS'Z'"),
      },
      importantPersons,
      groups,
    })
  } catch (err) {
    console.error('Firebase write failed...', err)
    throw err
  }
}

function watchForDbChanges(userId: string) {
  const MIN_LOADING_TIME = 250

  const appStore = useAppStore()

  const importantPersonsRef = db.getImportantPersonsRef(userId)
  onValue(importantPersonsRef, personsSnapshot => {
    console.log('-> onValue persons', personsSnapshot.val())
    appStore.setSyncingDb(true)

    if (!personsSnapshot.val()) {
      appStore.setAllPersons([])
    } else {
      const dbPersons = Object.values(personsSnapshot.val()) as Person[]
      console.log('dbPersons', dbPersons)
      // Check that all persons got a birthday prop, otherwise it might be a local Firebase value...
      if (!checkDbPersons(dbPersons)) {
        return
      }
      const persons: Person[] = []
      for (const person of dbPersons) {
        persons.push({
          ...person,
          birthday: new Date(person.birthday),
        })
      }
      appStore.setAllPersons(persons)
    }

    setTimeout(() => {
      appStore.setSyncingDb(false)
    }, MIN_LOADING_TIME)
  })

  const groupsRef = db.getGroupsRef(userId)
  onValue(groupsRef, groupsSnapshot => {
    console.log('-> onValue groups')
    appStore.setSyncingDb(true)
    appStore.setAllGroups(groupsSnapshot.val() || [])
    setTimeout(() => {
      appStore.setSyncingDb(false)
    }, MIN_LOADING_TIME)
  })
}

function checkDbPersons(dbPersons: Person[]): boolean {
  let isDbDataValid = true
  for (const dbPerson of dbPersons) {
    if (!dbPerson.birthday) {
      console.error(`⚠️ ${dbPerson.name} does NOT have a birthday!`)
      isDbDataValid = false
    }
  }
  return isDbDataValid
}
