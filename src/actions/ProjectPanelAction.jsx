import axios from 'axios';
import history from '../history/history';
import store from '../stores/index';
import {
    OPEN_PROJECT,
    SHOW_NOTIFICATION
} from './types';
import UrlConf from "../constants/UrlConf";
import RequestBuilder from "../constants/RequestBuilder";

//axios配置
const config = {
    method: 'post'
};


export const LOGIN_ENDPOINT = 'http://localhost:8080/tiger-admin/user/login';
//这里是登录验证的actions，名字需要更改
// LOGIN ACTION
export function openProject(id) {
    console.log("openProject被调用");


    let accessToken = localStorage.getItem("accessToken");

    // POST username and password to API endpoint
    return axios.post(UrlConf.project.openProject(), RequestBuilder.parseRequest(accessToken, {"projectId": id}), config)
        .then(response => {

            if (response.data.respCode !== "00") {
                store.dispatch({
                    type: SHOW_NOTIFICATION,
                    payload: response.data.msg
                });
                return false;
            }

            // redirect to the route '/recordings'
            history.push('/taskboard');
        })
        .catch(error => {
            // If request fails
            console.log("调用失败");

        });

}
