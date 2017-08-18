<template>
  <div class="diff-qa">
    <div v-for="(item,index) in qaList" :key="item" class="qa-wrapper">
      <el-row class="clrfix">
        <el-row class="no-border">
          <el-col :span="1">
            <div class="grid-content "></div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple-dark">{{item.date}}</div>
          </el-col>
          <el-col :span="20">
            <div class="grid-content ">
              <p>{{item.name}}<span v-if="item.name">提问 : </span> {{item.content}}</p>
              <img v-for="(src,idx) in item.imgArr" :src="src" @click="showImg(item.imgArr,idx)" :key="src"  title="点击图片看大图">
            </div>
          </el-col>
        </el-row>
        <el-row class="no-border">
          <el-col :span="4">
            <div class="grid-content ">{{item.date1}}</div>
          </el-col>
          <el-col :span="20">
            <div class="grid-content ">
              <p>{{item.name1}}<span v-if="item.name1">回答 : </span>{{item.content1}}</p>
              <img v-for="(src,idx) in item.imgArr1" :src="src" @click="showImg(item.imgArr1,idx)" :key="src">
            </div>
          </el-col>
        </el-row>
      </el-row>
    </div>
  </div>
</template>

<script>
  import ElRow from "element-ui/packages/row/src/row";
  export default{
    components: {ElRow},
    props:['qaList'],
      data(){
          return {

          }
      },
      methods:{
        showImg(imgArr,idx){
            this.$emit('showImg',imgArr,idx)
        }
      }
  }
</script>

<style>
  .item .el-row .no-border{
    border-bottom: none;
    padding: 5px 0;
  }
  .qa-wrapper:hover{
    background: #f8fbff;
    box-shadow: 0 2px 4px rgba(0,0,0,.12), 0 0 6px rgba(0,0,0,.04);
  }
 .diff-qa .el-col{
   /*margin-top: 5px;*/
 }
</style>
