import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import clientHttp from './utils/interceptors';
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import './assets/icon/iconfont.css'
import echarts from 'echarts'

Vue.config.productionTip = false;
Vue.prototype.$echarts = echarts;
Vue.prototype.clientHttp = clientHttp;
Vue.use(ViewUI);
Vue.use(echarts);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
