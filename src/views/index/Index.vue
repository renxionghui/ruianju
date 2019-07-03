<template>
    <div id="index">
        <div class="index-header">
            <div class="logo"></div>
            <div class="nav">
                <a v-for="(item,index) of navList" :key="index" 
                    :href="item.url" class="nav-item"
                    >{{item.text}}</a>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'Index',
    data(){
        return{
            navList:[
                {
                    text:'首页',
                    url:'/',
                },
                {
                    text:'最新房源',
                    url:'/house.html'
                },
                {
                    text:'经济门户',
                    url:'/middleman.html'
                },
                {
                    text:'房价走势',
                    url:'/',
                },
                {
                    text:'全球资讯',
                    url:'/',
                },

            ]
        }
    }
}
</script>
<style lang="less" scoped>
    @import url("../../assets/css/common-color.less");
    .index-header{
        display: flex;
        justify-content: space-around;
        height: 86px;

        .logo{
           width: 140px;
           height: 86px;
           background-image: url('../../assets/image/logo.png');
           background-repeat: no-repeat;
           background-size: 100% 100%; 
        }

        .nav-item{
            line-height: 86px;           
        }
        .nav-item:nth-child(1){
            border-bottom: 2px solid @primaryColor;
        }

        .nav-item+.nav-item{
            margin-left: 24px;
        }


    }
</style>