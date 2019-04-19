import axios from 'axios';
import history from '../history/history';
import store from '../stores/index';
import {
    AUTH_USER,
    SENT_AUTH,
    UNAUTH_USER,
    AUTH_ERROR, SHOW_NOTIFICATION
} from './types';
import UrlConf from "../constants/UrlConf";
import {error, success} from "./NotificationAction";
//axios配置
const config = {
    method: 'post',
    changeOrigin: true
};


export const LOGIN_ENDPOINT = UrlConf.base + 'user/login';
//这里是登录验证的actions，名字需要更改
// LOGIN ACTION
export function loginUser({username, password}) {
    store.dispatch({type: SENT_AUTH});
    // POST username and password to API endpoint
    return axios.post(LOGIN_ENDPOINT, {"version": "1.0", "data": {username: username, pwd: password}}, config)
        .then(response => {

            if (response.data.respCode !== "00") {
                error(response.data.msg);
                return false;
            }

            if (response.data.data.accessToken !== "" && response.data.data.accessToken !== undefined) {
                store.dispatch({type: AUTH_USER});
            }
            localStorage.setItem('currentUser',response.data.data.currentUser);
            localStorage.setItem('token', response.data.data.accessToken);
            localStorage.setItem('permInfo', JSON.stringify(response.data.data.permInfo));

            history.push('/');
        })
        .catch(error => {
            // If request fails
            console.log("调用失败");
            // update state to show error to user
            store.dispatch({
                type: AUTH_ERROR,
                payload: 'Invalid credentials.'
            });
        });

}


// LOGOUT ACTION
export function logoutUser() {
    localStorage.removeItem('token');

    return {type: UNAUTH_USER};
}