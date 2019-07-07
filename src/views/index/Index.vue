<template>
  <div id="index">
    <!-- 头部 -->
    <el-row class="index-header" align="middle" type="flex">
      <el-col :md="3" :sm="4" :xs="8" :offset="3" style="display:flex;align-items:center">
        <el-image :src="logoUrl" style="width:100%;height:auto"></el-image>
      </el-col>
      <el-col :md="10" :sm="8" :offset="8" class="hidden-sm-and-down">
        <a
          v-for="(item,index) of navList"
          :key="index"
          :href="item.url"
          class="nav-item"
        >{{item.text}}</a>
      </el-col>
      <el-col class="hidden-sm-and-up show-more" :xs="2" :offset="12">
        <el-dropdown  placement="bottom-end" trigger="click">
          <i class="el-icon-more"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="(item,index) of navList" :key="index">
              <a :key="index" :href="item.url" class="dropdown-item">{{item.text}}</a>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
    <!-- 大轮播图 -->
    <div class="index-banner">
      <el-image :src="bannerUrl" style="width:100%;height:auto"></el-image>
    </div>
    <!-- 数据 -->
    <div class="index-data">
      <el-card shadow="hover" :body-style="{width:'12vw',height:'12vw'}"></el-card>
      <el-card shadow="hover" :body-style="{width:'12vw',height:'12vw'}"></el-card>
      <el-card shadow="hover" :body-style="{width:'12vw',height:'12vw'}"></el-card>
    </div>
    <!-- 经纪人轮播图 -->
    <div class="index-banner-middleman">
      <el-carousel :interval="3000" type="card" height="20vw">
        <el-carousel-item v-for="item in middlemanBanner" :key="item">
          <el-card :body-style="{width:'32vw',height:'12vw'}">{{item}}</el-card>
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- 原因 -->
    <div class="index-why-middleman">
      <div class="why-header">
        <span>为何</span>要找专业的海外置业顾问?
      </div>
      <div class="why-reason">
        <div class="reason-item">
          <img :src="avatarUrl" alt />
          <p>文案专家</p>
        </div>
        <div class="reason-item">
          <img :src="avatarUrl" alt />
          <p>市场营销</p>
        </div>
        <div class="reason-item">
          <img :src="avatarUrl" alt />
          <p>挂牌定价</p>
        </div>
        <div class="reason-item">
          <img :src="avatarUrl" alt />
          <p>谈判专家</p>
        </div>
        <div class="reason-item">
          <img :src="avatarUrl" alt />
          <p>省时省力</p>
        </div>
      </div>
      <div class="check-list">
        <a href="1111">查看完整海外置业顾问名单>></a>
      </div>
    </div>
    <!-- 推荐 -->
    <div class="index-recommend">
      <div class="recommend-header">海外房产经纪推荐房源</div>
      <el-row type="flex" class="recommend-list" justify="center">
        <el-col :span="20">
          <el-row :gutter="12">
            <el-col :span="6" class="recommend-item">
              <el-card :body-style="{padding:'0px'}" shadow="hover">
                <img :src="recommendUrl" alt style="width:100%;height:auto" />
              </el-card>
            </el-col>
            <el-col :span="6" class="recommend-item">
              <el-card :body-style="{padding:'0px'}" shadow="hover">
                <img :src="recommendUrl" alt style="width:100%;height:auto" />
              </el-card>
            </el-col>
            <el-col :span="6" class="recommend-item">
              <el-card :body-style="{padding:'0px'}" shadow="hover">
                <img :src="recommendUrl" alt style="width:100%;height:auto" />
              </el-card>
            </el-col>
            <el-col :span="6" class="recommend-item">
              <el-card :body-style="{padding:'0px'}" shadow="hover">
                <img :src="recommendUrl" alt style="width:100%;height:auto" />
              </el-card>
            </el-col>
          </el-row>

          <el-row :gutter="12" style="margin-top:12px">
            <el-col :span="6" class="recommend-item">
              <el-card :body-style="{padding:'0px'}" shadow="hover">
                <img :src="recommendUrl" alt style="width:100%;height:auto" />
              </el-card>
            </el-col>
            <el-col :span="6" class="recommend-item">
              <el-card :body-style="{padding:'0px'}" shadow="hover">
                <img :src="recommendUrl" alt style="width:100%;height:auto" />
              </el-card>
            </el-col>
            <el-col :span="6" class="recommend-item">
              <el-card :body-style="{padding:'0px'}" shadow="hover">
                <img :src="recommendUrl" alt style="width:100%;height:auto" />
              </el-card>
            </el-col>
            <el-col :span="6" class="recommend-item">
              <el-card :body-style="{padding:'0px'}" shadow="hover">
                <img :src="recommendUrl" alt style="width:100%;height:auto" />
              </el-card>
            </el-col>
          </el-row>
        </el-col>
      </el-row>

      <span class="recommend-button">查看更多</span>
    </div>
    <!-- 描述 -->
    <div class="index-describe">
      <div class="describe-header">海外瑞安居 - 海外房展第一门户</div>
      <div
        class="describe-base"
      >海外瑞安居(简称“瑞安居”，RealtorAccess)，面向全球华人买家和买家，提供最及时的房产投资资讯、最高 效的房源推广展示以及最专业的房产经纪人推荐。除MLS房源信息外，更汇集了学区房、楼花暗盘、商业地产以及 潜力投资房源信息，让全球华人可以查询海外主要城市房价、实时跟踪海外房源价格走势，确保房产投资回报。平 台集成视频、3D、户型图以及房源照片等房源详情信息，通过地图方式全面动态展示最新公众开放日信息。海外 华人卖家选择海外瑞安居进行线上挂盘，平台将为您匹配最专业的房产经纪人，无论您身在何方，都有专人为您提 供专属定制营销推广服务，您的房产挂牌信息可直达海外房产投资的潜力买家，实现快速高效售房。海外瑞安居是 全球海外房产投资者进行海外房产置业投资的不二选择。</div>
      <div class="know-more">
        <a href>了解更多>></a>
      </div>
    </div>
    <!-- 更多房源 -->
    <div class="index-morehouse">
      <div class="common-title">更多房源</div>
      <div class="common-subtitle">商业地产，房产信托以及开发商新盘</div>
      <el-row :gutter="12" style="margin-top:4vw">
        <el-col :span="8">
          <img :src="houseUrl" alt style="width:100%;height:auto" />
        </el-col>
        <el-col :span="8">
          <img :src="houseUrl" alt style="width:100%;height:auto" />
        </el-col>
        <el-col :span="8">
          <img :src="houseUrl" alt style="width:100%;height:auto" />
        </el-col>
      </el-row>
    </div>
    <!-- 相关阅读 -->
    <div class="index-reading">
      <div class="common-title">相关阅读</div>
      <div class="common-subtitle">100+实力媒体跟踪报道，13大行业资质权威服务保障</div>
      <el-row type="flex" justify="center" :gutter="64" style="margin-top:4vw">
        <el-col :span="8">
          <el-card :body-style="{padding:'0px'}" shadow="hover" class="reading-item">
            <img :src="readingUrl" alt style="width:100%;height:auto" />
            <p>现在起，申请来加拿大工作，政府承诺2周内 批给工作签证</p>
            <span>查看更多</span>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card :body-style="{padding:'0px'}" shadow="hover" class="reading-item">
            <img :src="readingUrl" alt style="width:100%;height:auto" />
            <p class="re">现在起，申请来加拿大工作，政府承诺2周内 批给工作签证</p>
            <span>查看更多</span>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import logo from "../../assets/image/logo.png";
import banner from "../../assets/image/banner.png";
import avatar from "../../assets/image/avatar.png";
import recommend from "../../assets/image/recommend.png";
import house from "../../assets/image/house.png";
import reading from "../../assets/image/reading.png";
export default {
  name: "Index",
  data() {
    return {
      navList: [
        {
          text: "首页",
          url: "/"
        },
        {
          text: "最新房源",
          url: "/house.html"
        },
        {
          text: "经济门户",
          url: "/middleman.html"
        },
        {
          text: "房价走势",
          url: "/"
        },
        {
          text: "全球资讯",
          url: "/"
        }
      ],
      logoUrl: logo,
      bannerUrl: banner,
      avatarUrl: avatar,
      recommendUrl: recommend,
      houseUrl: house,
      readingUrl: reading,
      middlemanBanner: [1, 2, 3, 4, 5, 6]
    };
  }
};
</script>
<style lang="less" scoped>
@import url("../../assets/css/base.less");
#index {
  width: 100vw;
}
@vw100: 100vw;
//图片基本路径
@image: "../../assets/image";
//头部
.index-header {
  //导航
  .nav-item {
    .primaryText;
    line-height: 100%;
    &:nth-child(1) {
      border-bottom: 2px solid @themeColor;
    }
    & + .nav-item {
      margin-left: 24px;
    }
  }

  .dropdown-item{
    .primaryText;
  }

  .show-more {
    .regularText;
  }
}

.index-banner {
  height: @vw100 / 2.4;
}

//数据
.index-data {
  .flex;
  .bgLight;
  justify-content: space-around;
  padding: 6vw 0;
}
//经纪人banner
.index-banner-middleman {
  padding: 6vw 0;
}
//为何顾问
.index-why-middleman {
  .bgLight;
  padding: 4vw 12vw;

  .why-header {
    .flex;
    .primaryText;
    .boldText;
    .large;
    line-height: 48px;
    span {
      height: 48px;
      border-bottom: 4px solid @themeColor;
    }
  }
  .why-reason {
    .flex;
    padding: 2vw 0;
    justify-content: space-between;

    .reason-item {
      width: 10%;

      img {
        width: 100%;
        height: auto;
        border-radius: 50%;
      }

      p {
        .base;
        .regularText;
        line-height: 32px;
        text-align: center;
      }
    }
  }

  .check-list {
    .flex;
    justify-content: center;
    text-align: center;
    a {
      .base;
      .boldText;
      color: @themeColor;
      border-bottom: 2px solid @themeColor;
    }
  }
}

//推荐
.index-recommend {
  padding: 4vw 0;
  text-align: center;

  .recommend-header {
    .extraLarge;
    .boldText;
  }
  .recommend-list {
    margin: 4vw 0;

    .recommend-item {
      img {
        display: block;
      }
      &:hover {
        filter: blur(1px);
      }
    }
  }

  .recommend-button {
    .whiteText;
    .base;
    background-color: @themeColor;
    border-radius: 6px;
    padding: 8px 24px;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
}

//介绍
.index-describe {
  .bgLight;
  padding: 6vw 8vw;

  .describe-header {
    .extraLarge;
    .boldText;
  }

  .describe-base {
    .base;
    .regularText;
    margin: 24px 0;
  }

  .know-more {
    a {
      color: @themeColor;
      .base;
      .boldText;
    }
  }
}

//更多房源
.index-morehouse {
  padding: 6vw 0;
}

//相关阅读
.index-reading {
  .bgLight;
  padding: 6vw 0;

  .reading-item {
    background-color: @white;
    padding-bottom: 24px;

    p {
      padding: 12px;
    }

    span {
      .small;
      color: @themeColor;
      cursor: pointer;
      border: 1px solid @themeColor;
      padding: 4px 12px;
      border-radius: 4px;
      margin-left: 12px;
      &:hover {
        opacity: 0.8;
      }
    }
  }
}

.common-title {
  .extraLarge;
  .boldText;
  .flex;
  justify-content: center;
  align-items: center;
  &::before {
    content: "";
    width: 48px;
    height: 4px;
    margin-right: 12px;
    background-color: @black;
  }

  &::after {
    content: "";
    width: 48px;
    height: 4px;
    margin-left: 12px;
    background-color: @black;
  }
}

.common-subtitle {
  .medium;
  .regularText;
  text-align: center;
  line-height: 48px;
}
</style>