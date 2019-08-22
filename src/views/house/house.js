import Vue from 'vue'
import House from './House.vue'
import '../../assets/css/common.less'
import '../../plugins/element'
import 'element-ui/lib/theme-chalk/display.css';
import '../../assets/css/element-theme.css';
import axios from 'axios';
import api from './api';
import {Message} from 'element-ui';
import '../../assets/css/icon.css'
import VueLazyLoad from 'vue-lazyload'
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';
Vue.component(CollapseTransition.name, CollapseTransition)

Vue.use(VueLazyLoad)

Vue.prototype.$api = api;
Vue.prototype.$message = Message;
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

Vue.prototype.$post = (url,params) => {
  return new Promise((resolve, reject) => {
    axios.post(url,params).then(res => {
      if (res.status == 200) {
        if (res.data.code == '00') {
          resolve(res.data.data);
        } else {
          reject('请求失败');
        }
      }
    })
  })
}

new Vue({
    render: h => h(House)
  }).$mount('#house')