<template>
  <div id="middleman">
    <!-- 头部 -->
    <div class="middleman-header">
      <common-header :nav-index="2"></common-header>
    </div>
    <!-- 大轮播图 -->
    <div class="middleman-banner">
      <img :src="bannerUrl" />
      <div class="banner-masker">
        <div class="agent-name">{{agentInfo.username}}</div>
        <div class="agent-corp">{{agentInfo.note||'海外房产投资估价'}} | {{agentInfo.corp|| '大温专业房产经纪人'}}</div>
        <div class="agent-visit">访问量：{{visitNum}}</div>
        <div class="agent-contact">
          <div class="contact-type" @click="showCTDialog=true">
            <span class="icon-contact banner-icon"></span>联系方式
          </div>
          <div class="chinese-service" @click="showCSDialog=true">
            <span class="icon-service banner-icon"></span>中文服务
          </div>
        </div>
      </div>
      <div class="banner-share">
        <a href>
          <img :src="require('../../assets/image/icon-facebook-white.svg')" alt />
        </a>
        <a href>
          <img :src="require('../../assets/image/icon-wechat-white.svg')" alt />
        </a>
        <a href>
          <img :src="require('../../assets/image/icon-weibo-white.svg')" alt />
        </a>
      </div>
    </div>

    <!-- 经纪人详情 -->
    <div class="middleman-detail">
      <div class="agent-head">
        <img :src="agentInfo.head2" alt class="agent-photo" />
        <span class="agent-auth" v-if="agentInfo.auth">认证经纪</span>
      </div>
      <div class="detail-descript">
        <div class="detail-title font-title">
          <span>个人</span>介绍
        </div>

        <div style="margin-top:2.4vw">
          <el-collapse-transition>
            <span v-if="showAgentMore">{{agentInfo.selfintro||normalAgentDesc}}</span>
            <span v-else class="descript-text">{{agentInfo.selfintro||normalAgentDesc}}</span>
          </el-collapse-transition>
        </div>

        <span class="more" @click="showAgentMore=!showAgentMore">{{showAgentMore?'收起':'详情'}}>></span>
      </div>
    </div>

    <!-- 推荐房源 -->
    <div class="middleman-recommend">
      <div :span="24" class="recommend-title font-title">推荐房源</div>
      <div class="recommend-list" v-if="recommendData.length>0">
        <div
          class="recommend-item"
          v-for="(item,index) of recommendData"
          :key="index"
          @mouseover="recommendHoverIndex = index"
          @mouseout="recommendHoverIndex = -1"
          :style="{backgroundImage:`url('${item.img}')`}">
          <div class="item-agent" v-show="recommendHoverIndex != index">
            <span v-if="item.listingtype">{{item.listingtype}}</span>
          </div>
          <transition name="el-fade-in-linear">
            <div class="item-detail" v-show="recommendHoverIndex == index">
              <div class="item-detail-price">{{item.price}}</div>
              <div class="item-detail-addr">{{item.address}}</div>
              <div class="item-detail-cityname">{{item.cityname}}</div>

              <div class="item-detail-housetype">{{item.housetype}} | {{item.areas}}</div>
              <div class="item-detail-roomcount">
                <span class="icon-furniture">{{item.bashroom}}</span>
                <span class="icon-bed" style="margin-left:12px;">{{item.bedroom}}</span>
              </div>

              <div class="item-detail-viewcount" style="margin-top:8px;">
                <span style="margin-right:12px; line-height:24px;">{{item.date}}</span>
                <span style="margin-right:12px; line-height:24px;" class="icon-eye">{{item.visit}}</span>
                <a :href="`/web/listing1/${item.listingid}`">查看房源</a>
              </div>
            </div>
          </transition>
        </div>
      </div>
      <div v-else class="recommend-list">
        <div
          class="recommend-item"
          :style="{backgroundImage:`url(${require('../../assets/image/default-house.jpg')}`}">
          <div class="item-agent">
            <span >敬请期待</span>
          </div>
        </div>
        <div
          class="recommend-item"
          :style="{backgroundImage:`url(${require('../../assets/image/default-house.jpg')}`}">
          <div class="item-agent">
            <span >敬请期待</span>
          </div>
        </div>
      </div>
      <div style="text-align:center">
        <span class="recommend-button" @click='handleCheckMore'>查看更多</span>
      </div>
    </div>

    <!-- 公司介绍 -->
    <div class="agent-corp-wrap">
      <div class="corp-video" @mouseover="showPlayButton=true" @mouseout="showPlayButton = false;">
        <div class="button-play" @click="playVideo" v-show="showPlayButton">
          <img :src="iconPlayButton" alt width="100%" height="100%" />
        </div>
        <div class="video-wrap">
          <video
            :src="agentInfo.corpVideo"
            v-if="agentInfo.corpVideo"
            width="100%"
            height="100%"
            style="object-fit:fill"
          ></video>
          <img :src="require('../../assets/image/default-house.jpg')" v-else alt width="100%" height="100%"/>
        </div>
      </div>
      <div class="corp-desc">
        <div class="desc-title font-title">
          <span>公司</span>简介
        </div>
        <div style="margin-top:2.4vw">
          <div v-if="showCorpMore">{{agentInfo.corpintro}}</div>
          <div class="desc-text" v-else>{{agentInfo.corpintro}}</div>
        </div>
        <span class="more" @click="showCorpMore=!showCorpMore">{{showCorpMore?'收起':'详情'}}>></span>
      </div>
    </div>

    <!-- 个人介绍 -->
    <div class="agent-personal-wrap">
      <div class="personnal-banner">
        <el-carousel :interval="3000" height="100%" width="100%" indicator-position="none">
          <el-carousel-item v-for="item of agentInfo.agentImgs" :key="item">
            <div class="banner-item" :style="{backgroundImage:`url(${item})`}"></div>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="personnal-desc">
        <div class="desc-title font-title">
          <span>关于</span>
        </div>
        <div style="margin-top:2.4vw">
          <div v-if="showAboutMore" class="desc-text-more">{{agentInfo.selfintro}}</div>
          <div v-else class="desc-text">{{agentInfo.selfintro}}</div>
        </div>

        <span class="more" @click="showAboutMore=!showAboutMore">{{showAboutMore?'收起':'详情'}}>></span>
      </div>
    </div>

    <!-- 联系方式 -->
    <div class="agent-contact-wrap">
      <div class="corp-logo">
        <img :src="agentInfo.logo" alt width="100%" height="100%" style="object-fit:contain"/>
      </div>
      <div class="contact-detail">
        <div class="detail-title font-title">
          <span>联系</span>方式
        </div>
        <div class="detail-name">{{agentInfo.username}}</div>
        <div class="detail-corp">{{agentInfo.corp||'大温专业房产经纪人'}} | {{agentInfo.cityName}} 房产经纪</div>
        <div class="detail-phone">
          <span>
            <img class="detail-icon" :src="require('../../assets/image/icon-phone.svg')" alt />
          </span>
          <span>{{agentInfo.tel}}</span>
        </div>
        <div class="detail-email">
          <span>
            <img class="detail-icon" :src="require('../../assets/image/icon-email.svg')" alt />
          </span>
          <span>{{agentInfo.email}}</span>
        </div>
        <div class="detail-addr">
          <span>
            <img class="detail-icon" :src="require('../../assets/image/icon-location.svg')" alt />
          </span>
          <span>{{agentInfo.address}}</span>
        </div>
        <div class="detail-website">
          <span>
            <img class="detail-icon" :src="require('../../assets/image/icon-www.svg')" alt />
          </span>
          <span>{{agentInfo.website}}</span>
        </div>
      </div>
    </div>

    <div class="fix-qrcode" v-show="showQrcode">
      <span class="el-icon-close qrcode-close" @click="showQrcode=false"></span>
      <img :src="agentInfo.qrcode" alt />
      <p style="text-align:center">扫一扫添加好友</p>
    </div>

    <!-- 免费注册 -->
    <div class="agent-signin-wrap">
      <span class="signin-text font-title">海外房产经纪人?</span>
      <el-button type="primary">免费注册</el-button>
    </div>
    <!-- 通用尾部 -->
    <CommonFooter></CommonFooter>

    <el-dialog :visible.sync="showCTDialog" width="80%" center :show-close="false">
      <div slot="title" class="dialog-title">
        <span>经纪人联系方式</span>
        <span class="el-icon-close dialog-close" @click="handleClose"></span>
      </div>
      <el-row>
        <el-col :span="10" style="text-align:center">
          <img :src="agentInfo.qrcode" alt width="80%" height="auto" />
          <p class="scan-add">扫一扫添加我为微信好友</p>
        </el-col>
        <el-col :span="14" class="contact-info">
          <p class="name">{{agentInfo.username}}</p>
          <p class="company">{{agentInfo.note||'海外房产投资估价'}} | {{agentInfo.cityName}}</p>
          <p class="contact-method">电话 | {{agentInfo.tel}}</p>
          <p class="contact-method">邮箱 | {{agentInfo.email}}</p>
          <p class="contact-method">地址 | {{agentInfo.address}}</p>
          <p class="contact-method">
            网站 |
            <a :href="`http://${agentInfo.website}`" target="_blank">{{agentInfo.website}}</a>
          </p>
        </el-col>
      </el-row>
    </el-dialog>

    <el-dialog :visible.sync="showCSDialog" width="64vw" center :show-close="false">
      <div slot="title" class="dialog-title">
        <span>中文服务</span>
        <span class="el-icon-close dialog-close" @click="handleClose"></span>
      </div>
      <div>
        <div style="width:26vw;float:left">
          <el-input placeholder="您的姓名" v-model="serviceParams.custname"></el-input>
          <el-input placeholder="您的邮箱" v-model="serviceParams.custemail"></el-input>
          <el-input
            placeholder="免费注册获取我的独家地产资讯"
            v-model="serviceParams.custmsg"
            type="textarea"
            :rows="3"
            resize="none"
          ></el-input>
          <el-button type="primary" @click="handleSend" :disabled="!canSend">发送</el-button>
        </div>
        <div style="width:22vw;float:right">
          <div class="dialog-chinese-service">
            <div class="qrcode">
              <p style="line-heigt:1.5em">扫一扫添加我为微信好友</p>
              <img :src="agentInfo.qrcode" alt/>
            </div>
            <p class="name">{{agentInfo.username2}}</p>
            <p class="contact-method">电话 | {{agentInfo.tel2}}</p>
            <p class="contact-method">邮箱 | {{agentInfo.email2}}</p>
          </div>
        </div>
        <div style="clear:both"></div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import logo from "../../assets/image/logo.png";
import banner from "../../assets/image/banner.jpg";
import middleman from "../../assets/image/middleman.png";
import qrcode from "../../assets/image/qrcode.png";
import CommonHeader from "../../components/CommonHeader";
import CommonFooter from "../../components/CommonFooter.vue";
import playIcon from "../../assets/image/icon-play.svg";
import pauseIcon from "../../assets/image/icon-pause.svg";
import { TweenLite } from "gsap/TweenLite";
import ScrollReveal from "scrollreveal";
import { setTimeout } from 'timers';
export default {
  name: "Middleman",
  components: { CommonHeader, CommonFooter },
  data() {
    return {
      logoUrl: logo,
      bannerUrl: banner,
      middlemanUrl: middleman,
      qrcodeUrl: qrcode,
      showCTDialog: false,
      showCSDialog: true,
      agentInfo: {},
      agentId: 222,
      sortMethod: "date",
      serviceParams: {
        custname: "", //姓名
        custemail: "", //邮箱
        custmsg: "" //留言
      },
      sr: ScrollReveal(),
      allRecommendData:[],
      recommendData: [],
      recommendHoverIndex: -1,
      visitData: {
        visit: 0,
        totalVist: 0
      },
      normalAgentDesc:'欢迎您来我的中文网站，我是一名专业的海外房产经纪人。在这里您将看到我的介绍，我所代理的特色房源和我的团队介绍，无论您是首次置业者或者专业的海外房产投资人，或者要售出您的房屋，我都能为您提供全程房屋买售服务与专业的海外房产置业方案。',
      showPlayButton: true,
      iconPlayButton: playIcon,
      video: null,
      showQrcode: true,
      showAgentMore: false,
      showCorpMore: false,
      showAboutMore: false
    };
  },
  computed: {
    canSend() {
      return (
        this.serviceParams.custname &&
        this.serviceParams.custemail &&
        this.serviceParams.custmsg
      );
    },
    visitNum() {
      return this.visitData.visit.toFixed(0);
    }
  },
  methods: {
    getOptions(beforeReveal = () => {}, afterReveal = () => {}) {
      let options = {
        duration: 500,
        delay: 100,
        reset: true,
        desktop: true,
        distance: "-100px",
        viewFactor: 0.1,
        beforeReveal,
        afterReveal
      };
      return options;
    },
    setScrollReveal() {
      this.sr.reveal(
        ".middleman-banner",
        this.getOptions(
          () => {
            this.visitData.visit = 0;
          },
          () => {
            if (this.visitData.totalVisit > 0) {
              TweenLite.to(this.visitData, 2, {
                visit: this.visitData.totalVisit
              });
            }
          }
        )
      );
      this.sr.reveal(".middleman-detail", this.getOptions());
      this.sr.reveal(".middleman-recommend", this.getOptions(()=>{
        this.showCSDialog = true;
      }));
      this.sr.reveal(".agent-corp-wrap", this.getOptions());
      this.sr.reveal(".agent-personal-wrap", this.getOptions());
      this.sr.reveal(".agent-contact-wrap", this.getOptions());
      this.sr.reveal(".agent-signin-wrap", this.getOptions());
      this.sr.reveal(".middleman-recommend .recommend-item", {
        reset: true,
        interval: 160
      });
    },
    handleCheckMore(){
      if(this.allRecommendData.length-this.recommendData.length==1){
        this.recommendData.push(this.allRecommendData[this.recommendData.length-1]);
      }else if(this.allRecommendData.length-this.recommendData.length>=2){
        this.recommendData.push(this.allRecommendData[this.recommendData.length-1]);
        this.recommendData.push(this.allRecommendData[this.recommendData.length]);
      }
    },
    handleClose() {
      this.showCTDialog = false;
      this.showCSDialog = false;
    },
    getAgentById() {
      this.$get(this.$api.AGENT_BYID + "/" + this.agentId).then(resData => {
        this.agentInfo = resData;
        console.log(this.agentInfo);
        this.agentInfo.username = this.agentInfo.username.toUpperCase();
        if(this.agentInfo.agentImgs.length==0){
          this.agentInfo.agentImgs.push(require('../../assets/image/default-house2.jpg'));
          this.agentInfo.agentImgs.push(require('../../assets/image/default-house3.jpg'));
        }
        this.visitData.totalVisit = parseInt(resData.visit);
        try {
          let metas = document.querySelectorAll("meta");
          metas[2].content = `${resData.username},${resData.username}房产经纪人,${resData.corp}${resData.username},${resData.note}`;
          metas[3].content = `${resData.username}是${resData.corp}的房产经纪人,${resData.note},${resData.username}是经过瑞安居认证的可信赖的房产经纪人,更多${resData.username}的信誉信息和正在经纪的海外房产信息就来海外瑞安居。`;
          let title = document.querySelector("title");
          title.innerHTML = `【${resData.username}房产经纪人_${resData.corp}_${resData.note}】-海外瑞安居RealtorAccess.com`;
        } catch (error) {
          console.log(error);
        }
        wxImgUrl = this.agentInfo.head2;
        TweenLite.to(this.visitData, 2, { visit: this.visitData.totalVisit });
        this.$nextTick(() => {
          this.setScrollReveal();
          if (this.agentInfo.corpVideo) {
            this.video = document.querySelector("video");
            console.log(this.video);
          }
        });
      });
    },
    getAgentListing() {
      this.$get(
        `${this.$api.AGENT_LISTINGS}/?id=${this.agentId}&sort=${this.sortMethod}`
      ).then(resData => {
        this.recommendData = resData.slice(0, 2);
        this.allRecommendData = resData;
        this.$nextTick(() => {
          this.setScrollReveal();
        });
      });
    },
    handleSend() {
      let params = {
        userid: agentInfo.userid,
        custname: serviceParams.custname,
        custemail: serviceParams.custemail,
        custmsg: serviceParams.custmsg
      };
      this.$post(this.$api.AGENT_CHINESE_SERVICE).then(resData => {
        this.$message({ type: "success", message: "发送成功" });
      });
    },
    playVideo() {
      if (this.agentInfo.corpVideo) {
        this.video.addEventListener("play", () => {
          this.iconPlayButton = pauseIcon;
        });
        this.video.addEventListener("ended", () => {
          this.iconPlayButton = playIcon;
          this.showPlayButton = true;
        });
        if (this.video.paused) {
          this.video.play();
          this.iconPlayButton = pauseIcon;
        } else {
          this.video.pause();
          this.iconPlayButton = playIcon;
        }
      }
    }
  },
  mounted() {
    let href = window.location.href;
    if (href.lastIndexOf("/") == href.length - 1) {
      href = href.substr(0, href.length - 1);
    }
    this.agentId = href.substring(href.lastIndexOf("/") + 1);
    // this.agentId = 13;
    this.getAgentById();
    this.getAgentListing();

    //经纪人信息
    /*
active: "1"  废弃
address: "202 - 1555 Marine Drive  West Vancouver,  BC"   住址
agentImgs: [,…]     关于 banner
agenttype: ""    废弃
auth: true       是否认证  true  false
city: "WestVan"    城市英文
cityName: "西温哥华"  城市中文
corp: "Royal Pacific Lions Gate Realty Ltd."  公司
corpVideo: ""   如果为空  放默认图片
corpintro: ""   公司介绍 英文
corpintro_cn: ""  公司介绍 中文
country: "Canada"  废弃
county: ""   废弃
datadate: "2019-02-13 14:35:28"
email: "Amir@AmirMiri.com"    经纪人邮箱
email2: "amir@amirmiri.com"   助理(中文服务) 邮箱
emailscd: "pause"   废弃
fname: "AMIR MIRI PREC*"   废弃
group: "REBGV"   省
head: "http://www.realtoraccess.com/data/agentimgs/Amirs_Headshot_with_Wall_Paper_background_-_20Nov18.jpeg"  个人介绍
head2: "http://www.realtoraccess.com/data/agentimgs/Amirs_Portrait_-_Head_Shot_-_25Oct17_copy.jpeg"
id: 222
lname: "阿密尔.米瑞"    废弃
logo: "http://www.realtoraccess.com/data/agentimgs/20181121143120.png"  联系方式
note: "温哥华金牌房地产经纪 真诚相待 信誉第一"   顶部签名
postid: "V7V 1H9"    废弃  邮编
prov: "BC"      废弃
qrcode: "http://www.realtoraccess.com/data/agentimgs/Amir6.jpg"   经纪人
qrcode2: "http://www.realtoraccess.com/data/agentimgs/Wechat.jpg"   中文服务

关于  个人介绍
selfintro: "让温哥华金牌房地产经纪阿密尔.米瑞帮助您选择最适合您的家！在西温哥华长大的阿密尔对西温、北温、温哥华市中心及周边地区的房地产动态了如指掌。他乐观向上的性格，积极努力敬业的品质和至尊服务的承诺，不仅在他的笑容上显示，从他的业绩及客户的高度评价更让您知道，为客户服务是他的首要宗旨。充分了解客户的需求后，阿密尔利用他的专业的谈判技巧及策略为他的客户拿到最理想的交易。无论是首次购房买家或者是经验丰富的房地产投资者，阿密尔都会为您提供专家指导和个性化解决方案。↵↵来自于一个充满了房地产投资专家、建筑师和室内设计师的家族，买卖房地产是在阿密尔的血液里，并且让他对房地产行业的各方面都有精深理解。阿密尔为自己诚垦助人的所做所为感到自豪，并尽心努力的发扬他的家族在房地产行业的诚信和声望。这种自豪感更促使他不断地更新自己的技能和对当前市场的理解，走在市场前端，阿密尔是房地产行业中少见的精英。↵↵持有瑞士两所大学的酒店管理和旅游双重荣誉学士学位，阿密尔深知优质服务的重要性，他所接受的教育和多年的高层工作经验，让他自如地应对最精锐的全球客户。曾经在世界上最独特的豪华酒店从事管理工作，包括四季酒店、凯宾斯基酒店集团，洲际酒店集团和喜达屋酒店集团，阿密尔深受客户及同事的爱戴。夜以继日地勤奋工作，阿密尔知道，服务于全球客户，一个灵活的时间表是必须的。↵↵温哥华被列为世界上最适合居住的城市之一，这意味着它的房地产市场是很有独特性的，您需要选择非常具有竞争力的房地产经纪做为您的代表。阿密尔利用他对这个城市的深入了解及广范的人脉网络，确保为他的客户争取到最优惠的价格。阿密尔的波斯背景和语言技能，以及他对加拿大、瑞士、中国、迪拜和伊朗的豪华服务经验，将会让您体验到专属温哥华豪华房地产市场的特点。↵↵是动物爱好者和足球迷的阿密尔，以诚实和正直的承诺对待客户，以及对业务的细心关注，使他在温哥华房地产界占有极大的竞争优势。阿密尔理解您需要做的努力和牺牲去得到您梦想的家园，这就是为什么他对待每一个交易就好像是自己的交易，对待每一个客户就好像是他的自己家族的一员。"
selfintro_cn: ""
teamintro: ""
teamintro_cn: ""
tel: "604.657.5030"   经纪人电话
tel2: "604-657-5030"  助理电话
userid: "amir@amirmiri.com"
username: "AMIR MIRI PREC* 阿密尔.米瑞"  经纪人姓名
username2: "Amir 阿密尔"  助理姓名
visit: 1480   访问量
website: "AmirMiri.com"  经纪人网站
    */
    // this.$http.get(host+'portal/agent/222')

    //推荐房源
    // let listingParams = {
    //   id: "222", //必填
    //   sort: "date" //排序  date:时间默认  price 价格   visit 访问量  -降序:-date -price  -visit
    // };
    /*
address: "209 1621 HAMILTON AVENUE"  地址
areas: "543 sqft."   面积
cityname: "北温哥华"  城市
date: "2018-11-19"
housetype: "公寓"   房屋类型
img: "http://www.realtoraccess.com/data/listings/r2312819_11_upload_from_dxc.jpg"  房屋图片
mls: "r2312819"   废弃
price: "$529,800"   价格
salestatus: "no"   出售状态
salestatus_name:''  出售状态
sptype: "smf"   废弃
token: "20181121102349"  
url: "http://www.webmainland.com/sp/listing/r2312819/?token=20181121102349"  链接
visit: 146  访问量
    */
    // this.$http.get(host+'portal/agent/listings',{params: {id: 222}})

    //中文服务 表单提交
    // let serviceParams = {
    //   userid: "amir@amirmiri.com",
    //   custname: "11111", //姓名
    //   custemail: "2222", //邮箱
    //   custmsg: "333333" //留言
    // };
    // this.$http.post(host+'portal/chinese/service/',serviceParams);
  }
};
</script>
<style lang="less">
@import url("../../assets/css/base.less");
#middleman {
  // width: 100vw;
  background-color: #fff;
}
@vw100: 100vw;
//图片基本路径
@image: "../../assets/image";
//头部
.middleman-header {
  padding: 0 12vw;
}

.middleman-banner {
  position: relative;
  img {
    width: 100%;
    height: auto;
    display: block;
  }
  .banner-share {
    position: absolute;
    display: flex;
    flex-direction: row;
    top: 48px;
    right: 64px;
    img {
      padding: 0.8vw;
      border: 3px solid #fff;
      width: 2.4vw;
      height: 2.4vw;
      margin: 1vw;
      border-radius: 1.2vw;

      &:hover {
        opacity: 0.8;
      }
    }
  }
  .banner-masker {
    position: absolute;
    .flex;
    flex-direction: column;
    .flexCenter;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background-color: rgba(66, 66, 66, 0.5);
    //姓名
    .agent-name {
      .mostLarge;
      .whiteText;
      .boldText;
      line-height: 2em;
    }
    //公司
    .agent-corp {
      font-size: 22px;
      .whiteText;
      line-height: 3em;
    }
    //访问量
    .agent-visit {
      .medium;
      .whiteText;
      position: absolute;
      bottom: 24px;
      left: 10%;
      border: 1px solid #fff;
      border-radius: 12px;
      padding: 12px 24px;
    }
    .agent-contact {
      display: flex;
      justify-content: center;

      .contact-type,
      .chinese-service {
        color: @white;
        margin: 2vw;
        .large;
        cursor: pointer;
        &:hover {
          opacity: 0.8;
        }

        .banner-icon {
          position: relative;
          padding: 12px;
          top: 2px;
        }
      }
    }
  }
}

.middleman-detail {
  padding: 3vw 2vw;
  display: flex;
  justify-content: center;

  .agent-head {
    position: relative;
    width: 36vw;
    margin: 2vw;
    .agent-photo {
      width: 90%;
      height: 90%;
    }
    .agent-auth {
      background-color: @themeColor;
      border-radius: 1.6vw;
      border-color: 1px solid @white;
      font-size: 1.6vw;
      position: absolute;
      padding: 0 1.3vw 0 3.2vw;
      height: 2.4vw;
      line-height: 2.4vw;
      bottom: 20%;
      left: 6%;
      box-sizing: border-box;
      color: @white;
      &::before {
        content: "V";
        border-radius: 50%;
        border: 2px solid @white;
        width: 2.4vw;
        height: 2.4vw;
        text-align: center;
        line-height: 2.4vw;
        .boldText;
        box-sizing: border-box;
        top: 0;
        left: 0;
        position: absolute;
      }
    }
  }

  .detail-descript {
    .regularText;
    .large;
    width: 36vw;
    margin: 2vw;
    .detail-title {
      .boldText;
      .extraLarge;
      span {
        padding-bottom: 12px;
        border-bottom: 6px solid @themeColor;
      }
    }
    .descript-text {
      .textLinesEllipsis(9);
      // margin-top: 2.4vw;
    }
    .more {
      color: @themeColor;
      cursor: pointer;
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

  .recommend-list {
    margin: 0 auto;

    .flex;
    .justifyCenter;
    flex-wrap: wrap;

    .recommend-item {
      @media screen {
        @media (max-width: 480px) {
          width: 40vw;
          height: 28vw;
        }

        @media (min-width: 481px) and (max-width: 1279px) {
          width: 38vw;
          height: 26vw;
        }

        @media (min-width: 1280px) and (max-width: 1439px) {
          width: 36vw;
          height: 24vw;
        }

        @media (min-width: 1440px) and (max-width: 1679px) {
          width: 34vw;
          height: 22vw;
        }

        @media (min-width: 1680px) {
          width: 32vw;
          height: 20vw;
        }
      }

      margin: 24px 12px;
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
    border-bottom: 1px solid @themeColor;
    line-height: 4em;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
}

.agent-corp-wrap {
  padding: 3vw 2vw;
  display: flex;
  justify-content: center;
  .corp-video {
    .flex;
    .flexCenter;
    margin: 2vw;
    flex-direction: column;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    width: 36vw;
    height: 24vw;
    position: relative;
    .button-play {
      width: 2vw;
      height: 2vw;
      padding: 2vw;
      .flex;
      .flexCenter;
      background-color: #fff;
      border-radius: 50%;
      transition: all 0.3s;
      position: absolute;
      z-index: 2;
      &:hover {
        transform: scale(1.1);
        opacity: 0.8;
      }
    }
    .video-wrap {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 1;
      top: 0;
      left: 0;
    }
  }

  .corp-desc {
    margin: 2vw;
    width: 36vw;
    .large;
    .desc-title {
      .extraLarge;
      .boldText;
      .primaryText;
      span {
        padding-bottom: 12px;
        border-bottom: 6px solid @themeColor;
      }
    }

    .desc-text {
      .large;
      .textLinesEllipsis(7);
    }
    .more {
      cursor: pointer;
      .themeText;
      .large;
      &:hover {
        opacity: 0.8;
      }
    }
  }
}

.agent-personal-wrap {
  padding: 3vw 2vw;
  display: flex;
  justify-content: center;
  .bgLight;
  .el-carousel--horizontal {
    height: 100%;

    .el-carousel__arrow {
      width: 48px;
      height: 48px;
      background-color: #fff;
      .themeText;
      font-size: 24px;
      .boldText;
    }
  }
  .personnal-banner {
    margin: 2vw;
    width: 36vw;
    height: 24vw;
    .banner-item {
      background-repeat: no-repeat;
      background-size: 100% 100%;
      height: 24vw;
    }
  }
  .personnal-desc {
    margin: 2vw;
    width: 36vw;
    .large;
    .desc-title {
      .extraLarge;
      .boldText;
      .primaryText;
      span {
        padding-bottom: 12px;
        border-bottom: 6px solid @themeColor;
      }
    }

    .desc-text {
      .large;
      .textLinesEllipsis(7);
    }
    .more {
      cursor: pointer;
      .themeText;
      .large;
      &:hover {
        opacity: 0.8;
      }
    }
  }
}

.agent-contact-wrap {
  padding: 3vw 2vw;
  display: flex;
  justify-content: center;
  .corp-logo {
    margin: 2vw;
    width: 36vw;
    height: 24vw;
    .flex;
    .flexCenter;
  }

  .contact-detail {
    margin: 2vw;
    width: 36vw;
    height: 24vw;
 
    .detail-title {
      .extraLarge;
      .boldText;
      .primaryText;
      line-height: 4.6vw;
      span {
        padding-bottom: 12px;
        border-bottom: 6px solid @themeColor;
      }
    }

    .detail-name {
      margin-top: 2.4vw;
      .large;
      .boldText;
      .primaryText;
      line-height: 2vw;
    }

    .detail-corp {
      .large;
      color: #a9854e;
      .textOverflowEllipsis;
      margin-bottom: 2.4vw;
      line-height: 3vw;
    }

    .detail-addr,
    .detail-phone,
    .detail-email,
    .detail-website {
      .large;
      .textOverflowEllipsis;
      .regularText;
      line-height: 2.4vw;
      .detail-icon {
        position: relative;
        margin-right: 12px;
        
        top: 6px;
        @media (max-width: 480px) {
          width: 20px;
          height: 20px;
        }

        @media (min-width: 481px) and (max-width: 1279px) {
          width: 24px;
          height: 24px;
        }

        @media (min-width: 1280px) and (max-width: 1439px) {
          width: 28px;
          height: 28px;
        }

        @media (min-width: 1440px) and (max-width: 1679px) {
          width: 32px;
          height: 32px;
        }

        @media (min-width: 1680px) {
          width: 36px;
          height: 36px;
        }
      }
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
  }
}

.fix-qrcode {
  padding: 1vw;
  position: fixed;
  width: 12vw;
  z-index: 11;
  font-size: 1.2vw;
  background-color: #fff;
  border-radius: 1.2vw;
  .themeText;
  top: 50%;
  left: 0;
  margin-top: -6vw;
  img {
    width: 12vw;
    height: 12vw;
  }
  .qrcode-close {
    font-size: 1.4vw;
    .boldText;
    position: absolute;
    .themeText;
    left: 0.6vw;
    top: 0.6vw;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
}

.el-dialog {
  border-radius: 12px !important;
  padding: 0 4vw;

  .dialog-title {
    .extraLarge;
    .boldText;
    line-height: 3em;
    border-bottom: 1px solid @secondaryTextColor;

    .dialog-close {
      float: right;
      cursor: pointer;
      line-height: 3em;
      .boldText;
      &:hover {
        opacity: 0.8;
        color: @themeColor;
      }
    }
  }
  .scan-add {
    color: @themeColor;
    .medium;
  }

  .contact-info {
    .name {
      .boldText;
      .primaryText;
      .large;
      margin-top: 24px;
    }

    .company {
      .large;
      color: rgb(171, 137, 90);
      margin-bottom: 2vw;
    }

    .contact-method {
      .large;
      line-height: 2em;
      .secondaryText;
      .textOverflowEllipsis;
      a {
        .secondaryText;
      }
    }
  }

  .dialog-chinese-service {
    line-height: 2em;
    .qrcode {
      width: 240px;
      text-align: left;
      p {
        color: @themeColor;
        .base;
      }
      img {
        width: 13.6vw;
        height: 13.6vw;
      }
    }

    .name {
      .boldText;
      .primaryText;
      .large;
      line-height: 2em;
    }

    .contact-method {
      .medium;
      .secondaryText;
      .textOverflowEllipsis;
      text-align: left;
      line-height: 1.5em;
    }
  }

  .el-input {
    .medium;
    margin-bottom: 24px;

    .el-input__inner {
      height: 56px;
      line-height: 56px;
    }
  }

  .el-textarea {
    .medium;
  }

  .el-button {
    margin-top: 24px;
    width: 100%;
    .medium;
  }
}
</style>


