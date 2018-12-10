import Vue from 'vue'
import App from './App.vue'

import i18n from './bootstrap/i18n'
import router from './bootstrap/router'
import store from './bootstrap/store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
