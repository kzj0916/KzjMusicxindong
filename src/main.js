import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/reset.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import toast from 'components/common/toast/index'

Vue.use(toast);
Vue.config.productionTip = false
Vue.prototype.$bus = new Vue();
// import axios from 'axios'
// Vue.prototype.$axios = axios
// axios.defaults.baseURL = '/api'  //关键代码

Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

