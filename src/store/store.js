import { createStore } from 'vuex'
import user from './user/user-store'
import app from './app/app-store'

export default createStore({
  modules: {
    user,
    app,
  },
})
