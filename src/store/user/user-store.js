import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { onValue } from 'firebase/database'
import * as db from '../../helpers/db'
import { checkUserData } from '../../helpers/checkUserData'

export default {
  state: {
    user: null,
    loginTriedOrFinished: 0,
  },
  getters: {
    user(state) {
      return state.user
    },
    loginTriedOrFinished(state) {
      return state.loginTriedOrFinished
    },
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
    },
    setLoginTriedOrFinished(state) {
      state.loginTriedOrFinished++
    },
  },
  actions: {
    autoSignIn({ commit, dispatch }, payload) {
      commit('setUser', {
        id: payload.uid,
        name: payload.displayName,
        email: payload.email,
        photoUrl: payload.photoURL,
      })
      dispatch('signinDone')
    },
    signUserInGoogle({ commit, dispatch }) {
      signInWithPopup(getAuth(), new GoogleAuthProvider())
        .then(result => {
          const user = result.user
          commit('setUser', {
            id: user.uid,
            name: user.displayName,
            email: user.email,
            photoUrl: user.photoURL,
          })
          dispatch('signinDone')
        })
        .catch(error => {
          console.log(error)
        })
    },
    signinDone({ state, rootState, commit }) {
      commit('syncingDb', true)
      db.readUserDataOnce(state.user.id)
        .then(userDataSnapshot => {
          const userData = userDataSnapshot.val()
          if (!userData) {
            const { importantPersons, groups } = rootState.app
            uploadLocalStateToDb(state.user, importantPersons, groups)
              .then(() => {
                commit('syncingDb', false)
                watchForDbChanges(state.user.id, commit)
              })
              .catch(() => commit('syncingDb', false))
          } else {
            const validData = checkUserData(userData)
            if (!validData) {
              commit('syncingDb', false)
              throw new Error('There is data to be synced but invalid... :(')
              // Keep local state...
            }
            // Override local state with what's in Firebase
            // TODO Message to ask if override okay?
            useDbState(userData, commit)
            commit('syncingDb', false)
            watchForDbChanges(state.user.id, commit)
          }
          commit('setLoginTriedOrFinished')
        })
        .catch(err => {
          commit('syncingDb', false)
          console.error('Error...', err)
        })
    },
    signout({ commit }) {
      getAuth().signOut()
      commit('setUser', null)
      commit('setAllPersons', [])
      commit('setAllGroups', ['Family', 'Friends'])
    },
  },
}

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

function useDbState(userData, commit) {
  const personsState = []
  if (userData.importantPersons) {
    for (const personKey of Object.keys(userData.importantPersons)) {
      personsState.push(userData.importantPersons[personKey])
    }
  }
  userData.importantPersons && commit('setAllPersons', personsState)
  userData.groups && commit('setAllGroups', userData.groups)
}

function watchForDbChanges(userId, commit) {
  const MIN_LOADING_TIME = 250

  const importantPersonsRef = db.getImportantPersonsRef(userId)
  onValue(importantPersonsRef, personsSnapshot => {
    commit('syncingDb', true)

    if (!personsSnapshot.val()) {
      commit('setAllPersons', [])
    } else {
      // Check that all persons got a birthday prop, otherwise it might be a local Firebase value...
      const allPersonsFine = personsSnapshot
        .val()
        .every(person => !!person.birthday)
      if (allPersonsFine) {
        commit('setAllPersons', personsSnapshot.val())
      }
    }

    setTimeout(() => {
      commit('syncingDb', false)
    }, MIN_LOADING_TIME)
  })

  const groupsRef = db.getGroupsRef(userId)
  onValue(groupsRef, groupsSnapshot => {
    commit('syncingDb', true)
    commit('setAllGroups', groupsSnapshot.val() || [])
    setTimeout(() => {
      commit('syncingDb', false)
    }, MIN_LOADING_TIME)
  })
}
