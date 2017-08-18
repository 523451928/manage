<template>
  <div class="seeting-detail">
    <el-row class="">
      <el-col :span="6">
        <div class=" ">&nbsp;</div>
      </el-col>
      <el-col :span="12">
        <div class=" ">
          <div class=" "><h2>账号信息</h2></div>
          <el-row class="info-item">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
              <el-form-item label="账号" prop="account">
                <el-row>
                  <el-col :span="10"><el-input v-model="ruleForm.account" auto-complete="off"></el-input></el-col>
                  <el-col :span="14"><div class="tips">用于日常帐号登陆使用，仅限字母数字</div></el-col>
                </el-row>
              </el-form-item>
              <el-form-item label="密码" prop="pass">
                <el-row>
                  <el-col :span="10"><el-input v-model="ruleForm.pass" auto-complete="off"></el-input></el-col>
                  <el-col :span="14"><div class="tips">账号的登录密码，不少于六位</div></el-col>
                </el-row>
              </el-form-item>
              <el-form-item label="姓名" prop="username">
                <el-row>
                  <el-col :span="10"><el-input v-model="ruleForm.username" auto-complete="off"></el-input></el-col>
                  <el-col :span="14"><div class="tips">账号所属员工的真实姓名</div></el-col>
                </el-row>
              </el-form-item>
              <el-form-item label="联系电话" prop="usertell">
                <el-row>
                  <el-col :span="10"><el-input v-model="ruleForm.usertell" auto-complete="off"></el-input></el-col>
                  <el-col :span="14"><div class="tips">账号所属员工的手机号码</div></el-col>
                </el-row>
              </el-form-item>
              <el-form-item label="所在省市" >
                <el-row :gutter="5">
                  <el-col :span="6">
                    <el-form-item prop="province" >
                      <el-select v-model="ruleForm.province" @change="getCity" placeholder="请选择" >
                        <el-option
                          v-for="item in provinceOptions"
                          :key="item.code"
                          :label="item.province"
                          :value="item.code">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item prop="city">
                      <el-select v-model="ruleForm.city"  placeholder="请选择" required>
                        <el-option
                          v-for="item in cityOptions"
                          :key="item.code"
                          :label="item.city"
                          :value="item.city">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10"><div class="tips">选择账号所属员工所在的省市</div></el-col>
                </el-row>
              </el-form-item>
              <el-form-item label="区域公司" >
                <el-row>
                  <el-col :span="10">
                    <el-form-item prop="company">
                      <el-select v-model="ruleForm.company" placeholder="请选择" required>
                        <el-option
                          v-for="item in companyOptions"
                          :key="item.value"
                          :label="item.text"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="14"><div class="tips">选择此帐号所属的区域公司</div></el-col>
                </el-row>
              </el-form-item>
              <el-form-item label="角色" >
                <el-row>
                  <el-col :span="10">
                    <el-form-item prop="role">
                      <el-select v-model="ruleForm.rule" placeholder="请选择"  >
                        <el-option
                          v-for="item in ruleOptions"
                          :key="item.value"
                          :label="item.text"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="14"><div class="tip">管理员可以管理员工账号，普通员工仅能处理询报价、订单及供应商信息</div></el-col>
                </el-row>
              </el-form-item>
              <el-form-item label="状态" >
                <el-row>
                  <el-col :span="10">
                    <el-select v-model="ruleForm.status" placeholder="请选择">
                      <el-option
                        v-for="item in stateOptions"
                        :key="item.value"
                        :label="item.text"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="14"><div class="tips">禁用状态下无法登录使用</div></el-col>
                </el-row>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
              </el-form-item>
            </el-form>
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
  import {mapState,mapMutations} from "vuex"
  import ElRow from "element-ui/packages/row/src/row";
  import ElCol from "element-ui/packages/col/src/col";
  export default{
    components: {
      ElCol,
      ElRow
    },
    data(){
      var checkAccount= (rule,value,callback)=>{
          if (value === '') {
            callback(new Error('请输入账号'));
          }else if(!/^[0-9a-zA-Z]*$/.test(value)){
            callback(new Error('账号只能包含数字和字母'));
          } else{
            callback()
          }
      }
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if(!/^\w+$/.test(value)){
          callback(new Error('账号只能包含数字和字母'));
        } else if(value.length<6){
          callback(new Error('密码不能小于6位'));
        }
      };
      var checkName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入姓名'));
        }
      };
      var checkTell= (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入手机号码'));
        }else if(!/^1\d{10}$/.test(value)){
          callback(new Error('请输入正确的手机号码'));
        }
      };
      return {
        provinceOptions:[],
        cityOptions:[],
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
        ruleOptions:[
          {
            "value": "管理员",
            "text": "管理员"
          },
          {
            "value": "普通员工",
            "text": "普通员工"
          }
        ],
        stateOptions:[
          {
            "value": "禁用",
            "text": "禁用"
          },
          {
            "value": "可用",
            "text": "可用"
          }
        ],
        ruleForm: {
          pass: '',
          account:'',
          username:'',
          usertell:'',
          province:"",
          city:"",
          rule:'普通员工',
          company:'',
          status:'启用'
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          account:[
            { validator: checkAccount, trigger: 'blur' }
          ],
          username:[
            {validator:checkName,trigger:'blur'}
          ],
          usertell:[
            {validator:checkTell,trigger:'blur'}
          ],
          province:[
            { required: true, message: '请选择省份', trigger: 'change' }
          ],
          city:[
            { required: true, message: '请选择市', trigger: 'change' }
          ],
          company:[
            { required: true, message: '请选择公司', trigger: 'change' }
          ],
          role:[
            { required: true, message: '请选择角色', trigger: 'change' }
          ]
        }
      }
    },
    computed:{
      ...mapState(
          ['settingDetail']
      )
    },
    methods:{
      ...mapMutations(
          ['setFirstMenu','setSecondMenu']
      ),
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {})
        if(!/^[0-9a-zA-Z]*$/.test(this.ruleForm.account)){
            return false
        }
        if(!/^\w+$/.test(this.ruleForm.pass) || this.ruleForm.pass.length<6){
            return false
        }
        if(!/^1\d{10}$/.test(this.ruleForm.usertell)){
            return false
        }
        if(!this.ruleForm.rule){
            return false
        }
        for(var key in this.ruleForm){
            console.log(key)
           if(!this.ruleForm[key]){
               return
           }
        }
        this.provinceOptions.forEach((item)=>{
            if(item.code==this.ruleForm.province){
                this.ruleForm.province=item.province
            }
        })
        console.log(this.ruleForm)
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        if(this.$route.query.userid!="0"){
          this.$http.post('/user',{
            userid:this.$route.query.userid
          }).then((res)=>{
            this.ruleForm=JSON.parse(res.body)
          })
        }else{
          this.ruleForm= {
            pass: '',
            account:'',
            username:'',
            usertell:'',
            province:"",
            city:"",
            rule:'普通员工',
            company:'',
            status:'启用'
          }
        }
      },
      getCity(val){
        var value
        if(isNaN(parseInt(val))){
          setTimeout(()=>{
            this.provinceOptions.forEach((item)=>{
              if(item.province==val){
                value=item.code
              }
            })
            this.$http.post('/city',{
              'code':value
            }).then((res)=>{
              this.cityOptions=JSON.parse(res.body)
            })
          },100)
        }else{
          console.log(1)
          value=val
          this.$http.post('/city',{
            'code':value
          }).then((res)=>{
            this.cityOptions=JSON.parse(res.body)
          })
        }

      }
    },
    mounted(){
      this.setFirstMenu("用户管理")
      if(this.$route.query.userid!="0"){
        console.log(this.$route.query.userid)
        this.$http.post('/user',{
          userid:this.$route.query.userid
        }).then((res)=>{
          this.ruleForm=JSON.parse(res.body)
        })
        this.setSecondMenu("修改账号")
      }else{
        this.setSecondMenu("新增账号")
      }
//      this.$http.post('/company').then((res)=>{
//          this.companyOptions=JSON.parse(res.body)
//      })
      this.$http.post('/province').then((res)=>{
        this.provinceOptions=JSON.parse(res.body)
      })
    }
  }
</script>

<style>
  h2{
    display: inline-block;
    font-weight: bold;
    font-size: 16px;
    border-left: 4px solid #20a0ff;
    padding: 5px 10px;
  }
  .tips{
    line-height: 36px;
    text-indent: 20px;
    color: #666666;
  }
  .tip{
    line-height: 20px;
    margin-left: 20px;
    color: #666666;
  }
  .seeting-detail{
    margin-top: 20px;
  }
</style>
