import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import './assets/main.css' // CSS styling for the user interface

createApp(App).use(store).mount('#app')
