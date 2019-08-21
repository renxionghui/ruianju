<template>
    <div class="index-footer">
        <div class="footer-top">
          <a href="">更多城市</a>
          <a href="">关于我们</a>
          <a href="">隐私条款</a>
          <a href="">使用条款</a>
        </div>
        <div class="footer-botto">
          ©海外瑞安居（北京）科技发展有限公司 版权所有|京ICP备17003593号
        </div>
        <img v-lazy="require('../assets/image/footer-logo.jpg')" height="64px" width="auto" alt="">
    </div>
</template>

<script>
export default {
    name:'CommonFooter'
}
</script>

<style lang="less">
@import url("../assets/css/base.less");
    //尾部
.index-footer{
  background-color: #000;
  .whiteText;
  .flex;
  .flexCenter;
  flex-direction: column;
  height: 80px;
  padding: 12px;
  position: relative;

  .footer-top{
    a{
      .small;
      .boldText;
      .whiteText;
      padding: 0 12px;
      line-height: 2em;
    }

    a+a{
      border-left:2px solid #fff;
    }
  }

  .footer-bottom{
    font-size: 14px;
  }

  img{
    position: absolute;
    top:20px;
    left: 48px;
  }
  
}
</style>