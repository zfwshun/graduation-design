import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueClipBoard from 'vue-clipboard2'
import ElementUI, { MessageBox } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/bootstrap.css'
import './index.css'
import Pagination from '@/components/Pagination'
import * as echarts from 'echarts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'

Vue.config.productionTip = false
Vue.prototype.$alert = MessageBox.alert

Vue.use(VueClipBoard)
Vue.use(ElementUI)
Vue.prototype.$echarts = echarts
// eslint-disable-next-line vue/multi-word-component-names
Vue.component('Pagination', Pagination)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
