<template>
  <div id="index">
    <!-- 头部 -->
    <!-- <el-row class="index-header" align="middle" type="flex">
      <el-col :md="3" :sm="4" :xs="8" :offset="3" style="display:flex;align-items:center">
        <el-image :src="logoUrl" style="width:100%;height:auto" @load="headerImageLoad"></el-image>
      </el-col>
      <el-col :md="10" :sm="17" :offset="8">
        <a
          v-for="(item,index) of navList"
          :key="index"
          :href="item.url"
          class="nav-item"
        >{{item.text}}</a>
      </el-col>
    </el-row>-->
    <div class="index-header">
      <common-header></common-header>
    </div>
    <!-- 大轮播图 -->
    <div class="index-banner">
      <el-image
        :src="require('../../assets/image/banner_bg.png')"
        @load="headerImageLoad"
        style="width:101%;height:100%;position:absolute;margin-left:-1vw"
      ></el-image>
      <!-- <div class="index-banner-desc">
        <span class="en-text">REALTOR ACCESS</span>
        <span class="zh-text">海外房展第一门户</span>
      </div>-->
    </div>
    <!-- 数据 -->
    <div class="index-data">
      <el-card
        shadow="hover"
        :body-style="{width:'16vw',height:'16vw',display:'flex',flexDirection:'column',alignItems:'center'}"
      >
        <span class="index-data-count">
          <a href="http://www.realtoraccess.com/web/van/" class="index-data-num">{{listingNum}}</a>
          <i>+</i>
        </span>
        <span class="index-data-type">新增房源</span>
        <el-button type="primary">
          <a href="http://www.realtoraccess.com/web/m/listings/#/">
            <i class="icon-home"></i>
            <span>查找房源</span>
          </a>
        </el-button>
      </el-card>
      <el-card
        shadow="hover"
        :body-style="{width:'16vw',height:'16vw',display:'flex',flexDirection:'column',alignItems:'center'}"
      >
        <span class="index-data-count">
          <a href="http://www.realtoraccess.com/web/agentlist/" class="index-data-num">{{agentNum}}</a>
          <i>+</i>
        </span>
        <span class="index-data-type">新增经纪</span>
        <el-button type="primary">
          <a href="http://www.realtoraccess.com/web/agentlist/">
            <i class="icon-organization"></i>
            <span>查找经纪</span>
          </a>
        </el-button>
      </el-card>
      <el-card
        shadow="hover"
        :body-style="{width:'16vw',height:'16vw',display:'flex',flexDirection:'column',alignItems:'center'}"
      >
        <span class="index-data-count">
          <a href class="index-data-num">{{estateNum}}</a>
          <i>+</i>
        </span>
        <span class="index-data-type">商业地产</span>
        <el-button type="primary">
          <a href>
            <i class="icon-house"></i>
            <span>查找项目</span>
          </a>
        </el-button>
      </el-card>
    </div>
    <!-- 经纪人轮播图 -->
    <div class="index-banner-middleman">
      <div class="index-banner-middleman-title font-title" style="color:#fff !important;">专业的海外置业顾问</div>
      <el-carousel :interval="5000" height="400px" arrow="always">
        <el-carousel-item v-for="(item,i) of middlemanBanner" :key="i">
          <div class="index-banner-middleman-item">
            <div class="middleman-detail" v-for="(middlemanItem,index) of item" :key="index">
              <img v-lazy="middlemanItem.img" alt class="middleman-photo" />
              <span class="middleman-auth" v-if="middlemanItem.auth==1">认证经纪</span>
              <span class="middleman-username">{{middlemanItem.username || '\ueaaa'}}</span>
              <span class="middleman-usercity">{{middlemanItem.usercity}} <span class="vl">|</span> 经纪</span>
              <span class="middleman-note">{{middlemanItem.note || '\ueaaa'}}</span>
              <div class="middleman-divider"></div>
              <div class="middleman-corp">
                <img :src="middlemanItem.wechat" alt />
                <span>{{middlemanItem.corp}}</span>
              </div>
              <a :href="`/web/agent/${middlemanItem.uid}/`" class="detail-link"></a>
              <!-- <a :href="`/agenthome.html/${middlemanItem.uid}/`" class="detail-link"></a> -->
            </div>
          </div>
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
          <img v-lazy="avator1" alt />
          <p>文案专家</p>
        </div>
        <div class="reason-item">
          <img v-lazy="avator2" alt />
          <p>市场营销</p>
        </div>
        <div class="reason-item">
          <img v-lazy="avator3" alt />
          <p>挂牌定价</p>
        </div>
        <div class="reason-item">
          <img v-lazy="avator4" alt />
          <p>谈判专家</p>
        </div>
        <div class="reason-item">
          <img v-lazy="avator5" alt />
          <p>省时省力</p>
        </div>
      </div>
      <div class="check-list">
        <a href="http://www.realtoraccess.com/web/agentlist/">查看完整海外置业顾问名单>></a>
      </div>
    </div>
    <!-- 推荐 -->
    <div class="index-recommend">
      <div class="recommend-header">
        <span class="font-title">海外房产经纪推荐房源</span>
        <div class="refresh-recommend" @click="refreshRecommend">
          <img v-lazy="require('../../assets/image/icon-refresh.svg')" alt />
          <span>换一批</span>
        </div>
      </div>
      <div class="recommend-list" v-if="recommendData.length>0">
        <div
          class="recommend-item"
          v-for="(item,index) of recommendData[recommendIndex]"
          :key="index"
          @mouseover="recommendHoverIndex = index"
          @mouseout="recommendHoverIndex = -1"
          :style="{backgroundImage:`url(${item.img})`}"
        >
          <div class="item-agent" v-show="recommendHoverIndex != index && recommendHoverIndex!=7">
            <img :src="item.head" alt />
            <div>
              <p>{{item.username}}</p>
              <p>{{item.from}}</p>
            </div>
            <span v-if="item.listingtype">{{item.listingtype}}</span>
          </div>
          <transition name="el-fade-in-linear">
            <div
              class="item-detail"
              v-show="recommendHoverIndex == index && recommendHoverIndex!=7"
            >
              <div
                class="item-detail-price"
                style="font-size:2.8vw;line-height:1.2em"
              >{{item.price}}</div>
              <div class="item-detail-addr">{{item.addr}}</div>
              <div class="item-detail-cityname">{{item.cityname}}</div>

              <div class="item-detail-housetype">{{item.housetype}}</div>
              <div class="item-detail-areas">{{item.areas}}</div>
              <div class="item-detail-roomcount">
                <span class="icon-furniture"> {{item.bashroom}}</span>
                <span class="icon-bed" style="margin-left:12px;"> {{item.bedroom}}</span>
              </div>

              <div class="item-detail-viewcount" style="margin-top:0.4vw;">
                <span style="margin-right:0.6vw; ">{{item.date}}</span>
                <span style="margin-right:0.6vw; " class="icon-eye">{{item.visit}}</span>
                <a
                  :href="item.htmlid"
                  class="item-detail-checkhouse"
                >查看房源</a>
                <!-- <a
                :href="item.mls.startsWith('r')?`/house.html/${item.mls}/`:item.htmlid"
                style="color:#fff;border:1px solid #fff;float:right;padding:4px 12px;border-radius:12px;font-size:14px;"
                >查看房源</a>-->
              </div>
            </div>
          </transition>
        </div>
        <div
          class="recommend-item"
          style="display:flex;flex-direction:column;justify-content:center;align-items:center;float:left;"
        >
          <a
            class="el-icon-plus publish-house"
            href="http://webmainland.mikecrm.com/xxMXEHu"
            target="_blank"
            style="font-weight:bold"
          ></a>
          <span style="color:#1CBB20;margin-top:12px;">发布房源</span>
        </div>
      </div>
      <div style="text-align:center">
        <a href="http://www.realtoraccess.com/web/m/listings/#/" class="recommend-button">查看更多</a>
      </div>
    </div>
    <!-- 描述 -->
    <div class="index-describe" v-lazy:background-image="require('../../assets/image/mh_bg.png')">
      <div class="describe-header font-title">海外瑞安居 - 海外房展第一门户</div>
      <div
        class="describe-base"
      >海外瑞安居（简称“瑞安居”，RealtorAccess），由加拿大<a href="http://www.refinity.ca" target="_blank" rel="nofollow">瑞福资本（Refinity Capital）</a>投资发起，面向全球华人买家和卖家，提供最及时的房产投资资讯、最高效的房源推广展示以及最专业的房产经纪人推荐。除MLS房源信息外，更汇集了学区房、楼花暗盘、商业地产以及潜力投资房源信息，让全球华人可以查询海外主要城市房价、实时跟踪海外房源价格走势，确保房产投资回报。平台集成视频、3D、户型图以及房源照片等房源详情信息，通过地图方式全面动态展示最新公众开放日信息。海外华人卖家选择海外瑞安居进行线上挂盘，平台将为您匹配最专业的房产经纪人，无论您身在何方，都有专人为您提供专属定制营销推广服务，您的房产挂牌信息可直达海外房产投资的潜力买家，实现快速高效售房。海外瑞安居是全球海外房产投资者进行海外房产置业投资的不二选择。</div>
      <div class="know-more">
        <a href="http://www.realtoraccess.com">了解更多>></a>
      </div>
    </div>
    <!-- 更多房源 -->
    <div class="index-morehouse">
      <div class="common-title font-title">
        <span>更多房源</span>
      </div>
      <div class="common-subtitle">商业地产，移民地产以及开发商新盘</div>
      <el-row style="margin-top:4vw;">
        <el-col :span="8" style="position:relative">
          <img v-lazy="house1" alt style="width:100%;height:auto" />
          <div class="morehouse-descript">
            <div class="morehouse-title">商业地产</div>
            <a href="http://www.realtoraccess.com" class="morehouse-link">了解更多</a>
          </div>
        </el-col>
        <el-col :span="8" style="position:relative">
          <img v-lazy="house2" alt style="width:100%;height:auto" />
          <div class="morehouse-descript">
            <div class="morehouse-title">移民地产</div>
            <a href="http://www.realtoraccess.com" class="morehouse-link">了解更多</a>
          </div>
        </el-col>
        <el-col :span="8" style="position:relative">
          <img v-lazy="house3" alt style="width:100%;height:auto" />
          <div class="morehouse-descript">
            <div class="morehouse-title">开发商新盘</div>
            <a href="http://www.realtoraccess.com" class="morehouse-link">了解更多</a>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 相关阅读 -->
    <div class="index-reading">
      <div class="common-title font-title">
        <span>相关阅读</span>
      </div>
      <div class="common-subtitle">100+实力媒体跟踪报道，13大行业资质权威服务保障</div>
      <el-row style="margin-top:4vw;">
        <el-col :span="8" :offset="3">
          <el-card :body-style="{padding:'0px'}" shadow="hover" class="reading-item">
            <img :src="reading1" alt style="width:100%;height:auto" />
            <p v-if="articlesData.length>1">{{articlesData[0].title}}</p>
            <a v-if="articlesData.length>1" :href="articlesData[0].url">查看更多</a>
          </el-card>
        </el-col>
        <el-col :span="8" :offset="2">
          <el-card :body-style="{padding:'0px'}" shadow="hover" class="reading-item">
            <img :src="reading2" alt style="width:100%;height:auto" />
            <p v-if="articlesData.length>1">{{articlesData[1].title}}</p>
            <a v-if="articlesData.length>1" :href="articlesData[1].url">查看更多</a>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <!-- 公司动态 -->
    <div class="index-corps" data-scroll-reveal>
      <div class="common-title font-title">
        <span>房地产经纪公司动态</span>
      </div>
      <div class="common-subtitle">扫描微信二维码，关注房地产经纪公司动态</div>
      <el-carousel :interval="3000" height="26vw" indicator-position="none">
        <el-carousel-item v-for="(item,i) of corpsData" :key="i" class="carousel-item">
          <div class="index-corps-banner-item">
            <div
              class="item-panel"
              v-for="(panelItem,index) of item"
              :key="index"
              @mouseover="corpHoverIndex=index"
              @mouseout="corpHoverIndex=-1"
            >
              <div class="panel-logo" :style="{backgroundImage:`url(${panelItem.logo})`}">
                <transition name="el-fade-in-linear">
                  <div class="panel-qrcode" v-show="corpHoverIndex == index">
                    <img :src="panelItem.qr_code" alt />
                  </div>
                </transition>
              </div>
              <p class="panel-name">{{panelItem.name}}</p>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>

      <div class="divider"></div>
    </div>

    <!-- 媒体合作 -->
    <div class="index-cooperation">
      <div class="common-title font-title">
        <span>媒体合作</span>
      </div>
      <div class="index-cooperation-list">
        <a
          class="index-cooperation-item"
          v-for="(item,index) of cooperationArray"
          :href="item.url"
          :key="index"
        >
          <div class="item-logo" v-lazy:background-image="item.logo"></div>
          <div class="item-name">{{item.name}}</div>
        </a>
      </div>
    </div>

    <!-- 公司简介 -->
    <div class="index-corp-desc">
      <img v-lazy="require('../../assets/image/corp_bg.png')" width="100%" height="auto" alt />

      <div class="desc-wrap">
        <div class="desc-left">
          <div class="desc-header font-title">海外瑞安居 - 海外房展第一门户</div>
          <div
            class="desc-base"
          >海外瑞安居（简称“瑞安居”，RealtorAccess），由加拿大<a href="http://www.refinity.ca" target="_blank" rel="nofollow">瑞福资本（Refinity Capital）</a>投资发起，面向全球华人买家和卖家，提供最及时的房产投资资讯、最高效的房源推广展示以及最专业的房产经纪人推荐。除MLS房源信息外，更汇集了学区房、楼花暗盘、商业地产以及潜力投资房源信息，让全球华人可以查询海外主要城市房价、实时跟踪海外房源价格走势，确保房产投资回报。平台集成视频、3D、户型图以及房源照片等房源详情信息，通过地图方式全面动态展示最新公众开放日信息。海外华人卖家选择海外瑞安居进行线上挂盘，平台将为您匹配最专业的房产经纪人，无论您身在何方，都有专人为您提供专属定制营销推广服务，您的房产挂牌信息可直达海外房产投资的潜力买家，实现快速高效售房。海外瑞安居是全球海外房产投资者进行海外房产置业投资的不二选择。</div>
          <div class="know-more">
            <a href>点击了解更多详情>></a>
          </div>
        </div>
        <div class="desc-right">
          <div class="right-tab">
            <a href>最新房源</a>
            <a href>经纪门户</a>
            <a href>房价走势</a>
            <a href>全球资讯</a>
          </div>
          <div class="right-header">关注瑞安居微信公众平台</div>
          <p>客服专线 <span class="vl">|</span> 400 877 1896</p>
          <p>营业时间 <span class="vl">|</span> 周一至周日 <span class="vl"><span class="vl">|</span></span> 9:00-17:00</p>
          <p>客服邮箱 <span class="vl">|</span> info@realtoraccess.com</p>
          <div class="right-qrcode">
            <img v-lazy="require('../../assets/image/qrcode.png')" width="96px" height="96px" alt />
          </div>
        </div>
        <div style="clear:both"></div>
      </div>
    </div>

    <common-footer></common-footer>
  </div>
</template>
<script>
import logo from "../../assets/image/logo.png";
import banner from "../../assets/image/banner.jpg";
import avator1 from "../../assets/image/avator-1.png";
import avator2 from "../../assets/image/avator-2.png";
import avator3 from "../../assets/image/avator-3.png";
import avator4 from "../../assets/image/avator-4.png";
import avator5 from "../../assets/image/avator-5.png";
import house1 from "../../assets/image/house1.png";
import house2 from "../../assets/image/house2.png";
import house3 from "../../assets/image/house3.png";
import reading1 from "../../assets/image/reading1.png";
import reading2 from "../../assets/image/reading2.png";
import { log } from "util";
import cooperationArray from "./cooperationArray";
import CommonHeader from "../../components/CommonHeader";
import CommonFooter from "../../components/CommonFooter.vue";
import ScrollReveal from "scrollreveal";
import { TweenLite } from "gsap/TweenLite";
import { Loading } from "element-ui";
export default {
  name: "Index",
  components: { CommonFooter, CommonHeader },
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
          url: "http://www.realtoraccess.com/web/agentlist/"
          // url: "/agenthome.html"
        },
        {
          text: "房价走势",
          url: "http://www.realtoraccess.com/web/van/"
        },
        {
          text: "全球资讯",
          url: "http://www.realtoraccess.com/news/list/"
        }
      ],
      logoUrl: logo,
      bannerUrl: banner,
      avator1,
      avator2,
      avator3,
      avator4,
      avator5,
      house1,
      house2,
      house3,
      reading1,
      reading2,
      middlemanBanner: [],
      countData: {
        listing: 0,
        agent: 0,
        estate: 0
      },
      totalData: {
        listing: 0,
        agent: 0,
        estate: 0
      },
      recommendData: [],
      recommendIndex: 0,
      recommendHoverIndex: -1,
      articlesData: [],
      corpsData: [],
      corpHoverIndex: -1,
      cooperationArray,
      sr: ScrollReveal(),
      loading: null,
      isHeaderLoad: false,
      isCountLoad: false,
      isAgentsLoad: false,
      isListingsLoad: false,
      isCorpsLoad: false,
      isArticlesLoad: false
    };
  },
  computed: {
    listingNum() {
      return this.countData.listing.toFixed(0);
    },
    estateNum() {
      return this.countData.estate.toFixed(0);
    },
    agentNum() {
      return this.countData.agent.toFixed(0);
    },
    isLoad() {
      return (
        this.isHeaderLoad &&
        this.isCountLoad &&
        this.isAgentsLoad &&
        this.isListingsLoad &&
        this.isCorpsLoad &&
        this.isArticlesLoad
      );
      // return false;
    }
  },
  watch: {
    isLoad(n) {
      if (n) {
        this.loading.close();
      }
    }
  },
  mounted() {
    wxImgUrl = "http://www.realtoraccess.com/static/web/img/share-index.png";
    this.loading = Loading.service({
      lock: true,
      text: " ",
      spinner: "el-icon-loading"
    });
    this.getCount();
    this.getAgents();
    this.getListings();
    this.getCorps();
    this.getArticles();
    // this.setScrollReveal();
  },
  methods: {
    headerImageLoad() {
      this.isHeaderLoad = true;
    },
    getOptions(beforeReveal = () => {}, afterReveal = () => {}) {
      let options = {
        duration: 500,
        delay: 100,
        reset: true,
        desktop: true,
        opacity: 0.5,
        scale: 0.8,
        viewFactor: 0.1,
        beforeReveal,
        afterReveal
      };
      return options;
    },
    setScrollReveal() {
      this.sr.reveal(".index-banner", this.getOptions());
      this.sr.reveal(
        ".index-data",
        this.getOptions(
          () => {
            this.countData = { listing: 0, agent: 0, estate: 0 };
          },
          () => {
            TweenLite.to(this.countData, 2, {
              listing: this.totalData.listing,
              agent: this.totalData.agent,
              estate: this.totalData.estate
            });
          }
        )
      );
      this.sr.reveal(".index-banner-middleman", this.getOptions());
      this.sr.reveal(".index-why-middleman", this.getOptions());
      this.sr.reveal(".index-recommend", this.getOptions());
      this.sr.reveal(".index-describe", this.getOptions());
      this.sr.reveal(".index-reading", this.getOptions());
      this.sr.reveal(".index-corps", this.getOptions());
      this.sr.reveal(".index-morehouse", this.getOptions());
      this.sr.reveal(".index-cooperation", this.getOptions());
      this.sr.reveal(".index-corp-desc", this.getOptions());
      this.sr.reveal(".index-recommend .recommend-item", {
        reset: true,
        interval: 100
      });
    },
    getCount() {
      this.$get(this.$api.INDEX_COUNT).then(resData => {
        this.totalData.listing = parseInt(resData.listing);
        // this.totalData.listing = 1680;
        this.totalData.agent = parseInt(resData.agent);
        this.totalData.estate = parseInt(resData.estate);
        this.setScrollReveal();
        this.isCountLoad = true;
      });
    },
    getAgents() {
      this.$get(this.$api.INDEX_AGENTS).then(resData => {
        for (let i = 0; i < resData.length; i += 4) {
          this.middlemanBanner.push(resData.slice(i, i + 4));
          this.setScrollReveal();
        }
        this.isAgentsLoad = true;
      });
    },
    getListings() {
      this.$get(this.$api.INDEX_LISTINGS).then(resData => {
        for (let i = 0; i < resData.length; i += 7) {
          this.recommendData.push(resData.slice(i, i + 7));
          this.setScrollReveal();
        }
        this.isListingsLoad = true;
      });
    },
    getCorps() {
      this.$get(this.$api.INDEX_CORPS).then(resData => {
        console.log("公司动态", resData);
        for (let i = 0; i < resData.length; i += 4) {
          this.corpsData.push(resData.slice(i, i + 4));
          this.setScrollReveal();
        }
        this.isCorpsLoad = true;
      });
    },
    getArticles() {
      this.$get(this.$api.INDEX_ARTICLES).then(resData => {
        console.log("相关阅读", resData);
        this.articlesData = resData;
        this.setScrollReveal();
        this.isArticlesLoad = true;
      });
    },
    refreshRecommend() {
      this.recommendIndex++;
      if (this.recommendIndex >= this.recommendData.length) {
        this.recommendIndex = 0;
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import url("../../assets/css/base.less");
#index {
  background-color: #fff;
}
@vw100: 100vw;
//图片基本路径
@image: "../../assets/image";

.index-header {
  padding: 0 12vw;
}
.index-banner {
  height: @vw100 / 2.4;
  position: relative;
  .index-banner-desc {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    .en-text {
      .whiteText;
      font-weight: 800;
      text-shadow: 10px 10px 30px rgba(0, 0, 0, 0.5),
        -10px -10px 30px rgba(0, 0, 0, 0.5);
      line-height: 2em;
      @media screen {
        @media (max-width: 480px) {
          font-size: 40px;
        }
        @media (min-width: 900px) and (max-width: 1279px) {
          font-size: 72px;
        }

        @media (min-width: 1280px) and (max-width: 1439px) {
          font-size: 84px;
        }

        @media (min-width: 1440px) and (max-width: 1679px) {
          font-size: 96px;
        }

        @media (min-width: 1680px) {
          font-size: 108px;
        }
      }
    }

    .zh-text {
      .whiteText;
      line-height: 2em;
      text-shadow: 10px 10px 16px rgba(0, 0, 0, 0.5),
        -10px -10px 16px rgba(0, 0, 0, 0.5);
      @media screen {
        @media (max-width: 480px) {
          font-size: 40px;
        }
        @media (min-width: 900px) and (max-width: 1279px) {
          font-size: 64px;
        }

        @media (min-width: 1280px) and (max-width: 1439px) {
          font-size: 72px;
        }

        @media (min-width: 1440px) and (max-width: 1679px) {
          font-size: 84px;
        }

        @media (min-width: 1680px) {
          font-size: 96px;
        }
      }
    }
  }
}

//数据
.index-data {
  .flex;
  .bgLight;
  justify-content: space-around;
  padding: 6vw 0;

  .index-data-num {
    .themeText;
    &:hover {
      opacity: 0.8;
    }
  }

  .index-data-count {
    .mostLarge;
    .themeText;
    .boldText;
    line-height: 6vw;
    position: relative;
    i {
      position: absolute;
      right: -2.4vw;
      top: -1vw;
    }
  }

  .el-button {
    .large;
    .boldText;
    a {
      .whiteText;
      position: relative;
      top: -6px;
      i {
        position: relative;
        .extraLarge;

        @media screen {
          @media (min-width: 100px) and (max-width: 1279px) {
            top: 8px;
            right: 8px;
          }
          @media (min-width: 900px) and (max-width: 1279px) {
            top: 4px;
            right: 4px;
          }
          @media (min-width: 1280px) and (max-width: 1439px) {
            top: 6px;
            right: 6px;
          }
          @media (min-width: 1440px) and (max-width: 1679px) {
            top: 8px;
            right: 8px;
          }
          @media (min-width: 1680px) {
            top: 8px;
            right: 8px;
          }
        }
      }
    }
  }

  .index-data-type {
    .large;
    line-height: 4vw;
    .regularText;
    margin-bottom: 12px;
  }
}
//经纪人banner
.index-banner-middleman {
  background-image: url("../../assets/image/agent-banner-bg.jpg");
  background-repeat: no-repeat;
  background-position-y: top;
  background-position-x: center;
  background-size: cover;
  .bgLight;
  border-top: 1px solid #f0f0f0;
  .index-banner-middleman-title {
    .whiteText;
    .extraLarge;
    .boldText;
    margin: 6vw 0;
    text-align: center;
  }

  .index-banner-middleman-item {
    width: 80%;
    margin: 0 auto;
    .flex;
    justify-content: space-around;

    .middleman-detail {
      .flex;
      .flexCenter;
      flex-direction: column;
      border-top: 3px solid @themeColor;
      background-color: @white;
      @media screen {
        @media (min-width: 980px) and (max-width: 1279px) {
          width: 200px;
        }

        @media (min-width: 1280px) and (max-width: 1679px) {
          width: 240px;
        }
      }
      padding: 12px;
      box-sizing: border-box;
      position: relative;
      transition: all 0.3s;
      cursor: pointer;
      &:hover {
        box-shadow: 2px 2px 2px #eee, -2px 2px 2px #eee;
      }
      .detail-link {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
      }
      .middleman-photo {
        width: 160px;
        height: 160px;
        background-repeat: no-repeat;
        background-position: center;
        border-radius: 50%;
        object-fit: cover;
      }

      .middleman-auth {
        background-color: @themeColor;
        border-radius: 12px;
        border-color: 1px solid @white;
        font-size: 12px;
        position: absolute;
        padding: 0 12px 0 26px;
        height: 24px;
        line-height: 24px;
        top: 140px;
        left: 20px;
        box-sizing: border-box;
        color: @white;
        &::before {
          content: "V";
          border-radius: 50%;
          border: 1px solid @white;
          width: 24px;
          height: 24px;
          text-align: center;
          line-height: 24px;
          .boldText;
          box-sizing: border-box;
          top: 0;
          left: 0;
          position: absolute;
        }
      }

      .middleman-username {
        width: 200px;
        text-align: center;
        .base;
        .primaryText;
        margin: 12px 0;
        .textOverflowEllipsis;
      }

      .middleman-usercity,
      .middleman-note {
        .textOverflowEllipsis;
        .placeholderText;
        width: 200px;
        text-align: center;
        font-size: 12px;
        margin: 2px 0;
      }

      .middleman-divider {
        width: 200px;
        height: 1px;
        .bgLight;
      }

      .middleman-corp {
        .flex;
        .itemsCenter;
        width: 200px;
        padding: 12px;

        img {
          width: 36px;
          height: 36px;
        }

        span {
          flex-grow: 1;
          .textOverflowEllipsis;
          font-size: 14px;
          .placeholderText;
          padding-left: 6px;
        }
      }
    }
  }
}
//为何顾问
.index-why-middleman {
  .bgLight;
  padding: 4vw 8vw;

  .why-header {
    .flex;
    .primaryText;
    .boldText;
    .extraLarge;
    span {
      border-bottom: 4px solid @themeColor;
    }
  }
  .why-reason {
    .flex;
    padding: 2vw 0;
    justify-content: space-between;

    .reason-item {
      width: 12vw;

      img {
        width: 100%;
        height: auto;
        border-radius: 50%;
        transition: all 0.5s;
        &:hover {
          transform: scale(1.1);
        }
      }

      p {
        .medium;
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
      .medium;
      .boldText;
      color: @themeColor;
      border-bottom: 2px solid @themeColor;
    }
  }
}

//推荐
.index-recommend {
  padding: 4vw 0;
  .recommend-header {
    .extraLarge;
    text-align: center;
    .boldText;
    position: relative;
    .refresh-recommend {
      // width: 320px;
      position: absolute;
      left: 80%;
      bottom: 0;

      cursor: pointer;
      &:hover {
        opacity: 0.8;
      }
      @media screen {
        @media (min-width: 481px) and (max-width: 1279px) {
          height: 36px;
          span {
            float: left;
            .themeText;
            font-size: 20px;
            line-height: 36px;
          }
          img {
            float: left;
            width: 36px;
            height: 36px;
          }
        }

        @media (min-width: 900px) and (max-width: 1279px) {
          height: 36px;
          span {
            float: left;
            .themeText;
            font-size: 20px;
            line-height: 36px;
          }
          img {
            float: left;
            width: 36px;
            height: 36px;
          }
        }

        @media (min-width: 1280px) and (max-width: 1439px) {
          height: 40px;
          span {
            float: left;
            .themeText;
            font-size: 24px;
            line-height: 40px;
          }
          img {
            float: left;
            width: 40px;
            height: 40px;
          }
        }

        @media (min-width: 1440px) and (max-width: 1679px) {
          height: 44px;
          span {
            float: left;
            .themeText;
            font-size: 28px;
            line-height: 44px;
          }
          img {
            float: left;
            width: 44px;
            height: 44px;
          }
        }

        @media (min-width: 1680px) {
          height: 48px;
          span {
            float: left;
            .themeText;
            font-size: 32px;
            line-height: 48px;
          }
          img {
            float: left;
            width: 48px;
            height: 48px;
          }
        }
      }
    }
  }
  .recommend-list {
    margin: 4vw auto;
    // width: 1200px;

    .flex;
    .justifyCenter;
    flex-wrap: wrap;
    .recommend-item {
      @media screen {
        @media (max-width: 1279px) {
          width: 40vw;
          height: 24vw;
        }
        @media (min-width: 1280px) {
          width: 22vw;
          height: 16vw;
        }
      }

      margin: 8px 4px;
      position: relative;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      &:last-child {
        .bgLight;
      }

      .item-agent {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        background-color: transparent;
        box-shadow: 5px 5px 10px #aaa;
        img {
          height: 48px;
          width: 48px;
          border: 2px solid @white;
          border-radius: 50%;
          position: absolute;
          left: 12px;
          bottom: 12px;
          background-color: @white;
          z-index: 2;
        }

        div {
          background-color: @white;
          .placeholderText;
          z-index: 1;
          height: 28px;
          width: 96px;
          line-height: 14px;
          padding: 2px 2px 2px 12px;
          font-size: 12px;
          position: absolute;
          left: 56px;
          bottom: 22px;

          p:nth-child(1) {
            .regularText;
          }
        }

        span {
          background-color: @themeColor;
          .whiteText;
          .base;
          .boldText;
          padding: 4px 24px;
          position: absolute;
          top: 12px;
          left: 0;
        }
      }

      .item-detail {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding: 12px;
        font-size: 1.2vw;
        line-height: 1.2em;
        color: @white;
        position: absolute;
        background-color: rgba(0, 0, 0, 0.5);
        left: 0;
        top: 0;
        @media screen {
          @media (min-width: 980px) and (max-width: 1279px) {
            font-size: 2vw;
            line-height: 1.5em;
          }

          @media (min-width: 1280px) and (max-width: 1679px) {
            font-size: 1.2vw;
            line-height: 1.3em;
          }
        }
        .item-detail-viewcount {
          height: 2.2vw;
          line-height: 2.2vw;

          // background: red;
          .item-detail-checkhouse {
            color: #fff;
            height: 2.2vw;
            border: 1px solid #fff;
            // background: green;
            padding: 0 1.2vw;
            border-radius: 0.4vw;
            float: right;
            @media screen {
              @media (min-width: 980px) and (max-width: 1279px) {
                font-size: 1.6vw;
              }

              @media (min-width: 1280px) and (max-width: 1679px) {
                font-size: 1.2vw;
              }
            }
          }
        }
      }

      .publish-house {
        .whiteText;
        background-color: @themeColor;
        padding: 24px;
        border-radius: 50%;
        &:hover {
          opacity: 0.8;
        }
      }
    }
  }

  .recommend-button {
    .whiteText;
    .medium;
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
  // background-image: url("../../assets/image/mh_bg.png");
  background-position: center center;
  background-repeat: no-repeat;
  padding: 6vw 8vw;

  .describe-header {
    .extraLarge;
    .boldText;
  }

  .describe-base {
    .medium;
    .regularText;
    line-height: 1.4em;
    margin: 24px 0;
    a{
      .themeText;
      text-decoration: none;
    }
  }

  .know-more {
    a {
      color: @themeColor;
      .medium;
      .boldText;
    }
  }
}

//更多房源
.index-morehouse {
  padding: 6vw 0;

  .morehouse-descript {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    color: @white;
    .morehouse-title {
      .large;
      .boldText;
      position: absolute;
      left: 40px;
      bottom: 160px;
    }

    .morehouse-link {
      color: @white;
      .base;
      position: absolute;
      left: 40px;
      bottom: 100px;
      padding: 4px 16px;
      border: 1px solid @white;
      border-radius: 8px;
    }
  }
}

//相关阅读
.index-reading {
  .bgLight;
  padding: 6vw 0;

  .reading-item {
    background-color: @white;
    padding-bottom: 24px;
    img {
      transition: all 0.5s;
      &:hover {
        transform: scale(1.05);
      }
    }

    p {
      padding: 12px;
      margin-bottom: 12px;
      .textOverflowEllipsis;
    }

    a {
      .small;
      color: @themeColor;
      cursor: pointer;
      border: 1px solid @themeColor;
      padding: 4px 12px;
      border-radius: 4px;
      margin: 12px;
      &:hover {
        opacity: 0.8;
      }
    }
  }
}

//公司动态
.index-corps {
  padding-top: 6vw;
  .divider {
    width: 80%;
    height: 1px;
    background-color: #aaa;
    margin: 2vw auto 0;
  }

  .index-corps-banner-item {
    width: 80%;
    margin: 0 auto;
    .flex;
    justify-content: space-around;
    padding: 24px;

    .item-panel {
      width: 18vw;
      height: 24vw;
      .panel-logo {
        width: 18vw;
        height: 18vw;
        background-size: 100% 100%;

        .panel-qrcode {
          width: 18vw;
          height: 18vw;
          box-sizing: border-box;
          border: 4px solid @themeColor;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }

      .panel-name {
        .boldText;
        .large;
        .regularText;
        text-align: center;
        line-height: 2em;
      }
    }
  }
}

//媒体合作
.index-cooperation {
  padding: 6vw 0 0;
  width: 1000px;
  margin: 0 auto;
  box-sizing: border-box;

  .index-cooperation-list {
    .flex;
    justify-content: space-around;
    flex-wrap: wrap;
    margin-top: 4vw;
    .index-cooperation-item {
      margin: 24px 0;
      transition: all 0.3s;
      &:hover {
        transform: scale(1.2);
      }
      .item-logo {
        width: 144px;
        height: 48px;
        background-size: 100% 100%;
      }

      .item-name {
        width: 160px;
        text-align: center;
        line-height: 3em;
        font-size: 12px;
        .primaryText;
      }
    }
  }
}

//公司描述
.index-corp-desc {
  img {
    display: block;
  }
  .desc-wrap {
    background-color: #efefef;
    margin-top: -24px;
    .desc-left {
      float: left;
      width: 64%;
      box-sizing: border-box;
      padding: 24px 48px;

      .desc-header {
        .boldText;
        .large;
        .primaryText;
        line-height: 3em;
      }

      .desc-base {
        .secondaryText;
        .base;
        line-height: 1.2em;

        a{
          .themeText;
          line-height: 1em;
        }
      }

      a {
        color: #1cbb20;
        line-height: 3em;
      }
    }

    .desc-right {
      float: right;
      width: 36%;
      text-align: right;
      box-sizing: border-box;
      padding: 24px 48px;
      .right-tab {
        a {
          color: #1cbb20;
          padding: 0 8px;
        }
        a + a {
          border-left: 1px solid #1cbb20;
        }
      }

      .right-header {
        .boldText;
        .base;
        .primaryText;
        line-height: 2em;
        margin-top: 12px;
      }

      p {
        font-size: 14px;
        .secondaryText;
      }

      .right-qrcode {
        margin: 12px 0;
        .flex;
        justify-content: flex-end;
      }
    }
  }
}

.common-title {
  .extraLarge;
  .boldText;
  text-align: center;
  span {
    position: relative;
  }
  span::before {
    content: "";
    width: 48px;
    height: 4px;
    left: -52px;
    top: 50%;
    margin-top: -2px;
    position: absolute;
    background-color: @black;
  }

  span::after {
    content: "";
    width: 48px;
    height: 4px;
    right: -52px;
    top: 50%;
    margin-top: -2px;
    position: absolute;
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

<style>
.el-carousel__button {
  width: 16px !important;
  height: 16px !important;
  border-radius: 50%;
}

.is-active .el-carousel__button {
  background-color: #1cbb20;
  opacity: 1;
}

.el-carousel__arrow {
  width: 72px !important;
  height: 72px !important;

  font-size: 36px !important;
}

.index-banner-middleman .el-carousel__arrow {
  background-color: #fff !important;
  color: #1cbb20 !important;
}

.index-corps .el-carousel__arrow {
  background-color: #1cbb20 !important;
  color: #fff !important;
}

.el-loading-spinner i {
  font-size: 96px;
  color: gray !important;
}

.el-loading-spinner .el-loading-text {
  height: 39px;
  background-image: url("../../assets/image/loading-bg.svg");
  background-repeat: no-repeat;
  background-position: center center;
}
</style>
