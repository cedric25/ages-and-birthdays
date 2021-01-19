import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router.js'
import { store } from './store'
import './assets/styles/tailwind.css'
import './assets/styles/global.css'

const app = createApp(App)

app.use(router)
app.use(store)

app.mount('#app')
