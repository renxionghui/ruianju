import Vue from 'vue'
import House from './House.vue'
import '../../assets/css/common.less'
import '../../plugins/element'
import 'element-ui/lib/theme-chalk/display.css';

new Vue({
    render: h => h(House)
  }).$mount('#house')