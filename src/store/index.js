import { createStore } from 'vuex'

// Modules
import user from './user/user-store.js'
import app from './app/app-store.js'

export const store = createStore({
  modules: {
    user,
    app,
  },
})
