import axios from 'axios';
import Cookies from 'js-cookie';
import router from '../router';
import store from '../store';

var alwaysPeddingPromise = new Promise(() => {});
export default function (option) {
        var defaultOption = {
                ...option,
                withCredentials: true,
                timeout: 5000
        };
        return axios(defaultOption)
                .then(response => response.data || JSON.parse(response.request.responseText))
                .then(result =>{
                        if(result.message !== '') store.commit('alert/open', result.message);
                        switch(result.status){
                                case 200:
                                        return result.data;
                                case 401:
                                        Cookies.set('target', router.history.current.fullPath);
                                        router.replace('/login');
                                case 404:
                                case 199:
                                case 500:
                                default:
                                        return alwaysPeddingPromise;    //catch如果不返回一个永远pedding的Promise对象，会一直默认成功，调用后面的then
                        }
                })
                .catch(error => {
                        store.commit('alert/open', error.message);
                        return alwaysPeddingPromise;
                });
}

// export default myHttp;