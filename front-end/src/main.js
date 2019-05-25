// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// Import Bootstrap css files
import 'bootstrap/dist/css/bootstrap.css'
// register the vue-toasted plugin on vue
import VueToasted from 'vue-toasted'
//导入配置了全局拦截器的axios
import axios from './http'
// 导入moment.js 用于格式化UTC时间为本地时间
import moment from 'moment'


Vue.use(VueToasted, {
  // 主题样式 primary/outline/bubble
  theme: 'bubble',
  // 显示在页面哪个位置
  position: 'top-center',
  // 显示多久时间（毫秒）
  duration: 3000,
  // 支持哪个图标集合
  iconPack : 'material', // set your iconPack, defaults to material. material|fontawesome|custom-class
  // 可以执行哪些动作
  action: {
    text: 'Cancel',
    onClick: (e, toastObject) => {
      toastObject.goAway(0)
    }
  },
});

Vue.config.productionTip = false
// 将 axios 挂在到prototype上 组件中可以直接使用this.$axios访问
Vue.prototype.$axios = axios
// 将$moment 挂在到prototype上， 在组件中可以使用 this.$moment访问
Vue.prototype.$moment = moment

/* eslint-disable no-new */
// 创建一个vue实例
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
