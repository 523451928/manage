<template>
  <div class="rule">
    <el-row >
      <el-col :span="3">
        <div class="grid-head ">ID</div>
      </el-col>
      <el-col :span="4">
        <div class="grid-head ">报价规则名称</div>
      </el-col>
      <el-col :span="3">
        <div class="grid-head ">作用区域公司</div>
      </el-col>
      <el-col :span="2">
        <div class="grid-head ">客户类型</div>
      </el-col>
      <el-col :span="7">
        <div class="grid-head ">加价率</div>
      </el-col>
      <el-col :span="3">
        <div class="grid-head ">状态</div>
      </el-col>
      <el-col :span="2">
        <div class="grid-head ">操作</div>
      </el-col>
    </el-row>
    <div v-if="ruleObj.total==0" class="no-data">暂无数据</div>
    <div v-loading="isLoading" element-loading-text="拼命加载中" >
      <el-row v-for="(item,index) in ruleObj.list" class="grid-list" :key="item" >
        <el-col :span="3">
          <div class="">{{item.id}}</div>
        </el-col>
        <el-col :span="4">
          <div class="">{{item.name}}</div>
        </el-col>
        <el-col :span="3">
          <div class="">{{item.company}}</div>
        </el-col>
        <el-col :span="2">
          <div class="">{{item.type}}</div>
        </el-col>
        <el-col :span="7">
          <div class="rate">
            <span v-for="(key,index) in item.uprate">
              {{key.rangestart}}-{{key.rangeend}} : {{key.val | percent}} ;
            </span>
          </div>
        </el-col>
        <el-col :span="3">
          <div  class="success" :class="{'danger':item.status=='禁用'}" >{{item.status}}</div>
        </el-col>
        <el-col :span="2">
          <div class="edit" @click="toDetail(item)">
            <span>修改</span>
          </div>
        </el-col>
      </el-row>
      <el-button class="fr" type="primary" icon="plus" size="small" @click="toDetail({'id':0})">新增规则</el-button>
      <el-pagination
        v-if="ruleObj.total>10"
        layout="prev, pager, next,jumper,total"
        @current-change="getData"
        :total="ruleObj.total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import ElRow from "element-ui/packages/row/src/row";
  import ElCol from "element-ui/packages/col/src/col";
  import {mapMutations} from "vuex"
  export default {
    components: {
      ElCol,
      ElRow
    },
    data () {
      return {
        name:"",
        ruleObj:{},
        isLoading:false
      }
    },
    methods:{
      ...mapMutations(
          ['setRuleDetail']
      ),
      getData(num){
        console.log(num)
      },
      toDetail(item){
         console.log(item)
        this.setRuleDetail(item)
        this.$router.push({
          path: '/rule/detail',
          query:{'id':item.id}
        })
      }
    },
    filters:{
        percent(val){
            return val+"%"
        }
    },
    mounted(){
      this.$http.post("/offerRule").then((res)=>{
        this.ruleObj=JSON.parse(res.body)
      })
    }
  }
</script>

<style scoped>
  .fr{
    float: right;
    margin-top: 5px;
  }
  .success{
    color: #13CE66;
  }
  .danger{
    color: #FF4949;
  }
  .edit :first-child{
    margin-right: 10px;
    user-select: none;
    cursor: pointer;
    color: #20A0FF;
  }
  .rate span{
    margin-right: 5px;
  }
  .rule{
    margin-top: 10px;
  }
  .grid-head {
    height: 38px;
    line-height: 38px;
    border-bottom: 1px solid #eaeefb;
    color: #5e6d82;
    margin-top: 5px;
    background: #eff2f7;
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
</style>
