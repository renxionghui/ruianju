import Vue from 'vue'
import House from './House.vue'
import '../../assets/css/common.less'
import '../../plugins/element'
import 'element-ui/lib/theme-chalk/display.css';
import axios from 'axios';
import api from './api';

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
    render: h => h(House)
  }).$mount('#house')