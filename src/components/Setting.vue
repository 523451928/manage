<template>
  <div class="setting">
    <el-row :gutter="8">
      <el-col :span="4">
        <div class="grid-content ">
          <el-input v-model="account" placeholder="输入用户账号">
            <template slot="prepend"> 用户账号</template>
          </el-input>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content ">
          <el-input v-model="userName" placeholder="请输入姓名">
            <template slot="prepend"> 姓名</template>
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
          <el-row>
            <el-col :span="4" class="label">角色</el-col>
            <el-col :span="20">
              <el-select v-model="rule" placeholder="请选择角色">
                <el-option
                  v-for="item in ruleOptions"
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
              <el-select v-model="state" placeholder="请选择状态">
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
      <el-col :span="2">
        <div class="grid-content ">
          <el-button type="primary" size="small" icon="plus" @click="toDetail({'userid':0})">新增</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row >
      <el-col :span="2">
        <div class="grid-head ">ID</div>
      </el-col>
      <el-col :span="3">
        <div class="grid-head ">账号</div>
      </el-col>
      <el-col :span="3">
        <div class="grid-head ">姓名</div>
      </el-col>
      <el-col :span="3">
        <div class="grid-head ">联系电话</div>
      </el-col>
      <el-col :span="3">
        <div class="grid-head ">所在省市</div>
      </el-col>
      <el-col :span="3">
        <div class="grid-head ">区域公司</div>
      </el-col>
      <el-col :span="2">
        <div class="grid-head ">角色</div>
      </el-col>
      <el-col :span="2">
        <div class="grid-head ">状态</div>
      </el-col>
      <el-col :span="3">
        <div class="grid-head ">操作</div>
      </el-col>
    </el-row>
    <div v-if="userObj.total==0" class="no-data">暂无数据</div>
    <div v-loading="isLoading" element-loading-text="拼命加载中" >
      <el-row v-for="(item,index) in userObj.list" class="grid-list" :key="item" >
        <el-col :span="2">
          <div>{{item.userid}}</div>
        </el-col>
        <el-col :span="3">
          <div >{{item.account}}</div>
        </el-col>
        <el-col :span="3">
          <div >{{item.username}}</div>
        </el-col>
        <el-col :span="3">
          <div >{{item.usertell}}</div>
        </el-col>
        <el-col :span="3">
          <div >{{item.deliveryaddress}}</div>
        </el-col>
        <el-col :span="3">
          <div>{{item.company}}</div>
        </el-col>
        <el-col :span="2">
          <div>{{item.role}}</div>
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
        v-if="userObj.total>10"
        layout="prev, pager, next,jumper,total"
        @current-change="getData"
        :total="userObj.total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'
export default {
  data () {
    return {
      isLoading:false,
      pageNum:1,
      account:"",
      userName:"",
      companyOptions:[
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
      ],
      company:"",
      ruleOptions:[
        {
          "value":"all",
          "text":"全部"
        },
        {
          "value": "primary",
          "text": "普通员工"
        },
        {
          "value": "manager",
          "text": "管理员"
        }
      ],
      rule:"all",
      stateOptions:[
        {'text':'全部','value':'all'},
        {'text':'可用','value':'enable'},
        {'text':'禁用','value':'disable'}
      ],
      state:"all",
      userObj:{}
    }
  },
  methods:{
    ...mapMutations(
        ['setSettingDetail']
    ),
    toDetail(data){
      if(typeof(data)=='object'){
        this.setSettingDetail(data)
      }
      this.$router.push({
        path: '/setting/detail',
        query:{'userid':data.userid}
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
      this.$http.post('/userList',{
        account:this.account,
        username:this.userName,
        company:this.company,
        pagenum:this.pageNum,
        rule:this.rule,
        status:this.state
      }).then((res)=>{
        this.userObj=JSON.parse(res.body)
        this.isLoading=false
      })
    },
    addUser(){

    }
  },
  mounted(){
    this.getData()
//    this.$http.post('/company').then((res)=>{
//        this.companyOptions=JSON.parse(res.body)
//    })
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
  .grid-head {
    height: 38px;
    line-height: 38px;
    border-bottom: 1px solid #eaeefb;
    color: #5e6d82;
    margin-top: 15px;
    background: #eff2f7;
  }
  .el-pagination {
    text-align: center;
    margin: 10px 0;
  }
  .order{
    margin-top: 20px;
  }
  .grid-list {
    border-bottom: 1px solid #ccc;
    padding: 15px 0;
  }
  .grid-list:hover {
    background: #f8fbff;
    box-shadow: 0 2px 4px rgba(0,0,0,.12), 0 0 6px rgba(0,0,0,.04);
  }
  .label {
    height: 36px;
    line-height: 36px;
  }
  .setting{
    margin-top: 20px;
  }
</style>
