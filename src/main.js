import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './stores'

import 'normalize.css'
import './assets/css/index.less'


createApp(App).use(router).use(pinia).mount('#app')
