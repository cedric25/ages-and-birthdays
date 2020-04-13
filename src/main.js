import Vue from "vue";
import * as firebase from 'firebase'
import firebaseConfig from './firebase-config'
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import * as localStorageHelper from './helpers/localStorageHelper'

// eslint-disable-next-line no-unused-vars
import ClickOutside from './directives/click-outside-directive'

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    firebase.initializeApp(firebaseConfig)
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
      } else {
        this.getStateFromLocalStorage()
        this.$store.commit('setLoginTried')
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
}).$mount("#app");
