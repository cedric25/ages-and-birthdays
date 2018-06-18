import * as firebase from 'firebase'
import { checkUserData } from '../../helpers/checkUserData'

export default {
  state: {
    user: null,
    loginTried: false,
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
      state.loginTried = true
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
      // TODO Use a dynamic ref instead of 'once'?

      firebase.database().ref(`users/${state.user.id}`).once('value')
        .then(userDataSnapshot => {
          const userData = userDataSnapshot.val()
          if (!userData) {
            // Create an entry and push whatever exists locally
            firebase.database().ref(`users/${state.user.id}`).set({
              user: state.user,
              importantPersons: rootState.app.importantPersons,
              groups: rootState.app.groups,
            }, err => {
              if (err) {
                // The write failed...
                console.error('Firebase write failed...', err)
              } else {
                // Data saved successfully!
                console.log('Firebase write all good')
              }
            })
          } else {
            const validData = checkUserData(userData)
            if (!validData) {
              throw new Error('There is data to be synced but invalid?... :(')
              // Keep local state...
            }
            // Override local state with what's in Firebase
            // TODO Message to ask if override okay?
            const personsState = []
            if (userData.importantPersons) {
              for (const personKey of Object.keys(userData.importantPersons)) {
                personsState.push(userData.importantPersons[personKey])
              }
            }
            userData.importantPersons && commit('setAllPersons', personsState)
            userData.groups && commit('setAllGroups', userData.groups)
          }

          commit('setLoginTried')
        })
        .catch(err => {
          console.error('Nothing? Or error?...', err)
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
