import Vue from 'vue'
import Index from './Index.vue'
import '../../assets/css/common.less'
import '../../plugins/element'

new Vue({
    render: h => h(Index)
  }).$mount('#index')
