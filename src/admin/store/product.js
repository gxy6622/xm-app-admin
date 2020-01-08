export default {
        namespaced: true,
        state: {
                list: []                //包含当前显示的所有商品
        },
        getters: {},
        mutations: {
                _updateList(state, payload) {           //payload穿过来的是data里面的list
                        console.log(payload);
                        state.list = payload;
                },
                uploadBanner(state, { id, filePath }) {
                        console.log(id, filePath);
                        //payload: { id: ??, filePath: ?? }
                        let i =state.list.findIndex(item => item.id === id);            //找到要改的元素的下标
                        let temp = { ...state.list[i] };                                                //重新创建一个对象
                        console.log(temp);
                        if(temp.bannerImgs !== '') {                                               //避免空的时候是‘，’
                                temp.bannerImgs = temp.bannerImgs.split(',');
                                temp.bannerImgs.push(filePath);
                                temp.bannerImgs = temp.bannerImgs.join(',');
                        } else temp.bannerImgs = filePath;
                        state.list.splice(i, 1, temp);
                },
                _removeBanner(state, { id, newBannerImgs }) {
                        let i = state.list.findIndex(item => item.id === id);
                        let temp = { ...state.list[i] };
                        temp.bannerImgs = newBannerImgs;
                        state.list.splice(i, 1, temp);                                          //删除第i个元素，然后整体用temp替换
                }
        },
        actions: {
                //预计发送的payload = { name: mId: ?, sId: ?, begin: ?, pageSize: ? }
                getData({ commit, rootState }, payload) {
                        return rootState.http({
                                method: 'post',
                                data: payload,
                                url: '/product/admin-list'
                        })
                                .then(data => {                 //data: { total: ??, list:[ ?,?,?... ] }
                                        console.log(data);
                                        commit('_updateList', data.list);
                                        return data.total;              //将total传给组件
                                })
                },
                //预计发送的payload = { id: ?, filePath: ? }
                removeBanner({ state, commit, rootState }, { id, filePath }) {
                        let oldBannerImgs = state.list.find(item => item.id === id).bannerImgs; //找出要删除的那条数据state.list.find(item => item.id === id)，这条数据包含一个bannerImgs属性，然后得到一个马上删除的oldBannerImgs
                        let newBannerImgs = '';                                 //只有一张旧banner时候
                        if(oldBannerImgs !== filePath) {                        //不止一张旧banner时候
                                let arr = oldBannerImgs.split(',');     //用split将oldbannerImgs变成一个数组
                                arr.splice(arr.indexOf(filePath), 1);   //arr.indexOf(filePath)找到要删除的元素在数组中的下标，splice返回的是被删除后的数组元素
                                newBannerImgs = arr.join(',');
                        }
                        return rootState.http({
                                        method: 'post',
                                        url: '/product/banner/remove',
                                        data: { id, filePath, newBannerImgs }
                                })
                                        .then(() => {
                                                commit('_removeBanner', { id, newBannerImgs });
                                        })
                }
        }
};