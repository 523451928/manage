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
                  :key="item.value"
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
          <el-row class="info-item" v-for="(car,index) in initCartype" :key="car">
            <el-col :span="4">可供车型{{index+1}}：</el-col>
            <el-col :span="16">
             {{car}}
            </el-col>
            <el-col :span="2">
              <span class="del" @click="remvoeCar(index)"><i class="el-icon-delete"></i></span>
            </el-col>
          </el-row>
          <el-row class="info-item" v-for="(item,index) in addCartype" :key="item">
            <el-col :span="4">可供车型{{initCartype.length+index+1}}：</el-col>
            <el-col :span="16">
              <el-cascader
                :options="carOptions"
                :show-all-levels="false"
                filterable
                v-model="item.cartype"
              ></el-cascader>
            </el-col>
            <el-col :span="2">
              <span class="del" @click="remove(index)"><i class="el-icon-delete"></i></span>
            </el-col>
          </el-row>
          <el-row class="info-item" >
            <el-col :span="24" class="large-btn">
              <el-button type="primary" size="small" icon="plus" @click="addCar" >新增可供车型品牌</el-button>
            </el-col>
          </el-row>
          <el-row class="btn-box" >
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
  import ElRow from "element-ui/packages/row/src/row";
  import ElCol from "element-ui/packages/col/src/col";
  export default{
    components: {
      ElCol,
      ElRow},
    data(){
      return {
        stateOptions:[
          {'text':'可用','value':'可用'},
          {'text':'禁用','value':'禁用'}
        ],
        state:'',
        addCartype:[],
        initCartype:[],
        carOptions:[]
      }
    },
    computed:{
      ...mapState([
          'supplierDetail'
      ]),
      cartypeArr(){
          if(this.supplierDetail.vehicletype){
            return this.supplierDetail.vehicletype.split(",")
          }
      }
    },
    methods:{
      ...mapMutations(
        ['setFirstMenu','setSecondMenu']
      ),
      reset(){
        this.initCartype=this.supplierDetail.vehicletype.split(",")
        this.addCartype=[]
      },
      save(){
        var formatCar=[]
        this.initCartype.forEach((item)=>{
          formatCar.push(item)
        })
        this.addCartype.forEach((item)=>{
          formatCar.push(item.cartype[1])
        })
        formatCar=removeRepeat(formatCar)
        console.log(formatCar)
        console.log(this.initCartype)
        this.supplierDetail.vehicletype=formatCar.join(',')
        this.initCartype=formatCar
        this.addCartype=[]
        this.$http.post('/company',{
          status:this.state,
          vehicletype:formatCar.join(',')
        }).then((res)=>{
          this.$message({
            message: '成功保存',
            type: 'success'
          });
        })
      },
      remove(index){
        this.addCartype.splice(index,1)
      },
      addCar(){
          this.addCartype.push({
            cartype:[]
          })
      },
      remvoeCar(index){
          this.initCartype.splice(index,1)
          this.supplierDetail.vehicletype=this.initCartype.join(',')
        this.$http.post('/company',{
          status:this.state,
          vehicletype:this.supplierDetail.vehicletype
        }).then((res)=>{
          this.$message({
            message: '成功删除',
            type: 'success'
          });
        })
      }
    },
    mounted(){
      this.setFirstMenu('供应商管理')
      this.setSecondMenu('供应商详情修改')
      this.initCartype=this.cartypeArr
      if(this.supplierDetail.status=='可用'){
        this.state='enable'
      }else{
        this.state='disable'
      }
      if(!this.supplierDetail.supid){
        this.$router.push({
          path: '/supplier'
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
    }
  }
</script>

<style>
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
    margin-top: 50px;
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
