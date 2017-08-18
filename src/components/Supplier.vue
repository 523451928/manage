<template>
  <div class="order">
    <el-row :gutter="8">
      <el-col :span="4">
        <div class="grid-content ">
          <el-input v-model="supId" placeholder="输入供应商ID">
            <template slot="prepend"> 供应商ID</template>
          </el-input>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="grid-content ">
          <el-input v-model="supName" placeholder="请输入供应商名称">
            <template slot="prepend"> 供应商名称</template>
          </el-input>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="grid-content ">
          <el-input v-model="carType" placeholder="请输入车型品牌">
            <template slot="prepend"> 车型品牌</template>
          </el-input>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content ">
          <el-row>
            <el-col :span="4" class="label">公司</el-col>
            <el-col :span="20">
              <el-select v-model="company" placeholder="请选择区域公司">
                <el-option
                  v-for="item in companyOptions"
                  :key="item.value"
                  :label="item.text"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content ">
          <div>
            <el-col :span="5" class="label">状态</el-col>
            <el-col :span="19">
              <el-select v-model="status" placeholder="请选择状态">
                <el-option
                  v-for="item in stateOptions"
                  :key="item.value"
                  :label="item.text"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-col>
          </div>
        </div>
      </el-col>
      <el-col :span="2">
        <div class="grid-content ">
          <el-button type="primary" size="small" @click="getData">查询</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row >
      <el-col :span="2">
        <div class="grid-head ">ID</div>
      </el-col>
      <el-col :span="3">
        <div class="grid-head ">供应商名称</div>
      </el-col>
      <el-col :span="4">
        <div class="grid-head ">联系方式</div>
      </el-col>
      <el-col :span="3">
        <div class="grid-head ">车型品牌</div>
      </el-col>
      <el-col :span="4">
        <div class="grid-head ">所在区域</div>
      </el-col>
      <el-col :span="3">
        <div class="grid-head ">区域公司</div>
      </el-col>
      <el-col :span="2">
        <div class="grid-head ">状态</div>
      </el-col>
      <el-col :span="3">
        <div class="grid-head ">操作</div>
      </el-col>
    </el-row>
    <div v-loading="isLoading" element-loading-text="拼命加载中" >
      <el-row v-for="(item,index) in supplierObj.list" class="grid-list" :key="item" >
        <el-col :span="2">
          <div>{{item.supid}}</div>
        </el-col>
        <el-col :span="3">
          <div >{{item.supplirename}}</div>
        </el-col>
        <el-col :span="4">
          <div >{{item.supname}} / {{item.suptel}}</div>
        </el-col>
        <el-col :span="3">
          <div ><span class="cartype" v-for="(type,idx) in item.vehicletype">{{type.availablevehicle}}</span></div>
        </el-col>
        <el-col :span="4">
          <div >{{item.deliveryaddress}}</div>
        </el-col>
        <el-col :span="3">
          <div>{{item.company}}</div>
        </el-col>
        <el-col :span="2">
          <div class="success" :class="{'danger':item.status=='禁用'}">{{item.status}}</div>
        </el-col>
        <el-col :span="3">
          <div class="edit">
            <span @click="toDetail(item)">修改</span>
            <span class="success" :class="{'danger':item.status!='禁用'}" @click="toggleStatus(item)">{{item.status=='禁用'?'启用':'禁用'}}</span>
          </div>
        </el-col>
      </el-row>
      <el-pagination
        layout="prev, pager, next,jumper,total"
        @current-change="getData"
        :total="supplierObj.total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import ElRow from "element-ui/packages/row/src/row";
  import ElCol from "element-ui/packages/col/src/col";
  import {mapMutations} from 'vuex'
  export default {
    components: {
      ElCol,
      ElRow
    },
    data () {
      return {
        isLoading: false,
        supplierObj:{},
        supId: "",
        supName: "",
        company: "",
        carType: "",
        status: "",
        pageNum:1,
        stateOptions: [{
            value: 'all',
            text: '全部'
          },{
          value: 'disabled',
          text: '禁用'
        }, {
          value: 'usable',
          text: '可用'
        }],
        companyOptions: [
          {
            "value": "浙江省公司",
            "text": "浙江省公司"
          },
          {
            "value": "上海省公司",
            "text": "上海省公司"
          },
          {
            "value": "川渝省公司",
            "text": "川渝省公司"
          },
          {
            "value": "广东省公司",
            "text": "广东省公司"
          },
          {
            "value": "湖北省公司",
            "text": "湖北省公司"
          },
          {
            "value": "湖南省公司",
            "text": "湖南省公司"
          },
          {
            "value": "江苏省公司",
            "text": "江苏省公司"
          },
          {
            "value": "辽宁省公司",
            "text": "辽宁省公司"
          },
          {
            "value": "山东省公司",
            "text": "山东省公司"
          },
          {
            "value": "北京省公司",
            "text": "北京省公司"
          },
          {
            "value": "西北省公司",
            "text": "西北省公司"
          }
        ]
      }
    },
    methods: {
      ...mapMutations(
          ['setSupplierDetail']
      ),
      toDetail(data){
        console.log(data)
        this.setSupplierDetail(data)
        this.$router.push({
          path: '/supplier/detail',
          query:{'supid':data.supid}
        })
      },
      toggleStatus(data){
        console.log(data)
        if(data.status=='禁用'){
           data.status='可用'
        }else{
            data.status='禁用'
        }
//        this.$http.post('',{
//
//        }).then((res)=>{
//
//        })
      },
      getData(num){
        if(typeof(num)=='number'){
          this.pageNum=num
        }
        this.isLoading=true
        this.$http.post('/supplier',{
          supid:this.supId,
          supname:this.supName,
          company:this.company,
          pagenum:this.pageNum,
          cartype:this.carType,
          status:this.status
        }).then((res)=>{
          this.supplierObj=JSON.parse(res.body)
          this.isLoading=false
        })
      }
    },
    mounted(){
//      this.$http.post('/company',{
//      }).then((res)=>{
//         this.companyOptions=JSON.parse(res.body)
//      })
      this.getData()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .success{
    color: #13CE66;
  }
  .danger{
    color: #FF4949;
  }
  .cartype{
    margin-right: 5px;
  }
  .edit :first-child{
    margin-right: 10px;
    user-select: none;
    cursor: pointer;
    color: #20A0FF;
  }
  .edit :last-child{
    margin-right: 10px;
    user-select: none;
    cursor: pointer;
    color: #58B7FF;
  }
  /*.edit .success{*/
    /*color: #13CE66;*/
  /*}*/
  /*.edit .danger{*/
    /*color: #FF4949;*/
  /*}*/
  .order{
    margin-top: 20px;
  }
  .grid-list {
    border-bottom: 1px solid #ccc;
    padding: 15px 0;
  }
  .el-pagination {
    text-align: center;
    margin: 10px 0;
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
    margin-top: 15px;
    background: #eff2f7;
  }
  .label {
    height: 36px;
    line-height: 36px;
  }
</style>
