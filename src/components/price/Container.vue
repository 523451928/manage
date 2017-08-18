<template>
  <div class="price-container">
    <el-row >
      <el-col :span="4">
        <div class="grid-head ">单据信息</div>
      </el-col>
      <el-col :span="13">
        <div class="grid-head ">询价内容</div>
      </el-col>
      <el-col :span="3">
        <div class="grid-head ">询价状态</div>
      </el-col>
      <el-col :span="4">
        <div class="grid-head ">操作</div>
      </el-col>
    </el-row>
    <transition-group name="fade" tag="div">
      <el-row v-for="(item,index) in priceData" class="grid-list" :key="item">
        <el-col :span="4">
          <div class="grid-item ">
            <p>询价单号:{{item.orderId}}</p>
            <p>询价类型:{{item.type}}</p>
            <p>创建时间:{{item.createDate}}</p>
          </div>
        </el-col>
        <el-col :span="13">
          <div class="grid-item ">
            <p>
              <span>{{item.vehicletype}}</span>
              <span v-for="(item,index) in item.pjdata">{{item}}</span>
            </p>
            <img @click="showImg(item.imgArr,idx)" :key="imgsrc"  v-for="(imgsrc,idx) in item.imgArr" v-lazy="{'src':imgsrc}">

            <!--<img v-for="(imgsrc,idx) in item.imgArr" v-lazy="{'src':imgsrc,'loading':'assets/imgs/imgload.png'}"  title="点击图片看大图">-->
            <p v-if="item.imgArr.length==0">共{{item.pjdata.length}}个配件</p>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="grid-item ">
            <p></p>
            <p :class="{'wait':item.status=='等待报价'||item.status=='询价中'}">{{item.status}}</p>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-item ">
            <p></p>
            <el-button :class="{'el-button--primary':item.status!='已报价'}" @click="toPriceDetail(item)">{{item.status == '已报价' ? '编辑' : '查看'}}</el-button>
          </div>
        </el-col>
      </el-row>
    </transition-group>
  </div>
</template>

<script>
  export default{
    props:['priceData'],
    methods:{
      showImg(arr,idx){
        this.$emit('showImg',arr,idx)
      },
      toPriceDetail(item){
        this.$emit('toPriceDetail',item)
      }
    }
  }
</script>

<style>
  .wait{
    color: #FF4949;
  }
  .grid-list {
    border-bottom: 1px solid #ccc;
    padding-bottom: 10px;
  }

  .grid-list:hover {
    background: #f8fbff;
    box-shadow: 0 2px 4px rgba(0,0,0,.12), 0 0 6px rgba(0,0,0,.04);
  }

  .grid-head {
    height: 38px;
    line-height: 38px;
    border-bottom: 1px solid #eaeefb;
    color: #5e6d82;
    margin-top: 5px;
    background: #eff2f7;
  }

  .grid-item img {
    width: 80px;
    height: 80px;
    margin-right: 10px;
    cursor: pointer;
  }
  .grid-item span{
    margin-right: 5px;
  }
  .grid-item p {
    min-height: 20px;
    line-height: 20px;
    margin-top: 10px;
  }
</style>
