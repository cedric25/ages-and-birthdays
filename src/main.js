import { createApp } from 'vue'
import { createPinia } from 'pinia';
import { registerSW } from 'virtual:pwa-register'
import App from './App.vue'
import router from './router/router.js'
import { initFirebase } from './services/firebase/firebase.js'

import './assets/styles/tailwind.css'
import './assets/styles/global.css'

registerSW()

const app = createApp(App)

app.use(createPinia())
app.use(router)

initFirebase()

app.mount('#app')
