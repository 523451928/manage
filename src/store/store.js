import Vue from 'vue'
import Veux from 'vuex'

Vue.use(Veux)

const store=new Veux.Store({
  state:{
    firstMenuActive:'',
    secondMenuActive:'',
    tagName:'first',
    supplierDetail:{},
    settingDetail:{},
    ruleDetail:{}
  },
  mutations:{
    setFirstMenu(state,text){
      state.firstMenuActive=text
    },
    setSecondMenu(state,text){
      state.secondMenuActive=text
    },
    setTagName(state,text){
      state.tagName=text
    },
    setSupplierDetail(state,obj){
      state.supplierDetail=obj
    },
    setSettingDetail(state,obj){
      state.settingDetail=obj
    },
    setRuleDetail(state,obj){
      state.ruleDetail=obj
    }
  }
})

export default store
