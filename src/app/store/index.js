//仓库配置
import Vue from 'vue';
import Vuex from 'vuex';
import http from '../utils/http.js';
//导入所有子仓库
import category from './category.js';
import product from './product.js';
import alert from './alert.js';
//向vue体系注入vuex仓库体系
Vue.use(Vuex);
//创建仓库对象并导出
export default new Vuex.Store({
        //保存要放在仓库中的东西
        state: {
                http
        },
        //存入仓库的计算属性
        getters: {},
        //只有mutations中的方法代码可以直接修改state中保存的数据（同步不耗时的代码）
        mutations: {},
        //主要存放异步耗时的代码,ajax信息
        actions: {},
        //子仓库
        modules: { category, product, alert }
});
