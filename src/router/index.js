import Vue from 'vue'
import Router from 'vue-router'

//组件懒加载，按需导入（代替import直接导入组件）
const Price = resolve => require(['@/components/Price.vue'], resolve)
const Order = resolve => require(['@/components/Order.vue'], resolve)
const Setting = resolve => require(['@/components/Setting.vue'], resolve)
const Rule = resolve => require(['@/components/Rule.vue'], resolve)
const Supplier = resolve => require(['@/components/Supplier.vue'], resolve)

import PriceDetailSelf from '../components/price/PriceDetailSelf.vue'
import PriceDetailQuick from '../components/price/PriceDetailQuick.vue'
import PriceDetailDone from '../components/price/PriceDetailDone.vue'
import PriceDetailValid from '../components/price/PriceDetailValid.vue'
import SupplierDetail from '../components/supplier/SupplierDetail.vue'
import SettingDetail from '../components/setting/SettingDetail.vue'
import RuleDetail from '../components/rule/RuleDetail.vue'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: "/price"
    }, {
      path: '/price',
      name: 'price',
      component: Price
    },{
      path: '/price/detailself',
      component: PriceDetailSelf
    },{
      path: '/price/detailquick',
      component: PriceDetailQuick
    },{
      path: '/price/detaildone',
      component: PriceDetailDone
    },{
      path: '/price/detailvalid',
      component: PriceDetailValid
    },{
      path: '/rule',
      name: 'rule',
      component: Rule
    },{
      path: '/rule/detail',
      component: RuleDetail
    },{
      path: '/supplier',
      name: 'supplier',
      component: Supplier
    },{
      path: '/supplier/detail',
      component: SupplierDetail
    }, {
      path: '/order',
      name: 'order',
      component: Order
    }, {
      path: '/setting',
      name: 'setting',
      component: Setting
    },{
      path:'/setting/detail',
      component:SettingDetail
    }
  ]
})
