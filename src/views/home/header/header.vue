<template>
  <div id="headers" class="header">
    <div class="logo">
      <img src="@/assets/images/ic_logo.png" alt="">
    </div>
    <div class="title">
      <span>您好{{name}},欢迎进入报告验证识别系统！</span>
      <img src="@/assets/images/ic_header.jpg" alt="">
    </div>
  </div>
</template>

<script>
    export default {
        name: 'headers',
        data(){
            return{
                name: 'xxxx'
            }
        }
    }
</script>

<style lang="scss" scoped>
  .header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 998;
    background: #181F29;
    background: -moz-linear-gradient(-206deg, #181F29 5%, #181F29 100%);
    background: -webkit-linear-gradient(-206deg, #181F29 5%, #212531 100%);
    background: linear-gradient(-206deg, #181F29 5%, #181F29 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#24B4F5", endColorstr="#24B4F5", GradientType=1);
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    cursor: pointer;
    color: #fff;
    height: 6vh;
    background: #303437;
    box-shadow: 1px 1px 1px #2E3235;
    /*line-height: 6vh;*/

    .logo {
      float: left;
      img {
        height: 5.8vh;
        width: 12vw;
        box-shadow: 2px 3px 5px #2E3235;
      }
    }
    .title{
      color: #fff;
      float: right;
      margin-top: 8.5px;
      span {
        margin-right: 0.5vw;
        color: #D6D7D6;
      }
      img {
        border-radius: 50%;
        width: 35px;
        margin-right: 2vw;
        margin-bottom: -12px;
        box-sizing: content-box;
        border: 2px solid #A5AAAB;
      }

    }
  }
</style>
