export default {
        namespaced: true,
        state: {
                name: ''                //标识用户有没有登录
        },
        getters: {
                isLogin(state) { return state.name !== ''; }
        },
        mutations: {
                _login(state, payload) { state.name = payload; },
                logout(state) { state.name = ''; }
        },
        actions: {
                //登录，预估组件传过来的payload = {  name: ?, pwd: ? }
                login({ commit, rootState }, payload) {
                        rootState.http({
                                method: 'post',
                                data: payload,
                                url: '/admin/login'
                        })
                                .then(() => commit('_login', payload.name));
                },
                //修改密码,预估组件传过来的payload = {  name: ?, pwd: ?, newPwd: ? }
                password({ commit, rootState }, payload) {
                        rootState.http({
                                method: 'post',
                                data: payload,
                                url: '/admin/password'
                        })
                                .then(() => commit('logout'));
                }
        },
        modules: {}
}