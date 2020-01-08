import axios from 'axios';
import { MessageBox } from 'element-ui';
import Cookies from 'js-cookie';
import router from '../router';

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
                        switch(result.status){
                                case 200:
                                        if(result.message !== '')
                                                return MessageBox.alert(result.message, {
                                                        title: '提示', type: 'success'
                                                }).then(() => result.data);
                                        else return result.data;
                                case 401:
                                        Cookies.set('target', router.history.current.fullPath);
                                        router.replace('/login');
                                case 404:
                                case 199:
                                case 500:
                                default:
                                        if(result.message !== '') MessageBox.alert(result.message, { title: '提示', type: 'warning' });
                                        return alwaysPeddingPromise;
                        }
                })
                .catch(error => {
                       MessageBox.alert(error.message, { title: '提示', type: 'error' });
                        return alwaysPeddingPromise;
                });
}

// export default myHttp;