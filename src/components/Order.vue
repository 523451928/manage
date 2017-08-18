<template>
  <div class="order">
    <v-head @getData="getData" :options="options" :textArr="textArr"></v-head>
    <el-row >
      <el-col :span="5">
        <div class="grid-head ">单号</div>
      </el-col>
      <el-col :span="3">
        <div class="grid-head ">生成时间</div>
      </el-col>
      <el-col :span="4">
        <div class="grid-head ">客户 / 联系方式</div>
      </el-col>
      <el-col :span="4">
        <div class="grid-head ">供应商 / 联系方式</div>
      </el-col>
      <el-col :span="3">
        <div class="grid-head ">状态</div>
      </el-col>
      <el-col :span="5">
        <div class="grid-head ">操作</div>
      </el-col>
    </el-row>
    <div v-loading="isLoading" element-loading-text="拼命加载中">
      <el-row v-for="(item,index) in orderData.list":key="index">
        <el-row class="grid-list" >
          <el-col :span="5">
            <div >{{item.orderno}}</div>
          </el-col>
          <el-col :span="3">
            <div >{{item.ttime}}</div>
          </el-col>
          <el-col :span="4">
            <div >{{item.cusname}} / {{item.custel}}</div>
          </el-col>
          <el-col :span="4">
            <div >{{item.supname}} / {{item.suptel}}</div>
          </el-col>
          <el-col :span="3">
            <div >
              <span :class="{'danger':item.orderstatus=='未处理'}">{{item.orderstatus}}</span>
            </div>
          </el-col>
          <el-col :span="5">
            <div class="edit">
              <span class="success" v-if="item.orderstatus=='未处理'" @click="markShipped(item)">标记为已发货</span>
              <span @click="toggleDtail($event,item.orderdata)" class="collapse">展开</span>
            </div>
          </el-col>
        </el-row>
        <transition name="collapse">
          <el-row class="order-cont" v-show="item.orderdata.isOpen" >
            <el-row>
              <el-col :span="4">
                <div >
                  <span >关联询价单号：{{item.orderdata.inquiryno}}</span>
                </div>
              </el-col>
              <el-col :span="8">
                <div >
                  <span >车型：{{item.orderdata.cartype}}</span>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="4">
                <div >
                  <span >客户名称：{{item.orderdata.suppliername}}</span>
                </div>
              </el-col>
              <el-col :span="8">
                <div >
                  <span >供应商名称：{{item.orderdata.customername}}</span>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <div >
                  <span >客户收货地址：{{item.orderdata.deliveryaddress}}</span>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <div >
                  <span class="danger">配送站转运地址：{{item.orderdata.forwardingaddress}}</span>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="4">
                <div class="grid-head ">OE号</div>
              </el-col>
              <el-col :span="5">
                <div class="grid-head ">配件名称</div>
              </el-col>
              <el-col :span="3">
                <div class="grid-head ">品质</div>
              </el-col>
              <el-col :span="3">
                <div class="grid-head ">品牌</div>
              </el-col>
              <el-col :span="3">
                <div class="grid-head ">单价</div>
              </el-col>
              <el-col :span="3">
                <div class="grid-head ">数量</div>
              </el-col>
              <el-col :span="3">
                <div class="grid-head ">小计</div>
              </el-col>
            </el-row>
            <el-row v-for="(order,idx) in item.orderdata.list" class="order-item" :key="idx">
              <el-col :span="4">
                <div class=" ">{{order.oe}}</div>
              </el-col>
              <el-col :span="5">
                <div class=" ">{{order.partsname}}</div>
              </el-col>
              <el-col :span="3">
                <div class=" ">{{order.partsquality}}</div>
              </el-col>
              <el-col :span="3">
                <div class=" ">{{order.partsbrand}}</div>
              </el-col>
              <el-col :span="3">
                <div class=" ">{{order.price}}</div>
              </el-col>
              <el-col :span="3">
                <div class=" ">{{order.count}}</div>
              </el-col>
              <el-col :span="3">
                <div class=" ">{{order.price*order.count | currency}}</div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="21">
                <div class=" ">&nbsp;</div>
              </el-col>
              <el-col :span="3">
                <div class=" ">订单金额：{{item.totalprice}}</div>
              </el-col>
            </el-row>
          </el-row>
        </transition>
      </el-row>
      <el-pagination
        layout="prev, pager, next,jumper,total"
        @current-change="getOrder"
        :total="orderData.total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import ElRow from "element-ui/packages/row/src/row";
  import VHead from "./price/Head.vue"
  import ElCol from "element-ui/packages/col/src/col";
  export default {
    data () {
      return {
        isLoading: false,
        options: [{
          value: '0',
          label: '未处理'
        }, {
          value: '1',
          label: '已发货'
        }, {
          value: '2',
          label: '已签收'
        }],
        textArr:['单号','生成时间','状态'],
        date:"",
        statu:"",
        oddNum:"",
        pageNum:1,
        orderData:{}
      }
    },
    methods:{
      padLeftZero(str){
        return ("00" + str).substr((str + "").length);
      },
      markShipped(data){
          console.log(data)
        data.orderstatus='已发货'
//        this.$http.post('',{
//
//        }).then((res)=>{
//
//        })
      },
      toggleDtail(e,data){
        if(e.target.innerHTML=="展开"){
          e.target.innerHTML="收起"
        }else{
          e.target.innerHTML="展开"
        }
        if(!data.isOpen){
          this.$set(data,'isOpen',true)
        }else{
            data.isOpen=!data.isOpen
        }
      },
      getData(date, statu, oddNum){
        this.date=date
        this.statu=statu
        this.oddNum=oddNum
        this.getOrder()
      },
      getOrder(num){
        if(typeof(num)=='number'){
          this.pageNum=num
        }
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
        this.$http.post('/orderList',{
          orderno:this.oddNum,
          status:this.statu,
          pageId:this.pageNum,
          starttime:startTime,
          endtime:endTime
        }).then((res)=>{
          this.isLoading=false
          this.orderData=JSON.parse(res.body)
        })
      }
    },
    filters:{
        currency(val){
            return val.toFixed(2)
        }
    },
    mounted(){
       this.getOrder()
    },
    components:{
      ElCol,
      ElRow,
      VHead
    }
  }
</script>


<style >
  .collapse-enter-active, .collapse-leave-active {
    transition: all .5s
  }
  .collapse-enter, .collapse-leave-to {
    transform-origin: left top;
    transform: scaleY(0);
  }
  .order-item div{
    height: 40px;
    line-height: 40px;
    background: #fff;
  }
  .order-cont{
    border: 1px solid #dfe6ec;
    padding: 10px;
    background: #fbfdff;
    color: #1f2d3d;
    box-shadow: 0 2px 4px rgba(0,0,0,.12), 0 0 6px rgba(0,0,0,.04);
  }
  .order-cont .el-row{
    margin-top: 5px;
  }
  .edit span{
    cursor: pointer;
    margin-right: 12px;
    color: #20A0FF;
  }
  .edit .success{
    color: #13CE66;
  }
  .danger{
    color: #e64242;
  }
  .grid-head {
    height: 38px;
    line-height: 38px;
    border-bottom: 1px solid #eaeefb;
    color: #5e6d82;
    margin-top: 5px;
    background: #eff2f7;
  }
  .order .grid-list {
    border-bottom: 1px solid #ccc;
    padding:20px 0;
  }

  .order .grid-list:hover {
    /*background: #f8fbff;*/
  }
  .order{
    margin-top: 20px;
  }
  .el-pagination {
    text-align: center;
    margin: 10px 0;
  }
</style>
