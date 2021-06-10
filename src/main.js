import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import BaiduMap from 'vue-baidu-map'

Vue.config.productionTip = false

Vue.use(BaiduMap, {
  ak: '6BpgZvZ5E6HCaDRcXDE18cDWsuNmpOwp'
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
