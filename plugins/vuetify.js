import Vue from 'vue'
import {
  Vuetify, // required
  VApp, // required

  VBtn,
  VChip,
  VTextField,

  transitions
} from 'vuetify'
import { Ripple } from 'vuetify/es5/directives'

Vue.use(Vuetify, {
  components: {
    VApp,

    VBtn,
    VChip,
    VTextField,

    transitions,
  },
  directives: {
    Ripple,
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
