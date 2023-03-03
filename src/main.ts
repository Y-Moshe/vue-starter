import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from '@/App.vue'
import router from '@/router'
import { clickOutsideDirective } from '@/directives'
import './main.scss'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.directive('outside-click', clickOutsideDirective)

app.mount('#app')
