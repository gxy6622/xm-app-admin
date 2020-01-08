//列表的子仓库

export default {
        namespaced: true,
        state: {
                list: [],
                pageSize: 6
        },
        getters: {},
        mutations: {
                _resetData(state) {
                        state.list = [];
                        // state.hasMore = true;
                },
                // _beginAjax(state) { state.isLoading = true; },
                _endAjax(state, payload) {
                        // state.isLoading = false;
                        // if(payload.length < state.pageSize) state.hasMore = false;
                        if(payload.length > 0) state.list = state.list.concat(payload);
                }
        },
        actions: {
                //组件调用不用加下杠
                //调用mutation，不管是组件调用还是仓库自己的调用，都是commit
                //{ subId:??, loadMore: true }
                getData({ state, commit, rootState }, { subId, loadMore }) {
                        if(!loadMore) commit('_resetData');
                        //commit('_beginAjax');                                                  //开始请求数据，显示loading
                        return rootState.http({
                                method: 'post',                                                 //请求的类型
                                data: {
                                        cid: subId,
                                        begin: state.list.length,                                //从第几条开始拿数据
                                        count: state.pageSize                                  //这次请求要多少条数据
                                },   //请求携带的参数
                                url: 'product/list',                                            //请求的路由地址
                        })
                                .then(data => {
                                        commit('_endAjax', data);                              //数据请求完毕，关闭loading
                                        return data.length === state.pageSize;
                                        // if(data.length < state.pageSize) state.hasMore =false;
                                        // if(data.length > 0) state.list = state.list.concat(data);         //追加数据加载
                                });
                }
        }
};