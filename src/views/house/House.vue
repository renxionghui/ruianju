<template>
  <div id="house">
    <div  v-show="showHouseDetail">
      <div class="house-detail-wrap">
      <!-- 头部 -->
      <div>
        <common-header :nav-index='1'></common-header>
      </div>
      <!-- 面包屑 -->
      <el-row type="flex" justify="center" class="house-view">
        <el-col>
          <div class="house-view-breadcrumb">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item v-for="(item,index) of breadcrumb" :key="index">{{item}}</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
        </el-col>
      </el-row>
      <!-- 联系方式 -->
      <el-row type="flex" justify="center">
        <el-col>
          <el-row type="flex">
            <el-col :span="14" class="house-view-img">
              <img :src="houseViewUrl" alt style="width:100%;height:100%;display:block" />
            </el-col>
            <el-col
              :span="10"
              :style="{height:'auto',backgroundImage:`url(${houseViewBg})`}"
              class="house-view-bg"
            >
              <div class="house-view-cover">
                <div class="house-view-contact">
                  <div class="contact-title">关注微信,海外房产定制服务</div>

                  <div class="contact-qrcode">
                    <img :src="qrcodeUrl" alt />
                    <div>
                      <p>国内专线 | 400-877-1896</p>
                      <p>客服邮箱 | info@realtoraccess.com</p>
                    </div>
                  </div>
                  <div>
                    <el-input placeholder="您的邮箱" v-model="headerEmail"></el-input>
                    <transition name="el-zoom-in-top">
                      <p style="color:#f56c6c;font-size:14px;" v-show="notEmail1">请输入正确的邮箱</p>
                    </transition>
                  </div>

                  <el-button
                    style="width:100%;margin:24px 0"
                    type="primary"
                    @click="showMoreImg"
                    :disabled="!canMore"
                  >显示更多房源照片</el-button>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>

      <!-- 房屋详情 -->
      <div class="house-detail">
        <div class="house-detail-left">
          <div class="house-detial-price">
            <div class="detail-title">{{listingInfo.price}}</div>
            <p class="detail-house-type">
              房型:
              <span>{{listingInfo.houseTypeInfo}}</span>
              <span>{{listingInfo.housetype}}</span>
              <span>{{listingInfo.areas}}</span>
            </p>
            <p>
              地址:
              <span>{{listingInfo.listingname}}</span>
            </p>
            <p>
              城市:
              <span>{{listingInfo.cityname}}</span>
            </p>
            <div style="height:12px;"></div>
            <a href='http://www.realtoraccess.com/web/m/listings/#/' class="view-map el-icon-location-outline">地图看房</a>
            <div class="house-share">
              <span>分享到:</span>
              <div class="share-icons bdsharebuttonbox">
                <a href="'http://www.facebook.com/sharer.php?u='+encodeURIComponent(document.location.href)+'&amp;t='+encodeURIComponent(document.title),'_blank','toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, width=600, height=450,top=100,left=350');void(0)"><img :src="require('../../assets/image/icon-share-facebook.svg')" alt /></a>
                <a href=""><img data-cmd='tsina' :src="require('../../assets/image/icon-share-weibo.svg')" alt /></a>
                <a href=""><img data-cmd='weixin' :src="require('../../assets/image/icon-share-wechat.svg')" alt /></a>
              </div>
            </div>
          </div>

          <div class="house-detail-descript">
            <div class="detail-title font-title">
              <span>房屋</span>描述
            </div>
            <div v-if="showHouseMore">
              {{listingInfo.intro}}      
            </div>
            <div v-else class="descript-text">
              {{listingInfo.intro}}      
            </div>
            <span class="house-more" @click='showHouseMore=!showHouseMore'>{{showHouseMore?'收起':'详情'}}>></span>
          </div>
        </div>
        <div class="house-detail-right">
          <el-card :body-style="{backgroundColor:'#f0f0f0'}" shadow="hover">
            <div class="appointment-contact">
              <a :href="`/web/agent/${agentInfo.id}`"><img :src="agentInfo.head" class="middleman-head"  alt style="width:100%;height:auto"  /></a>
              <span class="middleman-name">{{agentInfo.username}}</span>
              <span class="middleman-company">{{agentInfo.corp||'地产经纪公司名称'}} | {{agentInfo.city||'城市'}}</span>
              <span class="middleman-phone">{{agentInfo.tel}}</span>
            </div>
            <div class="appointment-form">
              <el-form>
                <el-form-item>
                  <el-input placeholder="您的姓名" v-model="appointment.name"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-input style="width:100%;" placeholder="您的邮箱" v-model="appointment.email"></el-input>
                  <transition name="el-zoom-in-top">
                    <p style="color:#f56c6c;font-size:14px;" v-show="notEmail2">请输入正确的邮箱</p>
                  </transition>
                </el-form-item>
                <el-form-item>
                  <el-input
                    type="textarea"
                    v-model="appointment.desc"
                    placeholder="我对这个房源有兴趣，想要了解更多资讯。"
                    :rows="4"
                    resize="none"
                  ></el-input>
                </el-form-item>
              </el-form>
              <div style="text-align:center">
                <el-button
                  type="primary"
                  @click="handleAppointment"
                  class="appointment-view-house"
                >预约看房</el-button>
              </div>
            </div>
          </el-card>
        </div>
      </div>

      <!-- 推荐房源 -->
      <el-row class="house-recommend">
        <el-col>
          <div class="recommend-title font-title">
            <span>推荐</span>房源
          </div>
        </el-col>
        <el-col>
          <div class="recommend-list">
            <div
              class="recommend-item"
              v-for="(item,index) of recommendData"
              :class='[index%2==0?"recommend-item-left":"recommend-item-right"]'
              :key="index"
              @mouseover="recommendHoverIndex = index"
              @mouseout="recommendHoverIndex = -1"
              :style="{backgroundImage:`url('${item.imgs[0]}')`}"
            >
              <transition name="el-fade-in-linear">
                <div class="item-detail" v-show="recommendHoverIndex == index">
                  <div class="item-detail-price">{{item.price}}</div>
                  <div class="item-detail-addr">{{item.listingname}}</div>
                  <div class="item-detail-cityname">{{item.cityname}}</div>

                  <div class="item-detail-housetype">{{item.housetype}} | {{item.areas}}</div>
                  <div class="item-detail-roomcount">
                    <span class="icon-furniture">{{parseInt(item.toilet)}}</span>
                    <span class="icon-bed" style="margin-left:12px;">{{item.bedroom}}</span>
                  </div>

                  <div class="item-detail-viewcount" style="margin-top:8px;">
                    <span style="margin-right:12px; line-height:24px;">{{item.datadate.slice(0,10)}}</span>
                    <span
                      style="margin-right:12px; line-height:24px;"
                      class="icon-eye"
                    >{{item.visit}}</span>
                    <a :href="`/web/listing1/${item.htmlid}`">查看房源</a>
                  </div>
                </div>
              </transition>
            </div>
          </div>
          <div style="text-align:center;margin-bottom:2vw">
            <span class="recommend-button" type="text" @click="handleViewMore">查看更多</span>
          </div>
        </el-col>
      </el-row>


      <!-- 房源详情 -->
      <el-row class="house-info">
        <el-col >
          <div class="info-title font-title">
            <span>房源</span>详情
          </div>
          <el-row class="info-detail">
            <el-col :span=12 class='bg-light detail-item'>
              <span>MLS：<i>{{listingInfo.listingid}}</i></span>
            </el-col>
            <el-col :span=12 class='bg-light detail-item'>
              <span>房屋风格：<i>{{listingInfo.housestyle}}</i></span>
            </el-col>
            <el-col :span=12 class='detail-item'>
              <span>售价：<i>{{listingInfo.price}}</i></span>
            </el-col>
            <el-col :span=12 class='detail-item'>
              <span>房屋类型：<i>{{listingInfo.housetype}}</i></span>
            </el-col>
            <el-col :span=12 class='bg-light detail-item'>
              <span>室内面积：<i>{{listingInfo.areas}}</i></span>
            </el-col>
            <el-col :span=12 class='bg-light detail-item'>
              <span>地下室：<i>{{listingInfo.basement||'无'}}</i></span>
            </el-col>
            <el-col :span=12 class='detail-item'>
              <span>土地面积：<i>{{listingInfo.parking}}</i></span>
            </el-col>
            <el-col :span=12 class='detail-item'>
             <span> 建筑年代：<i>{{listingInfo.builddate}}</i></span>
            </el-col>
            <el-col :span=12 class='bg-light detail-item'>
              <span>卧室：<i>{{listingInfo.bedroom}}</i></span>
            </el-col>
            <el-col :span=12 class='bg-light detail-item'>
              <span>地产公司：<i>{{listingInfo.corp}}</i></span>
            </el-col>
            <el-col :span=12 class='detail-item'>
              <span>卫生间：<i>{{listingInfo.toilet}}</i></span>
            </el-col>
            <el-col :span=12 class='detail-item'>
              <span>便利设施：<i>{{listingInfo.goodat}}</i></span>
            </el-col>
            <el-col :span=24 class='bg-light detail-item'>
              <span>地税：<i>{{listingInfo.tax}}</i></span>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <!-- 房源分析 -->
      <el-row class="house-chart">
        <el-col >
          <div class="chart-title">
            <div class="chart-text font-title">
              <span>房源</span>分析
            </div>
            <div class="chart-toggle" >
              <i @click='showHouseChart=!showHouseChart' :class="showHouseChart?'el-icon-minus':'el-icon-plus'"></i>
            </div>
          </div>
          
          <div id="chart1"></div>
          <el-collapse-transition>
          <div class="chart-list" style="width:100%" v-show="showHouseChart">
            <div id="chart2" ></div>
            <div id="chart3" ></div>
            <div id="chart4" ></div>
          </div>
          </el-collapse-transition>
        </el-col>
      </el-row>

      <!-- 城市价格 周边房产 区域新盘 -->
      <el-row class="house-about">
        <el-col :span="8" class="about-left">
          <div class="about-title">城市价格</div>
          <div class="about-list">
            <div class="about-item" v-for="(item,index) in cityPriceList" :key="index">
              <a :href="item.url" target="_blank">
                <span> {{item.cityName}} </span> 
                <span>  {{item.city}} </span>
              </a>
            </div>
          </div>
          <a href class="view-more">查看更多</a>
        </el-col>
        <el-col :span="8">
          <div class="about-title">周边房产</div>
          <div class="about-list">
            <div class="about-item" v-for="(item,index) in nearbyList" :key="index">{{item[1]}}</div>
          </div>
          <a href="http://www.realtoraccess.com/web/houses/" class="view-more">查看更多</a>
        </el-col>
        <el-col :span="8" class="about-right">
          <div class="about-title">区域新盘</div>
          <div class="about-list">
            <div class="about-item" v-for="(item,index) in newListingList" :key="index">
              <a :href="item.url" target="_blank">
                <span>{{item.price}}, </span>
                <span>{{item.areas}}, </span>
                <span>{{item.bedroom}}室{{parseInt(item.toilet)}}卫 </span>
                <span>{{item.listingname}} </span>
              </a>
            </div>
          </div>
          <a href="http://www.realtoraccess.com/web/m/listings/#/" class="view-more">查看更多</a>
        </el-col>
      </el-row>
    </div>
            <!-- 免费注册 -->
      <div class="agent-signin-wrap">
        <span class="signin-text font-title">海外房产经纪人?</span>
        <el-button type="primary">
          <a href="http://www.realtoraccess.com/register">免费注册</a>
        </el-button>
      </div>
      <common-footer></common-footer>
    </div>
    
    <div class="house-imgs-wrap" v-show="!showHouseDetail">
      <div class="house-imgs-header">
        <span class="el-icon-back back-button" @click="handleBack"></span>
      </div>
      <div class="house-imgs-list">
        <div class="house-imgs-item" v-for="(item,index) in listingInfo.imgs" :key="index">
          <img :src="item" alt width="100%" height="100%" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import logo from "../../assets/image/logo.png";
import houseView from "../../assets/image/house-view.jpeg";
import qrcode from "../../assets/image/qrcode.png";
import middleman from "../../assets/image/middleman.png";
import CommonHeader from '../../components/CommonHeader.vue';
import CommonFooter from "../../components/CommonFooter.vue";
import ScrollReveal from "scrollreveal";
import { setTimeout } from 'timers';
export default {
  name: "House",
  components: { CommonHeader,CommonFooter },
  data() {
    return {
      mls: "",
      city: "",
      logoUrl: logo,
      houseViewUrl: houseView,
      houseViewBg: houseView,
      qrcodeUrl: qrcode,
      middlemanUrl: middleman,
      breadcrumb: [],
      sr: ScrollReveal(),
      headerEmail: "",
      notEmail1: false,
      notEmail2: false,
      showHouseDetail: true,
      listingInfo: {}, //房源信息
      agentInfo: {}, //经纪人信息
      appointment: {}, //预约model
      allRecommendData:[],
      recommendData: null, //推荐房源
      recommendHoverIndex: -1,
      page: 1,
      cityPriceList: null, //城市价格
      nearbyList: null, //周边房产
      newListingList: null, //区域新盘
      showHouseChart: false,
      facebookShareUrl:'',
      showHouseMore:false
    };
  },
  computed: {
    canMore() {
      return this.headerEmail;
    }
  },
  watch: {
    showHouseDetail(n) {
      if (n) {
        this.$nextTick(() => {
          this.setDeatilSr();
          this.setAgentSr();
          this.setRecommendSr();
          this.setAboutLeftSr();
          this.setAboutRightSr();
        });
      } else {
        this.$nextTick(() => {
          this.setImgSr();
        });
      }
    },
    showHouseChart(n){
      this.initChart();
    }
  },
  mounted() {
    //获取mls
    let href = window.location.href;
    if (href.lastIndexOf("/") == href.length - 1) {
      href = href.substr(0, href.length - 1);
    }
    this.mls = href.substring(href.lastIndexOf("/") + 1);
    //TODO
    // this.mls = "r2305677";
    // this.commitEmail();
    this.getListingInfo();
    // this.getCrumbs();
    this.getAgentListing();
    this.getRecommend();
    this.cityPrice();
    // this.getNearby();
    this.newListings();
    this.initChart();
    // makeChart('chartvisio1', 286, [{col:'datadate', opt:'gte', val:'2019-02'+'周'},{col:'countyid',opt: 'eq', val: 'NorthVancouver'}]);
    // setTimeout(()=>{
    //   this.showHouseChart = false;
    // },200);
  },
  methods: {
    setImgSr() {
      this.sr.reveal(".house-imgs-item", {
        interval: 160,
        reset: true
      });
    },
    setDeatilSr() {
      this.sr.reveal(".house-view-img", {
        delay: 100,
        distance: "-100%",
        opacity: 0.5,
        reset: true,
        origin: "right"
      });
      this.sr.reveal(".house-view-bg", {
        delay: 100,
        distance: "-100%",
        opacity: 0.5,
        reset: true,
        origin: "left"
      });
      this.sr.reveal(".house-detail-left", {
        delay: 100,
        distance: "-100%",
        opacity: 0.5,
        reset: true,
        origin: "right"
      });
    },
    setAgentSr() {
      this.sr.reveal(".house-detail-right", {
        delay: 100,
        distance: "-100%",
        reset: true,
        origin: "left"
      });
    },
    setRecommendSr() {
      this.sr.reveal(".recommend-item-left", {
        delay: 100,
        distance: "-100%",
        opacity: 0.5,
        reset: true,
        origin: "right"
      });
      this.sr.reveal(".recommend-item-right", {
        delay: 100,
        distance: "-100%",
        opacity: 0.5,
        reset: true,
        origin: "left"
      });
    },
    setAboutLeftSr() {
      // this.sr.reveal(".about-left", {
      //   delay: 100,
      //   distance: "-100%",
      //   opacity: 0.5,
      //   reset: true,
      //   origin: "right"
      // });
    },
    setAboutRightSr() {
      // this.sr.reveal(".about-right", {
      //   delay: 100,
      //   distance: "-100%",
      //   opacity: 0.5,
      //   reset: true,
      //   origin: "left"
      // });
    },
    handleAppointment() {
      let isEmail = this.isEmail(this.appointment.email);
      if (isEmail) {
        let params = {
          userId: this.agentInfo.userid,
          mls: this.mls,
          email: this.appointment.email,
          name: this.appointment.name,
          msg: this.appointment.desc || "我对这个房源有兴趣，想要了解更多资讯。"
        };
        this.$post(this.$api.COMMIT_EMAIL, params).then(resData => {
          this.notEmail2 = false;
          this.$message.success("预约成功!");
          this.appointment.name = "";
          this.appointment.email = "";
          this.appointment.desc = "";
        });
      } else {
        this.notEmail2 = true;
      }
    },
    handleBack() {
      this.showHouseDetail = true;
    },
    handleViewMore() {
      if(this.allRecommendData.length-this.recommendData.length==1){
        this.recommendData.push(this.allRecommendData[this.recommendData.length-1]);
      }else if(this.allRecommendData.length-this.recommendData.length>=2){
        this.recommendData.push(this.allRecommendData[this.recommendData.length-1]);
        this.recommendData.push(this.allRecommendData[this.recommendData.length]);
      }
    },
    isEmail(str) {
      let email = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
      return email.test(str);
    },
    //显示更多照片
    showMoreImg() {
      let isEmail = this.isEmail(this.headerEmail);
      if (isEmail) {
        this.notEmail1 = false;
        let params = {
          userId: "michellevaughan@shaw.ca",
          mls: this.mls,
          email: this.headerEmail
        };
        this.$post(this.$api.COMMIT_EMAIL, params).then(resData => {
          this.headerEmail = "";
          this.notEmail1 = false;
          this.showHouseDetail = false;
        });
      } else {
        this.notEmail1 = true;
      }
    },
    commitEmail() {
      let params = {
        userId: "michellevaughan@shaw.ca",
        mls: this.mls,
        email: "xxx@xxx.com",
        name: "aaaa",
        msg: "消息"
      };
      this.$post(this.$api.COMMIT_EMAIL, params).then(resData => {
        console.log("邮箱提交", resData);
      });
    },
    //面包屑
    getCrumbs() {
      this.$get(`${this.$api.GET_CRUMBS}?city=${this.city}`).then(resData => {
        console.log(resData);
        this.breadcrumb.push("全部");
        this.breadcrumb.push(resData.country);
        this.breadcrumb.push(resData.group);
        this.breadcrumb.push(resData.prov);
        this.breadcrumb.push(resData.city);
        this.breadcrumb.push(resData.county);
      });
    },
    //房源详情
    getListingInfo() {
      //r2003524
      this.$get(`${this.$api.GET_LISTING_INFO}?mls=${this.mls}`).then(
        resData => {
          if (resData.imgs.length >= 2) {
            this.houseViewUrl = resData.imgs[0];
            this.houseViewBg = resData.imgs[1];
          } else if (resData.imgs.length > 0) {
            this.houseViewUrl = resData.imgs[0];
            this.houseViewBg = resData.imgs[0];
          }
          this.listingInfo = resData;
          this.listingInfo.houseTypeInfo = `${resData.bedroom || 0}室${parseInt(
            resData.toilet
          )}卫`;
          wxImgUrl = this.houseViewUrl;
          try {
            let metas = document.querySelectorAll("meta");
            metas[2].content = `${this.listingInfo.listingname}房产,${this.listingInfo.bedroom}室${this.listingInfo.toilet}卫房价${this.listingInfo.price},${this.listingInfo.areas}房产`;
            metas[3].content = `${this.listingInfo.listingname},MLS#：${this.listingInfo.listingid}，户型：${this.listingInfo.bedroom}室${this.listingInfo.toilet}卫，室内面积：${this.listingInfo.areas},土地面积：${this.listingInfo.parking}.房屋类型：${this.listingInfo.hosuetype}，地产公司：${this.listingInfo.corp}`;
            let title = document.querySelector("title");
            title.innerHTML = `【${this.listingInfo.listingname}_${this.listingInfo.houseTypeInfo}_${this.listingInfo.areas}】-海外瑞安居RealtorAccess.com`;
          } catch (error) {
            console.log(error);
          }
          this.city = resData.cityname;
          this.getCrumbs();
          this.getNearby();
          this.$nextTick(() => {
            this.setDeatilSr();
          });
          console.log("房屋信息", resData);
        }
      );
    },
    //经纪人信息
    getAgentListing() {
      this.$get(`${this.$api.GET_AGENT_LISTING}?mls=${this.mls}`).then(
        resData => {
          console.log("经纪人信息", resData);
          this.agentInfo = resData;
          this.$nextTick(() => {
            this.setAgentSr();
          });
        }
      );
    },
    //推荐房源
    getRecommend() {
      this.$get(
        `${this.$api.GET_RECOMMEND}?mls=${this.mls}&page=${this.page}&page_size=10`
      ).then(resData => {
        this.recommendData = resData.slice(0,2);
        this.allRecommendData = resData;
        if (resData.length == 0) {
          this.page = 1;
        }
        if (this.page == 1) {
          this.$nextTick(() => {
            this.setRecommendSr();
          });
        }
      });
    },
    //房源分析
    initChart() {
      initChart(23, "chart1", 410, {});
      initChart(24, "chart2", 410, {});
      initChart(25, "chart3", 410, {});
      initChart(26, "chart4", 410, {});
    },
    //城市价格
    cityPrice() {
      this.$get(`${this.$api.CITY_PRICE}`).then(resData => {
        console.log("城市价格", resData);
        this.cityPriceList = resData;
        this.$nextTick(() => {
          this.setAboutLeftSr();
        });
      });
    },
    //周边房产
    getNearby() {
      this.$get(`${this.$api.GET_NEARBY}?city=${this.city}`).then(resData => {
        console.log("周边房产", resData);
        this.nearbyList = resData.nearby;
      });
    },
    //区域新房
    newListings() {
      this.$get(`${this.$api.NEW_LISTINGS}?mls=${this.mls}`).then(resData => {
        console.log("区域新盘", resData);
        this.newListingList = resData;
        this.$nextTick(() => {
          this.setAboutRightSr();
        });
      });
    }
  }
};
</script>
<style lang="less">
@import url("../../assets/css/base.less");
//图片基本路径
@image: "../../assets/image";
#house {
  width: 100%;
  overflow-x: hidden;
  background-color:#fff;
}

.house-detail-wrap{
  padding:0 12vw;
}

//房屋浏览
.house-view {
  .house-view-breadcrumb {
    .bgLight;
    padding: 1vw 2vw;
    .el-breadcrumb__item {
      .boldText;
      .base;
      .primaryText;
    }

    .el-breadcrumb__item:nth-last-child(1) .el-breadcrumb__inner {
      color: @themeColor !important;
    }

    .el-breadcrumb__separator {
      .boldText;
      .base;
      .primaryText;
    }
  }
}

.house-view-cover {
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  .flex;
  .flexCenter;

  .house-view-contact {
    width: 70%;
    padding: 2vw;
    background-color: @white;
    border-top: 4px solid @themeColor;

    .contact-title {
      .primaryText;
      .base;
      .boldText;
    }

    .el-input,
    .el-button {
      .base;
    }

    .contact-qrcode {
      .flex;
      .itemsCenter;
      margin: 1vw 0;

      img {
        display: block;
        width: 24%;
        height: auto;
      }

      p {
        .regularText;
        font-size: 16px;
        line-height: 24px;
        padding-left: 8px;
      }
    }

    .contact-more {
      text-align: center;
      background-color: @themeColor;
      border-radius: 4px;
      padding: 10px;
      cursor: pointer;
      margin-top: 1vw;
      &:hover {
        opacity: 0.8;
      }
      a {
        color: @white;
        display: block;
        width: 100%;
      }
    }
  }
}

// 房屋详情
.house-detail {
  margin: 2vw 0;
  position:relative;
  z-index: 2;
  .house-detail-left{
    width:52vw;
  }
  .house-detail-right{
    width:34vw;
    position: absolute;
    left: 53vw;
    top: 0;
  }
  .detail-title {
    .extraLarge;
    .boldText;
    line-height: 2em;

    span {
      border-bottom: 4px solid @themeColor;
    }
  }
  .house-detial-price {
    border-top: 1px solid @placeholderTextColor;
    position: relative;

    p {
      .medium;
      line-height: 2em;
      span {
        .boldText;
        padding: 0 4px;
      }
    }

    .detail-house-type {
      span + span {
        border-left: 2px solid @regularTextColor;
      }
    }

    .view-map {
      color: @white;
      padding: 8px 24px;
      border-radius: 4px;
      background-color: @themeColor;
      .base;
      &:hover {
        opacity: 0.8;
      }
    }

    .house-share {
      position: absolute;
      right: 48px;
      top: 24px;
      .base;
      .boldText;
      .flex;
      line-height: 56px;
      .share-icons {
        .flex;
        a{
          background-image: none !important;
        }
        img {
          width: 56px;
          height: 56px;
          &:hover {
            opacity: 0.8;
          }
        }
      }
    }
  }

  .house-detail-descript {
    border-top: 1px solid @placeholderTextColor;
    margin: 2vw 0;
    .base;
    .descript-text {
      .primaryText;  
      .textLinesEllipsis(7)
    }

    .house-more {
        color: @themeColor;
        cursor: pointer;
        &:hover{
          opacity: .8;
        }
      }
  }
}

// 经纪人
.appointment-contact {
  .flex;
  .flexCenter;
  flex-direction: column;
  a{
    width: 30%;
    .middleman-head{
      transition: all .5s;
      &:hover{
        transform: scale(1.05);
      }
    }
  }

  span {
    line-height: 1.5rem;
  }

  .appointment-view-house {
    color: @white;
    background-color: @themeColor;
    padding: 8px 48px;
    margin-top: 24px;
    .base;
    border-radius: 4px;
    &:hover {
      opacity: 0.8;
    }
  }

  .middleman-name {
    .boldText;
    .medium;
    line-height: 2em;
  }

  .middleman-company {
    .placeholderText;
    .small;
  }

  .middleman-phone {
    .medium;
    line-height: 2em;
  }
}

.appointment-form {
  .el-input,
  .el-textarea,
  .el-button {
    // margin: 4px 0;
    .base;
  }
}

//推荐房源
.house-recommend {
  border-top: 1px solid @placeholderTextColor;

  .recommend-title {
    .extraLarge;
    .boldText;
    line-height: 2em;

    span {
      border-bottom: 4px solid @themeColor;
    }
  }
  .recommend-list {
    width: 100%;
    .flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .recommend-item {
      width: 48%;
      height: 22vw;
      margin: 24px 0;
      position: relative;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      box-shadow: 5px 5px 5px #aaa;
      .item-agent {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        background-color: transparent;
        span {
          background-color: @themeColor;
          .whiteText;
          .large;
          .boldText;
          padding: 4px 48px;
          position: absolute;
          top: 32px;
          left: 0;
        }
      }

      .item-detail {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding: 32px;
        .medium;
        color: @white;
        line-height: 1.8em;
        position: absolute;
        background-color: rgba(0, 0, 0, 0.5);
        left: 0;
        top: 0;

        .item-detail-price {
          .extraLarge;
          .boldText;
        }

        .item-detail-viewcount {
          position: absolute;
          bottom: 32px;
          width: 100%;
          line-height: 1.5em;
          a {
            .medium;
            color: @white;
            line-height: 1.5em;
            position: absolute;
            right: 48px;
            border: 1px solid @white;
            padding: 4px 24px;
            border-radius: 12px;
          }
        }
      }
    }
  }

  .recommend-button {
    .large;
    .themeText;
    .boldText;
    line-height: 2em;
    border-bottom: 2px solid @themeColor;
    border-radius: 0;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
}

//房源详情
.house-info{

  .info-title{
    border-top: 1px solid @placeholderTextColor;
    .extraLarge;
    .boldText;
    line-height: 2em;

    span {
      border-bottom: 4px solid @themeColor;
    }
  }
  .info-detail{
    margin-bottom: 24px;
    .bg-light{
      .bgLight;
    }
    .detail-item{
      .medium;
      .textOverflowEllipsis;
      line-height: 2.4em;
      span{
        margin-left: 12px;
        i{
          .boldText;
        }
      }
    }
  }
  
}

//房源分析
.house-chart {
  
  margin-bottom: 2vw;
  .chart-title {
    border-top: 1px solid @placeholderTextColor;
    .extraLarge;
    .boldText;
    line-height: 2em;
    display: flex;
    .chart-text {
      flex-grow: 1;
      span {
        border-bottom: 4px solid @themeColor;
      }
    }

    .chart-toggle {
      .themeText;
      font-weight: 900;
    }
  }

  #chart1,
  #chart2,
  #chart3,
  #chart4 {
    width: 100%;
    height: 500px;
  }
}

//房产相关
.house-about {
  padding: 2vw 0;
  border-top: 1px solid @placeholderTextColor;
  .about-title {
    .boldText;
    .large;
    line-height: 3em;
  }

  .about-list {
    // height: 19vw;
    @media screen {
        @media (max-width:480px){
            font-size: 40px;
        }

        @media (min-width:481px) and (max-width:1279px){
            height: 252px;
        }

        @media (min-width:1280px) and (max-width:1439px){
            height: 288px;
        }

        @media (min-width:1440px) and (max-width:1679px) {
            height: 324px;
        }

        @media (min-width:1680px){
            height: 360px;
        }
    }
    overflow-y: hidden;
    margin-bottom: 24px;
    .about-item {
      .textOverflowEllipsis;
      .base;
      line-height: 1.5em;
      color: #999;
      a {
        color: #999;
      }
    }
  }

  .view-more {
    .themeText;
    .boldText;
    .medium;
  }
}

//图片列表
.house-imgs-wrap {
  .house-imgs-header {
    border-bottom: 1px solid @secondaryTextColor;
    padding: 1vw;
    .back-button {
      .large;
      .regularText;
      .boldText;
      padding-right: 1vw;
      border-right: 1px solid @secondaryTextColor;
      &:hover {
        .themeText;
      }
    }
  }

  .house-imgs-list {
    padding: 2vw;
    .flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .house-imgs-item {
      text-align: center;
      width: 46vw;
      height: 24vw;
      margin-bottom: 2vw;
    }
  }
}

.agent-signin-wrap {
  padding: 4vw;
  .bgLight;
  .flex;
  .flexCenter;
  flex-direction: column;
  .signin-text {
    .extraLarge;
    .boldText;
    margin: 2vw;
  }

  .el-button {
    .medium;
    font-weight: normal;
    border-radius: 12px;
    a {
      .whiteText;
    }
  }
}
</style>


