<template>
  <div class="price-detail">
    <div class="item">
      <h2>询价单信息</h2>
      <el-row :gutter="10">
        <el-col :span="6">
          询价单号：{{detailObj.id}}
        </el-col>
        <el-col :span="6">
          询价时间：{{detailObj.createDate}}
        </el-col>
        <el-col :span="6">
          车型:
          {{detailObj.cartype}}
        </el-col>
        <el-col :span="6" class="txtr status">
          状态：<span>{{detailObj.status}}</span>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="7">
          回复时间：
          {{detailObj.replyDate}}
        </el-col>
        <el-col :span="17">
          报价有效期限
          <span class="danger">{{detailObj.expiryDate}}</span>
        </el-col>
      </el-row>
    </div>
    <div class="item">
      <h2>疑难件提问</h2>
      <v-diffcult :qaList="detailObj.qa" @showImg="showImg"></v-diffcult>
    </div>
    <div>
      <h2>配件清单</h2>
      <el-tabs type="card" >
        <el-tab-pane v-for="(item,index) in detailObj.list" :label="item.supplier" :key="item">
          <div class="content" v-for="(itm,idx) in item.data" :key="itm">
            <el-row>
              <el-col :span="3"><div class="grid-content ">{{itm.name}}</div></el-col>
              <el-col :span="3"><div class="grid-content ">{{itm.oecode}}</div></el-col>
              <el-col :span="3"><div class="grid-content ">{{itm.partsquality}}</div></el-col>
              <el-col :span="3">
                <div class="grid-content grid"><p>{{itm.origin}}</p><p>{{itm.arrivalTime}}</p></div>
              </el-col>
              <el-col :span="3"><div class="grid-content ">{{itm.zone}}</div></el-col>
              <el-col :span="3"><div class="grid-content ">质保时间：{{itm.warrantyperiod}}</div></el-col>
              <el-col :span="6">
                <div class="other-content">
                  <el-row>
                    <el-col :span="24" class="blue">含税采购价（供应商报价）￥&nbsp; {{itm.supplierPrice}}</el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24" class="light-blue">含税报价（对客户报价）￥&nbsp; {{itm.custoPrice}}</el-col>
                  </el-row>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="item">
      <el-button @click="back" class="fr">返回列表</el-button>
    </div>
    <transition name="fade">
      <v-pop :imgArr="imgArr" :imgIdx="imgIdx" v-show="popShow" @closePop="closePop"></v-pop>
    </transition>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  import VDiffcult from '../price/Difficultqa.vue'
  import VPop from '../price/Popimg.vue'
  import ElTabPane from "../../../node_modules/element-ui/packages/tabs/src/tab-pane";
  import ElRow from "element-ui/packages/row/src/row";
  import ElCol from "element-ui/packages/col/src/col";
  export default{
    data(){
      return {
        detailObj:{},
        popShow:false,
        imgArr:[],
        imgIdx:''
      }
    },
    watch:{
      $route(to){

      }
    },
    methods:{
      ...mapMutations([
        'setFirstMenu','setSecondMenu'
      ]),
      back(){
        this.$router.push({
          'path':'/price'
        })
      },
      showImg(arr, idx){
        this.imgArr=arr
        this.imgIdx=idx
        this.popShow=true
      },
      closePop(){
        this.popShow=false
      }
    },
    components:{
      ElCol,
      ElRow,
      ElTabPane,
      VPop,
      VDiffcult
    },
    filters:{
      currency(val){
        return parseFloat(val)
      }
    },
    mounted(){
      this.setFirstMenu('询报价监督')
      this.setSecondMenu(` 询价单号：${this.$route.query.orderid}`)
      this.$http.post('/detailValid',{
        orderid:this.$route.query.orderid
      }).then((res)=>{
        this.detailObj=JSON.parse(res.body)
      })
    }
  }
</script>

<style>
  .grid :first-child{
    margin-top: -10px;
  }
  .grid :last-child{
    color: #666;
  }
  .blue{
    color: #20A0FF;
  }
  .light-blue{
    color: #58B7FF;
  }
  .other-content .el-col{
    margin-top: 12px;
    text-align: right;
  }
  .other-content .el-col-9{
    margin-top: 5px;
  }
  .content{
    border-bottom: 1px solid #c9c9c9;
    padding: 10px 0 20px 0;
  }
  .content:hover{
    background: #f8fbff;
    box-shadow: 0 2px 4px rgba(0,0,0,.12), 0 0 6px rgba(0,0,0,.04);
  }
  .content .grid-content{
    margin-top: 30px;
  }
  .fr{
    float: right;
  }
  .grid-content img{
    display: block;
    width: 80px;
    height: 80px;
    margin-right: 5px;
    margin-bottom: 5px;
    float: left;
    cursor: pointer;
  }
  .item {
    margin: 25px 0 10px;
    width:1200px;overflow:hidden;
  }
  .item .el-row {
    border-bottom: 1px solid #c9c9c9;
    padding: 10px 0;
  }
  .danger{
    color: #FF4949;
  }
  h2 {
    display: inline-block;
    font-weight: bold;
    font-size: 16px;
    border-left: 4px solid #20a0ff;
    padding: 5px 10px;
  }
</style>
