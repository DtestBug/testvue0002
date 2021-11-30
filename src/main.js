import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './css/global.css'
import './plugins/element'
import axios from 'axios'

// API参数校验
axios.defaults.baseURL = 'http://www.longboard-jg.ltd:8000'
// axios.defaults.baseURL = 'http://localhost:8002'
Vue.prototype.$http = axios
Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

