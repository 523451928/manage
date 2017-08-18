// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import Resource from "vue-resource"
import Vuelazyload from 'vue-lazyload'
import store from './store/store'
import 'element-ui/lib/theme-default/index.css'

Vue.use(Vuelazyload,{
  preload:1.2,
  loading:"static/imgload.png",
  attempt:1
})
Vue.use(ElementUI)
Vue.use(Resource)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router, //router:router
  store,
  template: '<App/>',
  components: { App }
})
