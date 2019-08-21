import Vue from 'vue'
import Index from './Index.vue'
import '../../assets/css/common.less'
import '../../plugins/element'
import 'element-ui/lib/theme-chalk/display.css';
import '../../assets/css/icon.css';
import '../../assets/css/element-theme.css';
import axios from 'axios';
import api from './api';
import VueLazyLoad from 'vue-lazyload'

Vue.use(VueLazyLoad,{attempt:3})

Vue.prototype.$api = api;
Vue.prototype.$get = (url)=>{
  return new Promise((resolve,reject)=>{
    axios.get(url).then(res=>{
      if(res.status == 200){
        if(res.data.code == '00'){
          resolve(res.data.data);
        }else{
          reject('请求失败');
        }
      }
    })
  })
}
new Vue({
    render: h => h(Index)
  }).$mount('#index')
