<template>
  <div class="price">
    <div >
      <el-tabs v-model="tagName" @tab-click="setTab">
        <!-- 待报价列表 -->
        <el-tab-pane label="等待报价"  name="first">
          <v-head @getData="getData" :options="options" :textArr="textArr"></v-head>
          <v-container v-if="waitData.total>0"  v-loading="isLoading" element-loading-text="拼命加载中"  :priceData="waitData.data" @showImg="showImg" @toPriceDetail="toPriceDetail"></v-container>
          <div v-if="waitData.total==0" class="no-data">暂无数据</div>
          <el-pagination
            layout="prev, pager, next,jumper,total"
            v-if="waitData.total>10"
            @current-change="getWaitData"
            :total="waitData.total">
          </el-pagination>
        </el-tab-pane>
        <!-- 全部询价信息 -->
        <el-tab-pane label="全部" name="second">
          <v-head @getData="getData" :options="options" :textArr="textArr"></v-head>
          <v-container v-if="allData.total>0"  v-loading="isLoading" element-loading-text="拼命加载中" :priceData="allData.data" @showImg="showImg" @toPriceDetail="toPriceDetail"></v-container>
          <div v-if="allData.total==0" class="no-data">暂无数据</div>
          <el-pagination
            layout="prev, pager, next,jumper,total"
            v-if="allData.total>10"
            @current-change="getAllData"
            :total="allData.total">
          </el-pagination>
        </el-tab-pane>
      </el-tabs>
      <transition name="img-fade">
        <v-pop :imgArr="imgArr" :imgIdx="imgIdx" v-show="popShow" @closePop="closePop"></v-pop>
      </transition>
    </div>
  </div>
</template>

<script>
  import VHead from './price/Head.vue'
  import VContainer from './price/Container.vue'
  import VPop from './price/Popimg.vue'
  import {mapState,mapMutations} from 'vuex'
  export default {
    data() {
      return {
        isLoading: false,
        num: 1,
        allData: {},
        waitData: {},
        date: '',
        oddNum: '',
        type: '',
        imgArr:[],
        imgIdx:'',
        popShow:false,
        priceShow:true,
        options: [{
          value: '快速询价',
          label: '快速询价'
        }, {
          value: '自助询价',
          label: '自助询价'
        }],
        textArr:['询价单号','询价时间','询价类型']
      }
    },
    filters: {},
    computed: {
      ...mapState([
          'tagName'
      ]),
      allPage(){
        return Math.ceil(this.allData.total / 10)
      },
      waitPage(){
        return Math.ceil(this.waitData.total / 10)
      }
    },
    watch:{
        $route(to){

        }
    },
    mounted() {
      this.getWaitData(1);
      this.getAllData(1)
    },
    methods: {
      ...mapMutations([
          'setTagName'
      ]),
      padLeftZero(str){
        return ("00" + str).substr((str + "").length);
      },
      setTab(tab){
        this.setTagName(tab.name)
      },
      toPriceDetail(item){
        if(item.status=="等待报价"||item.status=='询价中'){
          if(item.type=="快速询价"){
            this.$router.push({
              path: '/price/detailquick',
              query:{'orderid':item.orderId}
            })
          }else{
            this.$router.push({
              path: '/price/detailself',
              query:{'orderid':item.orderId}
            })
          }
        }else if(item.status=='已报价'){
          this.$router.push({
            path: '/price/detaildone',
            query:{'orderid':item.orderId}
          })
        }else{
          this.$router.push({
            path: '/price/detailvalid',
            query:{'orderid':item.orderId}
          })
        }

      },
      showImg(arr, idx){
        this.imgArr=arr
        this.imgIdx=idx
        this.popShow=true
      },
      closePop(){
        this.popShow=false
      },
      getData(date, type, oddNum){
        this.date = date
        this.type = type
        this.oddNum = oddNum
        if (this.tagName == 'second') {
          this.getAllData(1)
        } else {
          this.getWaitData(1)
        }
      },
      getAllData(num) {
        this.isLoading=true
        if(this.date.length>0){
          var start=new Date(this.date[0])
          var end=new Date(this.date[1])
          var startTime=start.getFullYear()+'-'+this.padLeftZero(start.getMonth()+1)+'-'+this.padLeftZero(start.getDate())
          var endTime=end.getFullYear()+'-'+this.padLeftZero(end.getMonth()+1)+'-'+this.padLeftZero(end.getDate())
        }else{
          var startTime=""
          var endTime=""
        }
        this.$http.post('/priceData', {
          pageId: num,
          inquiryno: this.oddNum,
          starttime:startTime ,
          endtime:endTime ,
          inquirytype: this.type
        }).then(function (res) {
          this.isLoading=false
          this.allData = JSON.parse(res.body)
        })
      },
      getWaitData(num){
        this.isLoading=true
        if(this.date.length>0){
          var start=new Date(this.date[0])
          var end=new Date(this.date[1])
          var startTime=start.getFullYear()+'-'+this.padLeftZero(start.getMonth()+1)+'-'+this.padLeftZero(start.getDate())
          var endTime=end.getFullYear()+'-'+this.padLeftZero(end.getMonth()+1)+'-'+this.padLeftZero(end.getDate())
        }else{
          var startTime=""
          var endTime=""
        }
        this.$http.post('/priceWaitData', {
          pageId: num,
          inquiryno: this.oddNum,
          starttime:startTime ,
          endtime:endTime ,
          inquirytype: this.type
        }).then((res) => {
          this.isLoading=false
          this.waitData = JSON.parse(res.body)
        })
      }
    },
    components: {
      VHead,
      VPop,
      VContainer
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
  .img-fade-enter-active, .img-fade-leave-active {
    transition: all .5s;
  }
  .img-fade-enter, .img-fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
    opacity: 0;
  }

  .img-fade-enter .img-box img,.img-fade-leave-to .img-box  img{
    transform: scale(0.5);
    opacity: 1;
  }
  .no-data{
    text-align: center;
    margin-top: 10px;
    color: #666666;
  }
  .el-pagination {
    text-align: center;
    margin-top: 10px;
  }
</style>
