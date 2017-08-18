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
          状态：
          <span>{{detailObj.status}}</span>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="17">
          报价有效期限
          <span class="danger">{{detailObj.expiryDate}}</span>
          <span class="remark">(现阶段默认有效期为三天，若不能保证三天内此报价有效，请勿报价)</span>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="24">
          需求描述:
          <span >{{detailObj.remark}}</span>
        </el-col>
      </el-row>
      <el-row :gutter="10" class="grid-content">
        <el-col :span="1">
          图片:
        </el-col>
        <el-col :span="23">
          <img v-for="(imgSrc,idx) in detailObj.imgArr" :src="imgSrc" @click="showImg(detailObj.imgArr,idx)"  title="点击图片看大图">
        </el-col>
      </el-row>
    </div>
    <div class="item">
      <h2>疑难件提问</h2>
      <v-diffcult :qaList="detailObj.qa" @showImg="showImg"></v-diffcult>
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
  import ElRow from "element-ui/packages/row/src/row";
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
      ElRow,
      VPop,
      VDiffcult
    },
    mounted(){
      this.setFirstMenu('询报价监督')
      this.setSecondMenu(` 询价单号：${this.$route.query.orderid}`)
      this.$http.post('/detailQuick',{
        orderid:this.$route.query.orderid
      }).then((res)=>{
//         console.log(res.body)
        this.detailObj=JSON.parse(res.body)
      })
    }
  }
</script>

<style>
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
