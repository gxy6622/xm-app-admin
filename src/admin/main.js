import Vue from 'vue';
import './assets/css/adminReset.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store';
import router from './router';
import App from './App.vue';


Vue.use(ElementUI);

let vm = new Vue({
        components: { App },
        el: '#app',
        store,
        router,
        template: '<App></App>'
});