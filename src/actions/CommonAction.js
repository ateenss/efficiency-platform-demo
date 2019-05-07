import {
    SHOW_NOTIFICATION,
    SINGLE_SELECT_VALUE,
    INIT_PROJECT_MEMBERS, START_LOADING, STOP_LOADING, CHANGE_PASSWORD, SAVE_CHANGE_PASSWORD,CLOSE_CHANGE_PASSWORD
} from './types';
import axios from "axios";
import store from "../stores";
import UrlConf from "../constants/UrlConf";
import {error} from "./NotificationAction";
import history from "../history/history";

export const changSingleSelectValue=(value)=>({
    type:SINGLE_SELECT_VALUE,
    value
});


//axios配置
const config = {
    method: 'post',
    headers: {'Content-Type': 'application/json;charset=utf-8'},
    inCharset: "utf-8",
    outCharset: "utf-8"
};
export const GET_PROJECT_MEMBERS = UrlConf.base + 'member/getProjectMembers';
export const GET_ALL_MEMBERS = UrlConf.base + 'member/getAllMembers';
export const SAVE_PASSWORD = UrlConf.base + 'member/changePassword';


export const GET_BY_CODE = UrlConf.base + 'iteration/get';
export const SAVE = UrlConf.base + 'iteration/save';
export function startLoading(){
    store.dispatch({
        type: START_LOADING
    });
}
export function stopLoading(){
    setTimeout(function(){
        store.dispatch({
            type: STOP_LOADING
        });
    }, 500);
}

export function getProjectMembers(doAfterInit) {

    let accessToken = localStorage.getItem("token");


    return axios.post(GET_PROJECT_MEMBERS, {"version": "1.0"}, config)
        .then(response => {

            if (response.data.respCode !== "00") {
                error(response.data.msg);
                return false;
            }

            store.dispatch({
                type : INIT_PROJECT_MEMBERS,
                payload : response.data.data

            });

        })
        .catch(e => {
            error("后台拉取数据失败",JSON.stringify(e));

        });
}

export function showChangePassword(){

    store.dispatch({
        type:CHANGE_PASSWORD
    })
}

export function closeChangePassword(){
    store.dispatch({
        type:CLOSE_CHANGE_PASSWORD
    })
}

export function saveChangePassword(data){


    let accessToken = localStorage.getItem("token");


    return axios.post(SAVE_PASSWORD, {"version": "1.0", accessToken : accessToken, data : data}, config)
        .then(response => {

            if (response.data.respCode !== "00") {
                error(response.data.msg);
                return false;
            }

            store.dispatch({
                type : SAVE_CHANGE_PASSWORD
            });

            localStorage.removeItem("token");
            history.push("/login");

        })
        .catch(e => {
            error("后台拉取数据失败",JSON.stringify(e));
        });


}