import Vue from 'vue'
import {
  Vuetify,
  VApp,
  transitions,

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
import App from './App.vue'
import router from './router'
import store from './store'

require('../node_modules/vuetify/src/stylus/app.styl')

Vue.use(Vuetify, {
  components: {
    VApp,
    transitions,

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
})
