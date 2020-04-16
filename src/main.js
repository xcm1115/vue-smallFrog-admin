// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import animate from 'animate.css'
import axios from 'axios'
import VCharts from 'v-charts'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(axios)
Vue.use(animate)
Vue.use(VCharts)

// 设置反向代理，前端请求默认发送到 http://localhost:8443/api
// var axios = require('axios')
// axios.defaults.baseURL = 'http://localhost:8082/api'
// 全局注册，之后可在其他组件中通过 this.$axios 发送数据
// Vue.prototype.$axios = axios

/* eslint-disable no-new */

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} - smallFrog 后台管理系统`;
    const role = localStorage.getItem('id');
    if (!role && to.path !== '/login') {
        next('/login'); 
    } else {
        next();
    }
});

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
