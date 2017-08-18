<template>
  <div class="supplier-detail">
    <el-row >
      <el-col :span="6">
        <div class=" ">&nbsp;</div>
      </el-col>
      <el-col :span="12">
        <div class=" "><h2>账号信息</h2></div>
        <el-row class="info-item">
          <el-col :span="4">供应商ID：</el-col>
          <el-col :span="16">{{supplierDetail.supid}}</el-col>
        </el-row>
        <el-row class="info-item">
          <el-col :span="4">供应商名称：</el-col>
          <el-col :span="16">{{supplierDetail.supplirename}}</el-col>
        </el-row>
        <el-row class="info-item">
          <el-col :span="4">联系人：</el-col>
          <el-col :span="16">{{supplierDetail.supname}}</el-col>
        </el-row>
        <el-row class="info-item">
          <el-col :span="4">联系电话：</el-col>
          <el-col :span="16">{{supplierDetail.suptel}}</el-col>
        </el-row>
        <el-row class="info-item">
          <el-col :span="4">所在省市：</el-col>
          <el-col :span="16">{{supplierDetail.deliveryaddress}}</el-col>
        </el-row>
        <el-row class="info-item">
          <el-col :span="4">区域公司：</el-col>
          <el-col :span="16">{{supplierDetail.company}}</el-col>
        </el-row>
      </el-col>
      <el-col :span="6">
        <div class=" ">&nbsp;</div>
      </el-col>
    </el-row>
    <el-row class="sup-item">
      <el-col :span="6">
        <div class=" ">&nbsp;</div>
      </el-col>
      <el-col :span="12">
        <div class=" ">
          <div class=" "><h2>询报价系统可用状态</h2><span class="tip">（仅控制本系统使用，不影响网站供应商状态）</span></div>
          <el-row class="info-item">
            <el-col :span="4">状态：</el-col>
            <el-col :span="16">
              <el-select v-model="state" placeholder="请选择">
                <el-option
                  v-for="item in stateOptions"
                  :key="item.text"
                  :label="item.text"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="6">
        <div class=" ">&nbsp;</div>
      </el-col>
    </el-row>
    <el-row class="sup-item">
      <el-col :span="6">
        <div class=" ">&nbsp;</div>
      </el-col>
      <el-col :span="12">
        <div class=" ">
          <div class=" "><h2>可用车型</h2></div>
          <transition-group name="fade" tag="div">
            <el-row class="info-item" v-for="(car,index) in initCartype" :key="car.cartype">
              <el-col :span="4">可供车型{{index+1}}：</el-col>
              <el-col :span="16">
                <el-cascader
                  :options="carOptions"
                  :show-all-levels="false"
                  filterable
                  v-model="car.cartype"
                ></el-cascader>
              </el-col>
              <el-col :span="2">
                <span class="del" @click="remvoeCar(index)"><i class="el-icon-delete"></i></span>
              </el-col>
            </el-row>
          </transition-group>
          <el-row class="info-item" >
            <el-col :span="24" class="large-btn">
              <el-button type="primary" size="small" icon="plus" @click="addCar" >新增可供车型品牌</el-button>
            </el-col>
          </el-row>
          <el-row class="btn-box">
            <el-col :span="3">
              <el-button @click="reset" >重置</el-button>
            </el-col>
            <el-col :span="3">
              <el-button type="primary" @click="save" >保存</el-button>
            </el-col>
            <el-col :span="18"> &nbsp;</el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="6">
        <div class=" ">&nbsp;</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {mapState,mapMutations} from 'vuex'
  import {removeRepeat} from '../../assets/js/removeRepeat.js'
  import {makePy} from '../../assets/js/makePy'
  import ElRow from "element-ui/packages/row/src/row";
  import ElCol from "element-ui/packages/col/src/col";
  export default{
    components: {
      ElCol,
      ElRow
    },
    data(){
      return {
        stateOptions:[
          {'text':'可用','value':'可用'},
          {'text':'禁用','value':'禁用'}
        ],
        state:'',
        initCartype:[],
        initVehicletype:[],
        carOptions:[]
      }
    },
    computed:{
      ...mapState([
          'supplierDetail'
      ]),
      cartypeArr(){
          if(this.supplierDetail.vehicletype){
            var carArr=[]
            this.supplierDetail.vehicletype.forEach((item)=>{
                carArr.push(item.availablevehicle)
            })
            return carArr
          }
      }
    },
    methods:{
      ...mapMutations(
        ['setFirstMenu','setSecondMenu','setSupplierDetail']
      ),
      reset(){
        this.initCartype=[]
        this.supplierDetail.vehicletype.split(",").forEach((item)=>{
          this.initCartype.push(
            {cartype:[makePy(item)[0].substring(0,1),item]}
          )
        })
      },
      save(){
        var formatCar=[]
        this.initCartype.forEach((item)=>{
          formatCar.push(item.cartype[1])
        })
        formatCar=removeRepeat(formatCar)
        this.supplierDetail.vehicletype=formatCar.join(',')
        var vehicleArr=[]
        for(var i=0;i<formatCar.length;i++){
          vehicleArr.push({
            "tid": "",
            "sid": "",
            "availablevehicle": formatCar[i]
          })
          for(var j=0;j<this.initVehicletype.length;j++){
            if(formatCar[i]==this.initVehicletype[j].availablevehicle){
              vehicleArr.splice(i,1)
              vehicleArr.push(this.initVehicletype[j])
            }
          }
        }
        console.log(vehicleArr)
        this.supplierDetail.status=this.state
        this.$http.post('/company',{
          supid:this.supplierDetail.supid,
          status:this.state,
          vehicletype:formatCar
        }).then((res)=>{
          this.reset()
          this.$message({
            message: '成功保存',
            type: 'success'
          });
        })
      },
      addCar(){
          this.initCartype.push({
            cartype:[]
          })
      },
      remvoeCar(index){
        this.initCartype.splice(index,1)
        var arr=[]
        this.initCartype.forEach((item)=>{
          arr.push(item.cartype[1])
        })
//        this.$http.post('/company',{
//          status:this.state,
//          vehicletype:this.supplierDetail.vehicletype
//        }).then((res)=>{
//          this.supplierDetail.vehicletype=arr.join(',')
//          this.$message({
//            message: '成功删除',
//            type: 'success'
//          });
//        })
      }
    },
    mounted(){
      this.setFirstMenu('供应商管理')
      this.setSecondMenu('供应商详情修改')
      this.state=this.supplierDetail.status
      if(!this.supplierDetail.supid&&this.$route.query.supid){
//        this.$router.push({
//          path: '/supplier'
//        })
        this.$http.post('/supplierDetail',{
            supid:this.$route.query.supid
        }).then((res)=>{
            this.setSupplierDetail(JSON.parse(res.body))
            this.initVehicletype=JSON.parse(res.body).vehicletype
            this.cartypeArr.forEach((item)=>{
              var pyArr=makePy(item)
              var len=0
              if(item=='长城'){
                  len=1
              }
              this.initCartype.push(
                {cartype:[pyArr[len].substring(0,1),item]}
              )
            })
            console.log(this.initCartype)
        })
      }

      this.$http.post('/carBrand').then((res)=>{
        var data=JSON.parse(res.body)
        var map={};
        var brandData=[];
        for(var i=0;i<data.length;i++){
          var di=data[i];
          if(!map[di.pym]){
            this.$set(di,'value',di.brand)
            this.$set(di,'label',di.brand)
            brandData.push({
              value:di.pym,
              label:di.pym,
              children:[di],
            });
            map[di.pym]=di;
          }else{
            for(var j=0;j<brandData.length;j++){
              var sj=brandData[j];
              if(sj.value==di.pym){
                di.value=di.brand
                di.label=di.brand
                sj.children.push(di);
                break;
              }
            }
          }
        }
        this.carOptions=brandData;
      })
      if(this.cartypeArr){
        this.cartypeArr.forEach((item)=>{
          this.initCartype.push(
            {cartype:[makePy(item)[0].substring(0,1),item]}
          )
        })
      }
    }
  }
</script>

<style>
  .fade-enter-active, .fade-leave-active {
    transition: all .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
    opacity: 0;
    transform: translateY(-20px);
  }
  .el-icon-delete{
    cursor: pointer;
  }
  .el-icon-delete:hover{
    color: #e64242;
  }
  .del{
    cursor: pointer;
  }
  .del:hover{
    color: #e64242;
  }
  .large-btn .el-button{
    width: 90%;
    margin-top: 10px;
  }
  .btn-box{
    margin-top: 40px;
  }
  .el-cascader__label{
    line-height: 40px;
  }
  .sup-item{
    margin-top: 40px;
  }
  .tip{
    color: #999;
  }
  .supplier-detail{
    margin-top: 20px;
  }
  .info-item div{
    height: 40px;
    line-height: 40px;
  }
  h2{
    display: inline-block;
    font-weight: bold;
    font-size: 16px;
    border-left: 4px solid #20a0ff;
    padding: 5px 10px;
  }
</style>
