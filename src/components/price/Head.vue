<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="7"><div class="grid-content ">
        <el-input v-model="oddNum" placeholder="请输入单号">
          <template slot="prepend"> {{textArr[0]}}:</template>
        </el-input>
      </div></el-col>
      <el-col :span="7"><div class="grid-content ">
        {{textArr[1]}}:
        <el-date-picker
          v-model="date"
          type="daterange"
          placeholder="选择日期范围">
        </el-date-picker>
      </div></el-col>
      <el-col :span="7"><div class="grid-content ">
        {{textArr[2]}}:
        <el-select v-model="type" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div></el-col>
      <el-col :span="3"><div class="grid-content ">
        <el-button type="primary"  @click="getData">查询</el-button>
      </div></el-col>
    </el-row>
  </div>
</template>

<script>
  export default{
      props:[
          'options','textArr'
      ],
      data(){
          return{
            date:'',
            oddNum:'',
            type: ''
          }
      },
      methods:{
          getData(){
              this.$emit('getData',this.date,this.type,this.oddNum)
          }
      }
  }
</script>
