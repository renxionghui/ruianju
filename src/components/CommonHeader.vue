<template>
  <div class="common-header-wrap">
    <div class="header-logo">
        <img :src="require('../assets/image/loading-bg.svg')" alt="" style="width:auto;height:100%">
    </div>
    <div class="nav-list">
      <a
        v-for="(item,index) of navList"
        :key="index"
        :href="item.url"
        class="nav-item"
        :class="{'active-nav':navIndex==index}"
      >{{item.text}}</a>
    </div>
    <div style='clear:both'></div>
  </div>
</template>
<script>
export default {
  name: "CommonHeader",
  props: {
    navIndex: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      navList: [
        {
          text: "首页",
          url: "/"
        },
        {
          text: "海外房源",
          // url: "http://www.realtoraccess.com/web/houses/"
          url: "/house.html"
        },
        {
          text: "经纪门户",
          // url: "http://www.realtoraccess.com/web/agentlist/"
          url: "/agenthome.html"
        },
        {
          text: "房价走势",
          url: "http://www.realtoraccess.com/web/van/"
        },
        {
          text: "全球资讯",
          url: "http://www.realtoraccess.com/news/list/"
        }
      ]
    };
  }
};
</script>
<style lang="less" scope>
@import url("../assets/css/base.less");
.common-header-wrap {
    padding: 1.6vw 0;
  .header-logo{
      height: 2.6vw;
      float: left;
  }
  .nav-list{
      height: 2.6vw;
      float: right;
      line-height: 2.6vw;
      .large;
      .nav-item{
        font-size:1.3vw;
        margin: 1vw;
        line-height: 2em;
        .primaryText;
      }

      .active-nav{
          border-bottom:3px solid @themeColor;
      }
      
  }
}
</style>