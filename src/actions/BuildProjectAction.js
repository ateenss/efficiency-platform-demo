import axios from 'axios';
import store from '../stores/index';
import {
    BUILD_SAVE_PROJECT,
    EDIT_SAVE_PROJECT,
    OPEN_BUILD_PROJECT,
    OPEN_EDIT_PROJECT,
    CLOSE_BUILD_PROJECT,
    CLOSE_EDIT_PROJECT,
} from "./types"
import history from "../history/history";
import UrlConf from "../constants/UrlConf";
import {error} from "../actions/NotificationAction"
//axios配置
const config = {
    method: 'post',
    headers: {'Content-Type': 'application/json;charset=utf-8'},
    inCharset: "utf-8",
    outCharset: "utf-8"
};

export const GET_MY_PROJECTS = UrlConf.base + "project/getMyProjects";
export const GET_BY_ID = UrlConf.base + 'project/get';
export const SAVE = UrlConf.base + 'project/save';
export const OPEN_PROJECT = UrlConf.base + 'project/openProject';

export const GET_TEAMS = UrlConf.base + 'member/getTeams';
export const GET_PROJECT_MEMBERS = UrlConf.base + 'member/getProjectMembers';


export function init(doAfterInit) {

    let accessToken = localStorage.getItem("token");

    function getProjects() {
        return axios.post(GET_MY_PROJECTS, {"version": "1.0", accessToken: accessToken}, config);
    }

    function getProjectMembers() {
        return axios.post(GET_PROJECT_MEMBERS, {"version": "1.0", accessToken: accessToken}, config);
    }

    axios.all([getProjects(), getProjectMembers()]).then(axios.spread(function (projects, members, teams) {

        doAfterInit(projects.data.data, members.data.data);

    }));

}

export function openProject(id) {
    console.log("openProject被调用");


    let accessToken = localStorage.getItem("token");

    // POST username and password to API endpoint
    return axios.post(OPEN_PROJECT, {"version": "1.0","accessToken": accessToken, "data": id}, config)
        .then(response => {

            if (response.data.respCode !== "00") {
                error(response.data.msg);
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

export function openEditProject(id) {
    console.log("selectIteration被调用");

    let accessToken = localStorage.getItem("token");

    return axios.post(GET_BY_ID, {"version": "1.0","accessToken": accessToken, "data": id}, config)
        .then(response => {

            if (response.data.respCode !== "00") {
                error(response.data.msg);
                return false;
            }

            let data = response.data.data;

            console.log("!!!!!" + JSON.stringify(data));

            store.dispatch({
                type: OPEN_EDIT_PROJECT,
                payload: data
            });

        })
        .catch(error => {
            // If request fails
            console.log("!!!!!!!调用失败" + JSON.stringify(error));
            // update state to show error to user

        });

}

export function addProject() {

    store.dispatch({
        type: OPEN_BUILD_PROJECT
    })

}


/**
 * 这里要区分到底是新增还是编辑
 * @param iterationData
 */
export function saveProject(data) {

    // TODO post here, use iterationData to post
    console.log("inSaveProject" + JSON.stringify(data));

    let accessToken = localStorage.getItem("token");

    return axios.post(SAVE, {"version": "1.0", "accessToken": accessToken, "data": data}, config)
        .then(response => {

            if (response.data.respCode !== "00") {
                error(response.data.msg);
                return false;
            }

            store.dispatch({
                type: BUILD_SAVE_PROJECT,
                payload: response.data.data
            })
        })
        .catch(error => {
            // If request fails
            console.log("!!!!!!!调用失败" + JSON.stringify(error));
            // update state to show error to user

        });

}



//todo:注意正常使用的时候，把方法切换成上面的真正发送请求的action
export const editSaveDispatch = (value) => ({
    type: EDIT_SAVE_PROJECT,
    value
});
export const buildSaveProjectDispatch = (value) => ({
    type: BUILD_SAVE_PROJECT,
    value
});

export const closeBuildProject = () => ({
    type: CLOSE_BUILD_PROJECT,
});

export const closeEditProject = () => ({
    type: CLOSE_EDIT_PROJECT
});

//todo:这里面需要修改，有点问题，现在弃用
export const hintPopUp = (value) => ({
    type: "hint_pop",
    value
});

export const hintDelete = (value) => ({
    type: "hint_delete",
    value
});