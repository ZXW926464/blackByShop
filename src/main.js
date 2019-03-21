import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

//导入全局样式
import './assets/site/css/style.css'

import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 导入axios
import axios from 'axios'
Vue.prototype.$axios = axios
axios.defaults.withCredentials=true;//让ajax携带cookie
axios.defaults.baseURL = 'http://111.230.232.110:8899/'

//导入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

//导入iView
import iView from 'iview'
import 'iview/dist/styles/iview.css'
Vue.use(iView)

// 放大镜组件
import ProductZoomer from 'vue-product-zoomer'
Vue.use(ProductZoomer)

//省市联动插件
import Distpicker from 'v-distpicker'
Vue.component('v-distpicker', Distpicker)

//二维码插件
import VueQrcode from '@chenfengyuan/vue-qrcode';
Vue.component(VueQrcode.name, VueQrcode);

// 导入每一个页面组件
import index from './components/index.vue'
import detail from './components/detail.vue'
import shopCart from './components/shopCart.vue'
import jiesuan from './components/jiesuan.vue'
import login from './components/login.vue'
import orderInfo from './components/orderInfo.vue'
import paySuccess from './components/paySuccess.vue'
import vipContent from './components/vipContent.vue'
import orderList from './components/orderList.vue'
import orderDetail from './components/orderDetail.vue'
import orderIndex from './components/orderIndex.vue'

// 写路由规则
let routes = [
  // 重定向去首页
  { path: '/', redirect: '/index' },
  { path: '/index', component: index },
  { path: '/detail/:id', component: detail },
  { path: '/shopCart', component: shopCart },
  { path: '/jiesuan/:ids', component: jiesuan ,meta:{isLogin:true}},
  { path: '/login', component: login },
  { path: '/orderInfo/:orderId', component: orderInfo ,meta:{isLogin:true}},
  { path: '/paySuccess', component: paySuccess ,meta:{isLogin:true}},
  { path: '/vipContent', component: vipContent ,meta:{isLogin:true},children:[{
    path: '/', redirect: 'orderIndex' 
  },{
    path:'orderList',component:orderList
  },{
    path:'orderDetail/:id',component:orderDetail
  },{
    path:'orderIndex',component:orderIndex
  }]},
]

// 实例化路由对象
let router = new VueRouter({
  routes,
  scrollBehavior (to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    return { x: 0, y: 0 }
  }
})

//导航守卫
router.beforeEach((to, from, next) => {
  if (to.meta.isLogin==true) {
    axios.get('site/account/islogin').then(res => {
      if (res.data.code == 'nologin') {
        Vue.prototype.$message({
          message: '请先登录',
          type: 'warning'
        })
        router.push('/login')
      }else{
        next()
      }
    })
  } else {
    next()
  }
})

// 导入 moment.js
import moment from 'moment'


//全局过滤器
Vue.filter('shorTime', value => {
  return moment(value).format('YYYY--MM~~DD')
})
Vue.filter('shorTimeP', value => {
  return moment(value).format('YYYY/MM/DD HH:mm:ss')
})

//导入vue-x
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    cartData: JSON.parse(window.localStorage.getItem('blackBy')) || {},
    islogin:false
  },
  mutations: {
    addCart(state, obj) {
      if (state.cartData[obj.goodsID] != undefined) {
        state.cartData[obj.goodsID] += obj.goodsNum
      } else {
        // state.cartData[obj.goodsID]=obj.goodsNum
        //动态添加属性需要手动vue.set
        Vue.set(state.cartData, obj.goodsID, obj.goodsNum)
      }
      // console.log(state.cartData);
    },
    upCart(state, obj) {
      state.cartData = obj
    },
    changelogin(state,islogin){
      state.islogin=islogin
    },
    delbyid(state,id){
      Vue.delete(state.cartData, id)
    }
  },
  getters: {
    totaNum: state => {
      let num = 0
      for (const key in state.cartData) {
        num += state.cartData[key]
      }
      return num
    }
  }
})

window.onbeforeunload = function() {
  window.localStorage.setItem('blackBy', JSON.stringify(store.state.cartData))
}

new Vue({
  render: h => h(App),
  //传入路由对象
  router,
  store,
  created() {
      axios.get('site/account/islogin').then(res => {
        if (res.data.code == 'nologin') {
          Vue.prototype.$message({
            message: '请先登录',
            type: 'warning'
          })
          router.push('/login')
        }else{
          store.state.islogin=true
        }
      })
  },
}).$mount('#app')
