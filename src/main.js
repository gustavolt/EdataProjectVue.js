import 'core-js/stable'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import CoreuiVue from '@coreui/vue'
import { iconsSet as icons } from './assets/icons/icons.js'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import Multiselect from 'vue-multiselect'
import './registerServiceWorker'
import VueMask from 'v-mask'

Vue.use(CoreuiVue)
Vue.use(VueMask);
Vue.use(VueSweetalert2);
Vue.component('multiselect', Multiselect)

Vue.config.performance = true
Vue.config.productionTip = false
Vue.prototype.$log = console.log.bind(console)

new Vue({
  el: '#app',
  router,
  store,
  icons,
  template: '<App/>',
  components: {
    App
  }
})
