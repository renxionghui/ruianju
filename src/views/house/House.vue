<template>
  <div id="house">
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

    <!-- 面包屑 -->
    <el-row type="flex" justify="center" class="house-view">
      <el-col :span="18">
        <div class="house-view-breadcrumb">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item v-for="(item,index) of breadcrumb" :key="index">{{item}}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </el-col>
    </el-row>
    <!-- 联系方式 -->
    <el-row type="flex" justify="center">
      <el-col :span="18">
        <el-row type="flex">
          <el-col :span="14">
            <img :src="houseViewUrl" alt style="width:100%;height:auto;display:block" />
          </el-col>
          <el-col :span="10" :style="{height:'auto',backgroundImage:`url(${houseViewBg})`}">
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
                <el-input placeholder="您的邮箱"></el-input>
                <div class="contact-more">
                  <a href>显示更多房源照片</a>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>

    <!-- 房屋详情 -->
    <el-row class="house-detail" :gutter="12">
      <el-col :md="14" :offset="3">
        <div class="house-detial-price">
          <div class="detail-title">{{houseDetial.price}}</div>
          <p>
            房型:
            <span>{{houseDetial.houseType}}</span>
          </p>
          <p>
            地址:
            <span>{{houseDetial.addr}}</span>
          </p>
          <p>
            城市:
            <span>{{houseDetial.city}}</span>
          </p>
          <div style="height:12px;"></div>
          <a href class="view-map">查看地图</a>
          <div class="house-share">分享到:</div>
        </div>

        <div class="house-detail-descript">
          <div class="detail-title">
            <span>房屋</span>描述
          </div>
          <div class="descript-text">
            {{houseDetial.descriptText}}
            <a>查看更多>></a>
          </div>
        </div>
      </el-col>
      <el-col :md="7">
        <el-card :body-style="{backgroundColor:'#f0f0f0'}" shadow="hover">
          <div class="appointment-contact">
            <img :src="middlemanUrl" alt style="width:30%;height:auto" />
            <span class="middleman-name">{{appointmentContact.name}}</span>
            <span class="middleman-company">{{appointmentContact.company}}</span>
            <span class="middleman-phone">{{appointmentContact.phone}}</span>
            <el-input placeholder="您的姓名"></el-input>
            <el-input placeholder="您的邮箱"></el-input>
            <el-input type="textarea" placeholder="我对这个房源有兴趣，想要了解更多资讯。" :rows="4" resize="none"></el-input>
            <a href>预约看房</a>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 推荐房源 -->
    <el-row>
      <el-col class="house-recommend" :md="21" :offset="3">
        <div class="recommend-title">
          <span>推荐</span>房源
        </div>
      </el-col>
    </el-row>

    <!-- 走势图 -->
    <div id='chartvisio1'>

    </div>
  </div>
</template>
<script>
import logo from "../../assets/image/logo.png";
import houseView from "../../assets/image/house-view.jpeg";
import qrcode from "../../assets/image/qrcode.png";
import middleman from "../../assets/image/middleman.png";
export default {
  name: "House",
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
      houseViewUrl: houseView,
      houseViewBg: houseView,
      qrcodeUrl: qrcode,
      middlemanUrl: middleman,
      breadcrumb: [],
      houseDetial: {
        price: "$865,000",
        city: "白石",
        addr: "地址",
        houseType: "房型",
        descriptText: `A rare opportunity to own this stunning townhome unit situated in the quiet and unique location of The
Smith complex in South Surrey. Double side by side garage, timeless modern design and quality finish
offers you all the perfect living for your family. The main floor welcomes you with open living/dining area,
gourmet kitchen with quartz counter top and high-end appliances. Upper floor features 3 good sized bedrooms with 2 full baths. Recreation room on the ground floor that can be used as a bedroom walks out to
the private backyard. Minutes walk to all amenities, Southridge School, Morgan Shops area, grocery
stores, restaurants etc. Proud ownership of this fabulous townhouse!...`
      },
      appointmentContact: {
        name: "Elisa Yu",
        company: "麦当劳地产经纪 | 温哥华",
        phone: "604-279-9822"
      }
    };
  },
  mounted(){
    this.commitEmail();
    this.getListingInfo();
    this.getCrumbs();
    this.getAgentListing();
    // makeChart('chartvisio1', 286, [{col:'datadate', opt:'gte', val:'2019-02'+'周'},{col:'countyid',opt: 'eq', val: 'NorthVancouver'}]);
  },
  methods:{
    commitEmail(){
      let params = {
        userId : 'michellevaughan@shaw.ca',
        mls:'r2263487',
        email:'xxx@xxx.com',
        name:'aaaa',
        msg:'消息'
      }
      this.$post(this.$api.COMMIT_EMAIL,params).then(resData=>{
        console.log('邮箱提交',resData);
      })
    },
    getCrumbs(){
      let city = 'Mission';
      this.$get(`${this.$api.GET_CRUMBS}?city=${city}`).then(resData=>{
        console.log(resData);
        this.breadcrumb.push('全部');
        this.breadcrumb.push(resData.country);
        this.breadcrumb.push(resData.group);
        this.breadcrumb.push(resData.prov);
        this.breadcrumb.push(resData.city);
        this.breadcrumb.push(resData.county);
      })
    },
    getListingInfo(){
       let mls = 'r2263487'
       //r2003524
      
      this.$get(`${this.$api.GET_LISTING_INFO}?mls=${mls}`).then(resData=>{
        console.log(resData);
      })
    },
    getAgentListing(){
      let mls = 'r2263487'
      this.$get(`${this.$api.GET_AGENT_LISTING}?mls=${mls}`).then(resData=>{
        console.log('经纪人信息',resData);
      })
    }
  }
};
</script>
<style lang="less">
@import url("../../assets/css/base.less");
//图片基本路径
@image: "../../assets/image";
//头部
.index-header {
  //导航
  .nav-item {
    .primaryText;
    line-height: 100%;
    .medium;
    &:nth-child(2) {
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
        font-size: 14px;
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
      .base;
      line-height: 2rem;
    }

    .view-map {
      color: @white;
      padding: 4px 8px;
      border-radius: 4px;
      background-color: @themeColor;

      &:hover {
        opacity: 0.8;
      }
    }

    .house-share {
      position: absolute;
      right: 48px;
      top: 24px;
    }
  }

  .house-detail-descript {
    border-top: 1px solid @placeholderTextColor;
    margin: 2vw 0;

    .descript-text {
      .small;
      .regularText;

      a {
        color: @themeColor;
      }
    }
  }
}

// 经纪人
.appointment-contact {
  .flex;
  .flexCenter;
  flex-direction: column;

  span {
    line-height: 1.5rem;
  }

  .el-input {
    margin: 8px 0;
  }

  a {
    color: @white;
    background-color: @themeColor;
    padding: 8px 48px;
    margin-top: 24px;
    border-radius: 4px;
    &:hover {
      opacity: 0.8;
    }
  }

  .middleman-name {
    .boldText;
    .medium;
  }

  .middleman-company {
    .placeholderText;
    .small;
  }
}

//推荐房源
.house-recommend {
  border-top: 1px solid @placeholderTextColor;

  .recommend-title {
    .extraLarge;
    .boldText;
    line-height: 2em;

    span{
        border-bottom: 4px solid @themeColor;
    }
  }
}

#chartvisio1{
  width: 100%;
  height:500px;
}
</style>


