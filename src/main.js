import Vue from 'vue'
import {
  Vuetify,
  VApp,
  transitions,

  VAlert,
  VAvatar,
  VBtn,
  VCard,
  VChip,
  VDivider,
  VExpansionPanel,
  VGrid,
  VIcon,
  VJumbotron,
  VTextField,
  VToolbar,
} from 'vuetify'
import * as firebase from 'firebase'
import firebaseConfig from './firebase-config'
import App from './App.vue'
import router from './router'
import store from './store'
import * as localStorageHelper from './helpers/localStorageHelper'

// eslint-disable-next-line no-unused-vars
import ClickOutside from './directives/click-outside-directive'

require('../node_modules/vuetify/src/stylus/app.styl')

Vue.use(Vuetify, {
  components: {
    VApp,
    transitions,

    VAlert,
    VAvatar,
    VBtn,
    VCard,
    VChip,
    VDivider,
    VExpansionPanel,
    VGrid,
    VIcon,
    VJumbotron,
    VTextField,
    VToolbar,
  },
  theme: {
    primary: '#1976D2',
    secondary: '#b0bec5',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107',
  }
})

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router,
  render: h => h(App),
  store,
  created() {
    firebase.initializeApp(firebaseConfig)
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
      } else {
        this.getStateFromLocalStorage()
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
})
