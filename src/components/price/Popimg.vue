<template>
  <div class="pop-wrapper">
    <i class="el-icon-close" @click="closePop"></i>
    <div class="left-btn" v-if="imgarr.length>1">
      <i class="el-icon-arrow-left" @click.stop.prevent="prevFn"></i>
    </div>
    <div class="img-box" @mousedown="startFn" @mousemove="moveFn" @mouseup="endFn">
      <img :src="imgarr[imgidx]" ondragstart="return false">
    </div>
    <div class="right-btn" v-if="imgarr.length>1">
      <i class="el-icon-arrow-right" @click.stop.prevent="nextFn"></i>
    </div>
  </div>
</template>

<script>
  export default{
    props:['imgArr','imgIdx'],
    data(){
      return{
        imgarr:[],
        imgidx:''
      }
    },
    methods:{
      startFn(e){
        this.startX=e.clientX;
        this.isMouseDown=true;
      },
      moveFn(e){
        if(this.isMouseDown){
          this.disX=e.clientX-this.startX;
        }
      },
      endFn(){
        return
        if(this.imgarr.length>1)
        if(this.disX<-200){
          this.nextFn()
        }else if(this.disX>100){
            this.prevFn()
        }
        this.isMouseDown=false;
        this.startX=0;
        this.disX=0;
      },
      prevFn(){
        this.imgidx--
        if(this.imgidx<0){
          this.imgidx=this.imgarr.length-1
        }
      },
      nextFn(){
        this.imgidx++
        if(this.imgidx>=this.imgarr.length){
          this.imgidx=0
        }
      },
      closePop(){
        this.$emit('closePop')
      }
    },
    watch:{
      imgArr(val){
        this.imgarr=this.imgArr
      },
      imgIdx(){
        this.imgidx=this.imgIdx
      }
    }
  }
</script>

<style>
  .pop-wrapper{
    user-select: none;
  }
  .pop-wrapper .el-icon-close{
    position: absolute;
    right:40px;
    top:40px;
    font-size: 30px;
    cursor: pointer;
    z-index: 100;
    color: #fff;
    opacity: .6;
  }
  .pop-wrapper .el-icon-close:hover{
    opacity: 1;
  }
  .left-btn,.right-btn{
    width: 60px;
    height: 100%;
    position: absolute;
    cursor: pointer;
    top:0;
  }
  .left-btn{
    left: 20px;
  }
  .left-btn i,.right-btn i{
    position: absolute;
    top:50%;
    margin-top: -25px;
    font-size: 50px;
    color: #fff;
    opacity: .6;
  }
  .left-btn i:hover,.right-btn i:hover{
    opacity: 1;
  }
  .right-btn{
    right: 20px;
  }
  .pop-wrapper{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 100;
    height: 100%;
    background: rgba(0,0,0,0.5);
  }
  .img-box{
    max-width: 1000px;
    max-height: 400px;
    position: absolute;
    top:50%;
    left: 50%;
  }
  .img-box img{
    max-width: 100%;
    max-width: 100%;
    transform:translate(-50%,-50%);
    transition: all .5s;
    transform-origin:-1000px bottom;
  }
</style>
