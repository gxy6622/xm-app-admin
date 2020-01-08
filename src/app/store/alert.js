export default {
        namespaced: true,
        state: {
                isShow: false,
                message: ''
        },
        getters: {},
        mutations: {
                open(state, payload) {
                        state.isShow = true;
                        state.message = payload;
                },
                close(state) {
                        state.isShow= false;
                        state.message = '';
                }
        },
        actions: {}
}