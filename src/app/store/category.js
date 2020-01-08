
export default {
        namespaced: true,
        state: {
                mainList: [],           //分类页面所有一级分类列表
                subLists: {},           //所有用户看过的二级分类列表
                curCid: 0               //当前激活的一级分类的id值
        },
        getters: {
                subList(state, getters, rootState, rootGetters) {       //当前用户正在看的二级分类的列表
                        return state.subLists[state.curCid] || [];
                }
        },
        mutations: {
                _initMainList(state, payload) { state.mainList = payload },
                _changeCurCid(state, payload) { state.curCid = payload },
                _initSubLists(state, payload) {
                        let temp = {};
                        temp[state.curCid] = payload;
                        state.subLists = {
                                ...temp,
                                ...state.subLists
                        };
                }
        },
        actions: {
                initMainList({ commit, dispatch, rootState }) {        //初始化一级分类列表
                        rootState.http({ url: 'category/main' })
                                .then(data => {
                                        commit('_initMainList', data);
                                        dispatch('initSubLists', data[0].id)
                                });
                },
                initSubLists({ state, commit, rootState }, payload) {
                        commit('_changeCurCid', payload);
                        if(typeof state.subLists[payload] !== 'undefined') return;
                        rootState.http({
                                params: { id: payload },
                                url: 'category/sub'
                        })
                                .then(data => commit('_initSubLists', data));
                }
        }
};