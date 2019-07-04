import Vue from 'vue'
import Middleman from './Middleman.vue'
import '../../assets/css/common.less'
import '../../plugins/element'
import 'element-ui/lib/theme-chalk/display.css';

new Vue({
    render: h => h(Middleman)
  }).$mount('#middleman')