<template>
  <div id="middleman">
    <!-- 头部 -->
    <el-row class="middleman-header" align="middle" type="flex">
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
        <el-dropdown placement="bottom-end" trigger="click">
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
    <div class="middleman-banner">
      <img :src="bannerUrl" />
      <div class="banner-masker"></div>
    </div>

    <!-- 经纪人详情 -->
    <el-row class="middleman-detail">
      <el-col :md="12" :xs="24" style="text-align:center;">
        <img :src="middlemanUrl" alt />
      </el-col>
      <el-col :md="12" :xs="24">
        <div class="detail-title">
          <span>个人</span>介绍
        </div>
        <div class="detail-descript">
          We believe the way to succeed in real estate is simple – conduct yourselves ethically, hold yourselves to high standards, and above all, always do the best possible thing for your clients. This simple recipe has yielded long term agent relationships, clients for life, and a steady stream of referral business, which is all the proof we need to know that what we do, we do right...
          <a
            href
          >more>></a>
        </div>
      </el-col>
    </el-row>

    <!-- 推荐房源 -->
    <div class="middleman-recommend">
      <div :span="24" class="recommend-title">推荐房源</div>
      <el-row type="flex" justify="center" :gutter="24">
        <el-col :md="8" :xs="10">
          <img :src="middlemanUrl" width="100%" height="auto" alt />
        </el-col>
        <el-col :md="8" :xs="10">
          <img :src="middlemanUrl" width="100%" height="auto" alt />
        </el-col>
      </el-row>

      <el-row type="flex" justify="center" :gutter="24">
        <el-col :md="8" :xs="10">
          <img :src="middlemanUrl" width="100%" height="auto" alt />
        </el-col>
        <el-col :md="8" :xs="10">
          <img :src="middlemanUrl" width="100%" height="auto" alt />
        </el-col>
      </el-row>
      
    </div>
  </div>
</template>
<script>
import logo from "../../assets/image/logo.png";
import banner from "../../assets/image/banner.png";
import middleman from "../../assets/image/middleman.png";
export default {
  name: "Middleman",
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
      middlemanUrl: middleman
    };
  }
};
</script>
<style lang="less" scoped>
@import url("../../assets/css/base.less");
#middleman {
  width: 100vw;
}
@vw100: 100vw;
//图片基本路径
@image: "../../assets/image";
//头部
.middleman-header {
  //导航
  .nav-item {
    .primaryText;
    line-height: 100%;
    &:nth-child(3) {
      border-bottom: 2px solid @themeColor;
    }
    & + .nav-item {
      margin-left: 24px;
    }
  }

  .dropdown-item {
    .primaryText;
  }

  .show-more {
    .regularText;
  }
}

.middleman-banner {
  position: relative;
  img {
    width: 100%;
    height: auto;
    display: block;
  }

  .banner-masker {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.6);
  }
}

.middleman-detail {
  margin: 4vw 0;

  .detail-title {
    .boldText;
    .extraLarge;
    padding: 0 2vw 2vw;
    span {
      border-bottom: 4px solid @themeColor;
    }
  }

  .detail-descript {
    .regularText;
    .base;
    padding: 2vw;
    a {
      color: @themeColor;
      &:hover {
        opacity: 0.8;
      }
    }
  }
}

.middleman-recommend {
  .bgLight;

  .recommend-title {
    .boldText;
    .extraLarge;
    text-align: center;
    line-height: 3em;
  }
}
</style>


