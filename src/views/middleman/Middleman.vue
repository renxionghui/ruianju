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
      <div class="banner-masker">
        <div class="contact-type" @click="showCTDialog=true">
          <span class="el-icon-s-order"></span>联系方式
        </div>
        <div class="chinese-service" @click="showCSDialog=true">
          <span class="el-icon-s-order"></span>中文服务
        </div>
      </div>
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

    <el-dialog :visible.sync="showCTDialog" width="60%" center :show-close="false">
      <div slot="title" class="dialog-title">
        <span>经纪人联系方式</span>
        <span class="el-icon-close dialog-close" @click="handleClose"></span>
      </div>
      <el-row>
        <el-col :span="10" style="text-align:center">
          <img :src="qrcodeUrl" alt width="80%" height="auto" />
          <p class="scan-add">扫一扫添加我为微信好友</p>
        </el-col>
        <el-col :span="14" class="contact-info">
          <p class="name">ELISA YU</p>
          <p class="company">麦当劳地产经纪 | 温哥华</p>
          <p class="contact-method">电话 | 604-279-9822</p>
          <p class="contact-method">邮箱 | elisayu.realty@gmail.com</p>
          <p class="contact-method">地址 | 5188 Westminser HWY</p>
          <p class="contact-method">网站 | www.elisayu.com</p>
        </el-col>
      </el-row>
    </el-dialog>

    <el-dialog :visible.sync="showCSDialog" width="60%" center :show-close="false">
      <div slot="title" class="dialog-title">
        <span>中文服务</span>
        <span class="el-icon-close dialog-close" @click="handleClose"></span>
      </div>
      <el-row :gutter="12">
        <el-col :span="12">
          <el-input placeholder="您的姓名"></el-input>
          <el-input placeholder="您的邮箱"></el-input>
          <el-input placeholder="免费注册获取我的独家地产资讯" type="textarea" :rows="3" resize="none"></el-input>
          <el-button type="primary">发送</el-button>
        </el-col>
        <el-col :span="12" >
          <div>
            <p >扫一扫添加我为微信好友</p>
            <img :src="qrcodeUrl" alt width="50%" height="auto" />
          </div>
          
          
        </el-col>
        
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
import logo from "../../assets/image/logo.png";
import banner from "../../assets/image/banner.png";
import middleman from "../../assets/image/middleman.png";
import qrcode from "../../assets/image/qrcode.png";
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
      middlemanUrl: middleman,
      qrcodeUrl: qrcode,
      showCTDialog: false,
      showCSDialog: false
    };
  },
  methods: {
    handleClose() {
      this.showCTDialog = false;
      this.showCSDialog = false;
    }
  },
  mounted(){
    console.log(window.location.href);
    let agnetId = `${agnetId}`
    let host = 'http://192.168.43.233:8000/'
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
    let listingParams = {
      id:'222',//必填
      sort:'date'//排序  date:时间默认  price 价格   visit 访问量  -降序:-date -price  -visit
    }
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
    let serviceParams = {
        userid:'amir@amirmiri.com',
        custname:'11111',//姓名
        custemail:'2222',//邮箱
        custmsg:'333333'//留言
      
    }
    // this.$http.post(host+'portal/chinese/service/',serviceParams);
  }
};
</script>
<style lang="less">
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
    .flex;
    .flexCenter;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.6);

    .contact-type,
    .chinese-service {
      color: @white;
      margin: 2vw;
      .large;
      cursor: pointer;
      &:hover {
        opacity: 0.8;
      }
    }
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

.el-dialog {
  border-radius: 12px !important;
  padding: 0 4vw;

  .dialog-title {
    .large;
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
    line-height: 3em;
  }

  .contact-info{
    .name{
      .boldText;
      .primaryText;
      .large;
    }

    .company{
      .medium;
      color: rgb(171, 137, 90);
      margin-bottom: 2vw;
    }

    .contact-method{
      .medium;
      line-height: 1.5em;
      .secondaryText;
    }

  }

  .el-input{
    margin-bottom: 2vw;
  }

  .el-button{
    margin-top: 2vw;
    width: 100%;
  }
}
</style>


