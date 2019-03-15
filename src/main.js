import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

//导入全局样式
import './assets/site/css/style.css'

import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 导入axios
import axios from "axios";
Vue.prototype.$axios=axios
axios.defaults.baseURL = 'http://111.230.232.110:8899/';

//导入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//导入iView
import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView);

// 导入每一个页面组件
import index from './components/index.vue'
import detail from './components/detail.vue'

// 写路由规则
let routes = [
  // 重定向去首页
  { path: '/', redirect: '/index' },
  { path: '/index', component: index },
  { path: '/detail/:id', component: detail },
]

// 实例化路由对象
let router = new VueRouter({
  routes
})


// 导入 moment.js
                      import moment from "moment";
                      //全局过滤器
                      Vue.filter('shorTime',  (value)=> {
                        return moment(value).format("YYYY--MM~~DD");
                      })
Vue.filter('shorTimeP',  (value)=> {
  return moment(value).format("YYYY/MM/DD HH:mm:ss");
})

new Vue({
  render: h => h(App),
  //传入路由对象
  router
}).$mount('#app')
