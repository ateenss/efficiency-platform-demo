import axios from 'axios';
import history from '../history/history';
import store from '../stores/index';
import {
    AUTH_USER,
    SENT_AUTH,
    UNAUTH_USER,
    AUTH_ERROR,
    FETCH_RECORDINGS,
    FETCHING_RECORDINGS,
    FETCH_ERROR,
    TOGGLE_CONFIRM_LOGOUT,
    AUTH_VALIDATE,
    UNAUTH_VALIDATE
} from './types';

//axios配置
const config={
    method: 'post'
};


export const LOGIN_ENDPOINT = 'http://172.20.182.141:8080/tiger-admin/user/login';
const RECORDINGS_ENDPOINT='hha';
//这里是登录验证的actions，名字需要更改
// LOGIN ACTION
export function loginUser({ email, password }) {
    console.log("loginuser被调用");
    console.log({ email, password });

    store.dispatch({ type: SENT_AUTH });
        // POST email and password to API endpoint
        return axios.post(LOGIN_ENDPOINT, {"version":"1.0","data":{username:email, pwd:password} },config)
            .then(response => {
                // If request is successful:
                console.log("返回成功"+response.data.respCode);
                // update state to authenticate user
                store.dispatch({ type: AUTH_USER });

                // store JWT token
                localStorage.setItem('token', response.data.token);

                // redirect to the route '/recordings'
                history.push('/dashboard');
                console.log("我是历史："+history);
                console.log(history.location);
            })
            .catch(() => {
                // If request fails
                console.log("调用失败");
                // update state to show error to user
                store.dispatch({
                    type: AUTH_ERROR,
                    payload: 'Invalid credentials.'
                });
            });

}

export function validate(){
    store.dispatch({type:AUTH_VALIDATE})
}
export function Unvalidate(){
    store.dispatch({type:UNAUTH_VALIDATE})
}

// LOGOUT ACTION
export function logoutUser() {
    localStorage.removeItem('token');

    return { type: UNAUTH_USER };
}

// FETCH RECORDINGS
export function fetchRecordings() {
    return function(dispatch) {
        dispatch({ type: FETCHING_RECORDINGS });

        const token = localStorage.getItem('token');

        // POST email and password to API endpoint
        return axios.get(RECORDINGS_ENDPOINT, {
            headers: { 'Authorization' : `JWT ${token}` }
        })
            .then(response => {
                // If request is successful:

                // dispatch fetch_recordings
                dispatch({
                    type: FETCH_RECORDINGS,
                    payload: response.data.results
                });
            })
            .catch(error => {
                // If request fails

                // update state to show error to user
                dispatch({
                    type: FETCH_ERROR,
                    payload: error.message
                });
            });
    }
}

// CONFIRM LOGOUT
export function confirmLogout() {
    return { type: TOGGLE_CONFIRM_LOGOUT };
}