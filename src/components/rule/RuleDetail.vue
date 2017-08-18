<template>
  <div class="add-rule">
    <el-row>
      <el-col :span="6">
        <div class=" ">&nbsp;</div>
      </el-col>
      <el-col :span="12">
        <div class=" "><h2>基本信息</h2></div>
        <el-row class="form-item" v-if="ruleDetail.id">
          <el-col :span="4">ID</el-col>
          <el-col :span="16">{{ruleDetail.id}}</el-col>
        </el-row>
        <el-row class="form-item">
          <el-col :span="4">报价规则名称：</el-col>
          <el-col :span="16"><el-input :disabled="isDisable" v-model="ruleDetail.name" placeholder="请输入名称"></el-input></el-col>
        </el-row>
        <el-row class="form-item">
          <el-col :span="4">作用区域公司：</el-col>
          <el-col :span="16">
            <el-select :disabled="isDisable" v-model="ruleDetail.company" placeholder="请选择">
            <el-option
            v-for="item in companyOptions"
            :key="item.value"
            :label="item.text"
            :value="item.value">
            </el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row class="form-item">
          <el-col :span="4">客户类型：</el-col>
          <el-col :span="16">
            <el-select :disabled="isDisable"  v-model="ruleDetail.usertype" placeholder="请选择">
              <el-option
                v-for="item in customerOptions"
                :key="item.value"
                :label="item.text"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row class="form-item">
          <el-col :span="4">状态：</el-col>
          <el-col :span="16">
            <el-select :disabled="isDisable"  v-model="ruleDetail.status" placeholder="请选择">
              <el-option
                v-for="item in stateOptions"
                :key="item.value"
                :label="item.text"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <div class=" "><h2>加价率</h2></div>
        <transition-group name="tfade" tag="div">
          <el-row class="form-item" v-for="(item,index) in ruleDetail.uprate" :key="item">
          <el-col :span="18">
            <el-input-number v-model="item.rangestart" @change="handleStart(item,index)" :debounce="1000" :min="1" :max="item.rangeend"></el-input-number> --
            <el-input-number v-model="item.rangeend" @change="handleEnd(item,index)" :debounce="1000" :min="item.rangestart" :max="200000"></el-input-number>
            元
          </el-col>
          <el-col :span="4">
            <el-row>
              <el-col :span="18"><el-input v-model="item.val" @change="changeVal(item)"></el-input></el-col>
              <el-col :span="6">%</el-col>
            </el-row>
          </el-col>
          <el-col :span="2">
            <span @click="removeRange(index)"><i class="el-icon-delete"></i></span>
          </el-col>
        </el-row>
        </transition-group>
        <el-row>
          <el-button class="large-btn" type="primary"  size="small" icon="plus" @click="addRange">新增区间</el-button>
        </el-row>
        <el-row>
          <el-button @click="cancelFn">取消</el-button>
          <el-button type="primary" @click="saveFn">保存</el-button>
        </el-row>
      </el-col>
      <el-col :span="6">
        <div class=" ">&nbsp;</div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import {mapState,mapMutations} from 'vuex'
  import ElRow from "element-ui/packages/row/src/row";
  import ElCol from "element-ui/packages/col/src/col";
  import ElInput from "../../../node_modules/element-ui/packages/input/src/input";
  import ElButton from "../../../node_modules/element-ui/packages/button/src/button";
  export default {
    components: {
      ElButton,
      ElInput,
      ElCol,
      ElRow
    },
    data () {
      return {
        companyOptions:[],
        customerOptions:[
          {
            "value": "1",
            "text": "默认类型"
          },
          {
            "value": "2",
            "text": "大客户"
          },
          {
            "value": "3",
            "text": "合作店"
          }
        ],
        isDisable:true,
        stateOptions:[
          {
            "value": "禁用",
            "text": "禁用"
          },
          {
            "value": "可用",
            "text": "可用"
          }
        ]
      }
    },
    computed:{
      ...mapState(
          ['ruleDetail']
      )
    },
    methods:{
      ...mapMutations([
        "setSecondMenu","setFirstMenu","setRuleDetail"
      ]),
      cancelFn(){
          this.$router.push({
            "path":"/rule"
          })
      },
      saveFn(){
          this.customerOptions.forEach((item)=>{
              if(item.value==this.ruleDetail.usertype){
                  this.ruleDetail.type=item.text
              }
          })
          console.log(this.ruleDetail)
          if(!this.ruleDetail.name){
            this.$message.error('请填写报价名称！')
          }else if(!this.ruleDetail.company){
            this.$message.error('请选择公司！')
          }else if(!this.ruleDetail.usertype){
            this.$message.error('请选择客户类型！')
          }else if(this.ruleDetail.uprate.length==0){
            this.$message.error('请添加加价率！')
          }
      },
      handleStart(data,index){
        if(this.ruleDetail.uprate[index-1]){
          setTimeout(()=>{
            this.ruleDetail.uprate[index-1].rangeend=data.rangestart
            if(this.ruleDetail.uprate[index-1].rangestart>=data.rangestart){
              this.ruleDetail.uprate[index-1].rangestart=data.rangestart
            }
          },200)
        }
      },
      handleEnd(data,index){
        if(this.ruleDetail.uprate[index+1]){
          if(data){
            setTimeout(()=>{
              this.ruleDetail.uprate[index+1].rangestart=data.rangeend
              if(this.ruleDetail.uprate[index+1].rangeend<=data.rangeend){
                this.ruleDetail.uprate[index+1].rangeend=data.rangeend
              }
            },200)
          }
        }
      },
      removeRange(index){
        this.$confirm('确认删除吗？').then((res)=>{
            console.log(res)
          var promise= new Promise((resolve,reject)=>{
            if(res=='confirm'){
                resolve()
            }else{
                reject()
            }
          })
          promise.then(()=>{
            this.ruleDetail.uprate.splice(index,1)
            this.handleEnd(this.ruleDetail.uprate[index-1],index-1)
          },()=>{
            alert('err')
          })
        }).catch((res)=>{
            console.log(res)
        })

      },
      addRange(){
        var uprate=this.ruleDetail.uprate
        console.log(uprate)
        uprate.push({
          "rangestart":0,"rangeend":100,"val":"0","tid":""
        })
        this.handleEnd(uprate[uprate.length-2],uprate.length-2)
      },
      changeVal(item){
        if(isNaN(item.val)||item.val<0||item.val=="0"){
          item.val=1
        }
      }
    },
    mounted(){
      this.setFirstMenu("报价规则管理")
      if(!this.ruleDetail.id){
        this.setSecondMenu("新增报价规则")
        this.setRuleDetail({
          "id":"",
          "name":"",
          "company":"",
          "type":"默认类型",
          "uprate":[

          ],
          "status":"可用"
        })
      }else{
        this.setSecondMenu("修改报价规则")
      }
      console.log(this.$route.query.id)
      if(!this.ruleDetail.id && this.$route.query.id!=0){
        this.$router.push({
          path: '/rule'
        })
      }
      console.log(JSON.stringify(this.ruleDetail))
      this.$http.post("company").then((res)=>{
          this.companyOptions=JSON.parse(res.body)
      })
    }
  }
</script>

<style scoped>
  .tfade-enter-active, .tfade-leave-active {
    transition: all .5s;
  }
  .tfade-enter, .tfade-leave-to /* .tfade-leave-active in below version 2.1.8 */ {
    opacity: 0;

  }
  .tfade-leave-to{
    transform: translateY(-20px);
  }
  .el-icon-delete{
    cursor: pointer;
  }
  .el-icon-delete:hover{
    color: #e64242;
  }
  .large-btn{
    width: 100%;
    margin-bottom: 20px;
  }
  .form-item{
    margin-bottom:15px;
  }
  .form-item div{
    height: 40px;
    line-height: 40px;
  }
  .add-rule{
    margin-top: 10px;
  }
  h2{
    display: inline-block;
    font-weight: bold;
    font-size: 16px;
    border-left: 4px solid #20a0ff;
    padding: 5px 10px;
    margin: 10px 0;
  }
</style>
