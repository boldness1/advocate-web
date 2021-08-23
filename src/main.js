import { createApp } from 'vue'
import vuetify from './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import apiService from './apiService/index';

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'


library.add(faUserSecret)




apiService.init('http://34.107.126.250:3000/');

const app = createApp(App)
app.use(router)
app.use(store)
app.use(vuetify)
app.use(VueSweetalert2);

app.config.productionTip = false
app.mount('#app')
