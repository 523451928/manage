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
    </div>
    <div class="item">
      <h2>疑难件提问</h2>
      <v-diffcult :qaList="detailObj.qa" @showImg="showImg"></v-diffcult>
    </div>
    <div class="item">
      <h2>配件清单</h2>
      <el-row :gutter="10" v-for="(item,index) in detailObj.waitlist" class="part-item" :key="item">
        <el-col :span="4">
          <div class="grid-content ">{{item.name}}</div>
        </el-col>
        <el-col :span="14">
          <div class="grid-content ">{{item.remark}}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">
            <div class="clrfix">
              <img v-for="(src,idx) in item.imgArr" :src="src" @click="showImg(item.imgArr,idx)" :key="src"  title="点击图片看大图">
            </div>
          </div>
        </el-col>
      </el-row>
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
        VPop,
        VDiffcult
    },
    mounted(){
      this.setFirstMenu('询报价监督')
      this.setSecondMenu(` 询价单号：${this.$route.query.orderid}`)
      this.$http.post('/detailSelf',{
          orderid:this.$route.query.orderid
      }).then((res)=>{
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
