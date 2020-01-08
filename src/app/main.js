// Vue.config.productionTip = false
//Vue 页面开发的根实例

import Vue from 'vue';                      //es6导入语法，导入vue。
import router from './router';            //导入路由对象
import store from './store';                    //导入仓库对象
import App from './App.vue';           //导入根组件
import './assets/css/miReset.css';      //导入小米专用复位样式
import http from './utils/http.js';

Vue.prototype.$http = http;             //注入到Vue原型对象中，扩展的属性潜规则加$


//创建根实例，并将根组件App渲染到挂载点#app。
let vm = new Vue({
        el: '#app',
        router,                                        //注入自定义的路由对象（router: router的简写）
        store,                                          //注入自定义的数据仓库（store: store的简写）
        components: { App },                //注册根组件
        template: '<App></App>'
});

