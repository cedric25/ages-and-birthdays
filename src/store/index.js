import Vue from 'vue'
import Vuex from 'vuex'
import user from './user/user-store'
import app from './app/app-store'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    app,
  },
})
