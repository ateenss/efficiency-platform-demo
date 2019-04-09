import {
    SHOW_NOTIFICATION,
    SINGLE_SELECT_VALUE,
    INIT_PROJECT_MEMBERS, START_LOADING, STOP_LOADING
} from './types';
import axios from "axios";
import store from "../stores";


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
export const GET_PROJECT_MEMBERS = 'http://localhost:8080/tiger-admin/member/getProjectMembers';
export const GET_ALL_MEMBERS = 'http://localhost:8080/tiger-admin/member/getAllMembers';


export const GET_BY_CODE = 'http://localhost:8080/tiger-admin/iteration/get';
export const SAVE = 'http://localhost:8080/tiger-admin/iteration/save';
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
    }, 1000);
}

export function getProjectMembers(doAfterInit) {

    let accessToken = localStorage.getItem("accessToken");


    return axios.post(GET_PROJECT_MEMBERS, {"version": "1.0"}, config)
        .then(response => {

            if (response.data.respCode !== "00") {
                store.dispatch({
                    type: SHOW_NOTIFICATION,
                    payload: response.data.msg
                });
                return false;
            }

            store.dispatch({
                type : INIT_PROJECT_MEMBERS,
                payload : response.data.data

            });

        })
        .catch(error => {
            // If request fails
            console.log("!!!!!!!调用失败" + JSON.stringify(error));
            // update state to show error to user

        });
}