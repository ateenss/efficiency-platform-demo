import {
    SHOW_NOTIFICATION,
    SINGLE_SELECT_VALUE,
    INIT_PROJECT_MEMBERS, START_LOADING, STOP_LOADING, CHANGE_PASSWORD, SAVE_CHANGE_PASSWORD,CLOSE_CHANGE_PASSWORD,SYS_INIT
} from './types';
import axios from "axios";
import store from "../stores";
import UrlConf from "../constants/UrlConf";
import {error} from "./NotificationAction";
import history from "../history/history";
import {getRecentIteration} from "./IterationAction";

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
export const GET_MODULES = UrlConf.base + 'modules/getModules';

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

export function sysInit(afterInit){

    let defaultTimeout = 1000 * 60 * 60

    let fetchFromRemote = false;

    let accessToken = localStorage.getItem("token");

    function getProjectMembers() {
        return axios.post(GET_PROJECT_MEMBERS, {"version": "1.0", accessToken: accessToken}, config);
    }

    function getModules() {
        return axios.post(GET_MODULES, {"version": "1.0", accessToken: accessToken}, config);
    }

    let projectMember = localStorage.getItem("projectMembers");
    let modules = localStorage.getItem("modules");

    let pm = JSON.parse(projectMember);
    let ml = JSON.parse(modules);

    let timeout = false;
    let cur = new Date().getTime();
    if((!!pm && (cur - pm.timeout > defaultTimeout)) || (!!ml && (cur - ml.timeout > defaultTimeout))){
        timeout = true;
    }

    if(!projectMember || !modules || timeout){

        fetchFromRemote = true;

        let curTime = new Date().getTime();

        axios.all([getProjectMembers(), getModules()]).then(axios.spread(function (members, modules) {

            localStorage.setItem("projectMembers",JSON.stringify( {data : members.data.data, timeout : curTime}));
            localStorage.setItem("modules", JSON.stringify({data : modules.data.data, timeout : curTime}));

            afterInit({
                projectMembers : members.data.data,
                modules : modules.data.data
            });

            return false;

        }));

    }

    !timeout && !fetchFromRemote && afterInit({
        projectMembers : JSON.parse(projectMember).data,
        modules : JSON.parse(modules).data
    });


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