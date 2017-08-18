<template>
  <div id="app" :class="{bg:!isLoginOk}">
    <!-- ******* 登录页 ******* -->
    <div v-if="!isLoginOk" class="login-box">
      <h1>HKS 配件询价系统<span>登录</span></h1>
      <el-input v-model="loginName" placeholder="请输入您的账号" autofocus></el-input>
      <el-input v-model="loginPassword" placeholder="请输入您的登录密码" type="password"></el-input>
      <el-button type="primary" @click.prevent="ajaxLogin" @keyup.enter="ajaxLogin">登录</el-button>
    </div>

    <!-- ******* 内页 ******* -->
    <div v-else>
    <header>
      <div class="header-container">
        <a href="javascript:;" class="logo">
          <img src="./assets/imgs/logo.png" />
          <span>好快省全车件报价平台</span>
        </a>
      <div class="account">
        <div class="account-info">
          <p class="login-out" @click="loginOut">退出</p>
          <p class="companyname">{{userInfo.truename}}</p>
        </div>
      </div>
        <menu class="clrfix">
          <router-link v-for="m in menu"  :to="{name: m.name}" :key="m.name"  :class="{'router-link-active':$route.path==m.path}">{{m.txt}}</router-link>
        </menu>
      </div>
    </header>

    <!-- content -->
    <div id="content">
      <p class="current-page">当前位置：<span @click="breadFn" class="bread-home">{{firstMenuActive}}</span> <span class="bread-sub" v-if="secondMenuActive"> / {{secondMenuActive}}</span></p>
      <!-- 子路由页面视图 -->
      <!--<transition>-->
        <router-view></router-view>
      <!--</transition>-->
    </div>
    </div>
  </div>
</template>

<script>
  function formatCookie(url) {
    var strs="";
    var theRequest = new Object();
    strs = url.split("&");
    for(var i = 0; i < strs.length; i ++) {
      theRequest[strs[i].split("=")[0]]=decodeURIComponent(strs[i].split("=")[1]);
    }
    return theRequest;
  }

  import {encryptDES} from './assets/js/des'
  import {readCookie} from './assets/js/readCookie'
  import {mapState,mapMutations} from 'vuex'
export default {
  name: 'app',
  data() {
    return {
      loginName:"",
      loginPassword:"",
      isLoginOk:false,        //当前登录状态：是否已成功登录（默认显示登录框，处未登录状态）
//      firstMenuActive:"报价", //当前位置：一级页面
//      secondMenuActive:"",    //当前位置：二级页面
      userInfo:{},
      menu: [
        {
          name: "price",
          path:"/price",
          txt: "询报价监督",
        }, {
          name: "order",
          path:"/order",
          txt: "订单"
        }
        , {
          name: "rule",
          path:"/rule",
          txt: "报价规则管理"
        }, {
          name: "supplier",
          path:"/supplier",
          txt: "供应商管理"
        }, {
          name: "setting",
          path:"/setting",
          txt: "用户管理"
        }
      ],
      list: ""
    }
  },
  computed:{
    ...mapState([
        'firstMenuActive','secondMenuActive','setTagName'
    ])
  },
  watch: {
    '$route'(to, from) {
      this.funSetFirstMenu(to.name)
      this.setSecondMenu('')
    }
  },
  mounted(){
    if(window.sessionStorage.getItem('isLogin')){
      this.isLoginOk = true;
    }else{
      this.isLoginOk = true;
    }
    if(readCookie('hksxbj')){
      this.userInfo=formatCookie(readCookie('hksxbj'))
    }
//    if(window.sessionStorage.getItem('userInfo')){
//        this.userInfo=JSON.parse(window.sessionStorage.getItem('userInfo'))
//    }
  },
  methods:{
    ...mapMutations([
        'setFirstMenu','setSecondMenu',''
    ]),
    breadFn(){
      switch (this.firstMenuActive) {
        case "询报价监督":
          this.$router.push({path:'/price'})
          break;
        case "订单":
          this.$router.push({path:'/order'})
          break;
        case "报价规则管理":
          this.$router.push({path:'/rule'})
          break;
        case "供应商管理":
          this.$router.push({path:'/supplier'})
          break;
        case "用户管理":
          this.$router.push({path:'/setting'})
          break;
        default:
          this.$router.push({path:'/price'})
          break;
      }
    },
    loginOut(){
//      window.sessionStorage.removeItem('isLogin')
//      window.sessionStorage.removeItem('userInfo')
      window.location.href='./login/SysLogin.aspx'
      this.setTagName('first');//恢复到默认等待报价的时候
//      this.isLoginOk = false
//      this.loginName=''
//      this.loginPassword=''
    },
    ajaxLogin() {
      //【登录】
      let verifysign = "{\"username\":\"" + this.loginName + "\",\"password\":\"" + this.loginPassword + "\"}"; //拼接用户名密码串
      verifysign = encryptDES(verifysign);
      this.$http.post("/userInfo", {
        role: "sysuser",          //参数，登录用户角色：“供应商”
        verifysign: verifysign    //参数， 加密后的用户名和密码json串
      }).then((res) => {
        //登录成功后返回登录用户信息
        if(JSON.parse(res.body).success){
          this.userInfo = JSON.parse(res.body);   //获取用户信息
          this.isLoginOk = true;    //模拟登录成功，则进入内页
          window.sessionStorage.setItem('isLogin',JSON.stringify(this.isLoginOk))
          window.sessionStorage.setItem('userInfo',JSON.stringify(this.userInfo))
        }else{
          this.$message.error(JSON.parse(res.body).msg);
        }
      })
    }
    ,
    funSetFirstMenu(routename){
      //【当前位置：一级路由对应页面标题】
       let txt;
       switch (routename) {
        case "price":
          txt = "询报价监督";
          break;
        case "order":
          txt = "订单";
          break;
        case "rule":
          txt = "报价规则管理";
          break;
       case "supplier":
         txt = "供应商管理";
         break;
       case "setting":
         txt = "用户管理";
         break;
        default:
          txt = "询报价监督";
          break;
      }
      this.setFirstMenu(txt)
    }
  }
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
  font: 14px "微软雅黑";
}

body,
html,
#app,
.content,
.menu {
  height: 100%;
}

body,
html {
  overflow-x: hidden;
}

body {
  background: #fff;
}
input:-webkit-autofill { box-shadow: 0 0 0px 1000px white inset !important;}
.bread-sub{
  color: #97a8be;
  cursor: text;
}
.bread-home{
  transition: color .15s linear;
  color: #48576a;
}
.bread-home:hover{
  color: #20a0ff;
  cursor: pointer;
}
.clrfix::after{
  content:"";
  display:block;
  clear:both;
  visibility:hidden;
  height:0;
  line-height:0;
  font-size:0;

}
.no-data{
  text-align: center;
  margin-top: 10px;
  color: #666666;
}
.flex-wrap {
  display: flex;
}

.flex-item {
  flex: 1;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

a {
  text-decoration: none;
}
.fade-enter-active, .fade-leave-active {
  transition: all .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
  opacity: 0;
}
.bg{background:#f3f5f6;}
.login-box{height:300px;width:400px;position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);}
.login-box h1{font-size:24px;font-weight:bold;color:#20a0ff;text-align:center;margin-bottom:40px;}
.login-box h1 span{color:#97a8be;font-size:15px;padding-left:10px;position:relative;top:2px;}
.login-box input{height:60px;margin-bottom:10px;font-size:16px;}
.login-box button{width:100%;margin-top:15px;height:60px;line-height:60px;padding:0;}
.login-box button span{font-size:16px;}
header {
  height: 120px;
  color: #fff;
  position: relative;
  width: 100%;
  background: #20a0ff;
}

header .header-container {
  height: 120px;
  width: 1200px;
  margin: 0 auto;
  position: relative;
}

header a.logo {
  color: #fff;
}

header a.logo img {
  float:left;
  margin: 28px 10px 10px 0;
}

header a.logo span {
  font-size: 24px;
  font-weight:bold;
  float:left;
  margin-top:61px;
  font-family: cursive;
}

header .account{float:right;padding-top:10px;}
.account-info{float:right;text-align:right;}
.account-info .name{font-size:12px;}
.account-info .companyname{font-size:15px;margin-top:20px;}
.account-headpic{float:right;width:60px;height:60px;border:1px solid #ccc;border-radius:100%;margin-left:10px;}

menu {
 position: absolute;bottom:0;right:0;
}
.login-out{
  cursor: pointer;
}
menu a {
  float: left;
  margin-left: 20px;
  padding: 5px 20px 10px;
  opacity: .8;
  font-size: 16px;
  font-weight: 400;
  color: #fff;
  position:relative;
}
menu a.router-link-active {
  opacity:1;
  font-weight:bold;
  border-color:#fff;
}
menu a.router-link-active::after{content:"";position:absolute;bottom:0;left:0;right:0;height:4px;background:#99D2FF;}

menu a:hover {
   opacity:1;
}


#content{width:1200px;margin:12px auto;}
.current-page {
  font-size: 13px;
}
</style>
