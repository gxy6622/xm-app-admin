import Vue from 'vue';
import Vuex from 'vuex';
import tab from './tab.js';
import category from './category.js';
import product from './product.js';
import http from '../utils/http.js';
import login from './login.js';


Vue.use(Vuex);

export default new Vuex.Store({
        state: { http },
        getters: {},
        mutations: {},
        actions: {},
        modules: { tab, category, login, product }
});