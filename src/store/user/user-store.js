import * as firebase from 'firebase'
import * as db from '../../helpers/db'
import { checkUserData } from '../../helpers/checkUserData'

export default {
  state: {
    user: null,
    loginTried: 0,
  },
  getters: {
    user(state) {
      return state.user
    },
    loginTried(state) {
      return state.loginTried
    },
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
    },
    setLoginTried(state) {
      state.loginTried++
    },
  },
  actions: {
    autoSignIn({ commit, dispatch }, payload) {
      commit('setUser', {
        id: payload.uid,
        name: payload.displayName,
        email: payload.email,
        photoUrl: payload.photoURL
      })
      dispatch('signinDone')
    },
    signUserInGoogle({ commit, dispatch }) {
      firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then(result => {
          // const token = result.credential.accessToken
          const user = result.user
          commit('setUser', {
            id: user.uid,
            name: user.displayName,
            email: user.email,
            photoUrl: user.photoURL
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
              .then(() => commit('syncingDb', false))
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
          }
          commit('setLoginTried')
        })
        .catch(err => {
          commit('syncingDb', false)
          console.error('Error...', err)
        })
    },
    signout({ commit }) {
      firebase.auth().signOut()
      commit('setUser', null)
      commit('setAllPersons', [])
      commit('setAllGroups', ['Family', 'Friends'])
    },
  },
}

function uploadLocalStateToDb(user, importantPersons, groups) {
  return db.setUserData(user.id, {
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
