import axios from 'axios';
import store from '../stores/index';
import {
    PULL_INITIAL_PROJECT,
    BUILD_SAVE_PROJECT,
    EDIT_SAVE_PROJECT,
    PROJECT_SAVE_SUCCESS,
    PROJECT_SAVE_FAIL,
    PROJECT_SAVE_ERROR,
    OPEN_BUILD_PROJECT,
    OPEN_EDIT_PROJECT,
    CLOSE_BUILD_PROJECT,
    CLOSE_EDIT_PROJECT,
    SHOW_NOTIFICATION, INIT_PROJECT_MEMBERS,
} from "./types"
import history from "../history/history";
//axios配置
const config = {
    method: 'post',
    headers: {'Content-Type': 'application/json;charset=utf-8'},
    inCharset: "utf-8",
    outCharset: "utf-8"
};

export const GET_MY_PROJECTS = 'http://172.20.182.141:8080/tiger-admin/project/getMyProjects';
export const GET_BY_ID = 'http://172.20.182.141:8080/tiger-admin/project/get';
export const SAVE = 'http://172.20.182.141:8080/tiger-admin/project/save';
export const OPEN_PROJECT = 'http://172.20.182.141:8080/tiger-admin/project/openProject';

export const GET_TEAMS = 'http://172.20.182.141:8080/tiger-admin/member/getTeams';
export const GET_PROJECT_MEMBERS = 'http://172.20.182.141:8080/tiger-admin/member/getProjectMembers';


export function init(doAfterInit) {
    console.log("init");

    let accessToken = localStorage.getItem("token");

    function getProjects() {
        return axios.post(GET_MY_PROJECTS, {"version": "1.0", accessToken: accessToken}, config);
    }

    function getProjectMembers() {
        return axios.post(GET_PROJECT_MEMBERS, {"version": "1.0", accessToken: accessToken}, config);
    }

    function getTeams() {
        return axios.post(GET_TEAMS, {"version": "1.0", accessToken: accessToken}, config);
    }

    axios.all([getProjects(), getProjectMembers(), getTeams()]).then(axios.spread(function (projects, members, teams) {

        store.dispatch({
            type: INIT_PROJECT_MEMBERS,
            payload: members.data.data
        });

        doAfterInit(projects.data.data, members.data.data, teams.data.data);

    }));

}

export function openProject(id) {
    console.log("openProject被调用");


    let accessToken = localStorage.getItem("token");

    // POST username and password to API endpoint
    return axios.post(OPEN_PROJECT, {"version": "1.0","accessToken": accessToken, "data": id}, config)
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

export function openEditProject(id) {
    console.log("selectIteration被调用");

    let accessToken = localStorage.getItem("token");

    return axios.post(GET_BY_ID, {"version": "1.0","accessToken": accessToken, "data": id}, config)
        .then(response => {

            if (response.data.respCode !== "00") {
                store.dispatch({
                    type: SHOW_NOTIFICATION,
                    payload: response.data.msg
                });
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
                store.dispatch({
                    type: SHOW_NOTIFICATION,
                    payload: response.data.msg
                });
                return false;
            }

            store.dispatch({
                type: BUILD_SAVE_PROJECT,
                payload: data
            })
        })
        .catch(error => {
            // If request fails
            console.log("!!!!!!!调用失败" + JSON.stringify(error));
            // update state to show error to user

        });

}


//提交保存填写的项目内容
export function buildSave(value) {
    const send_save_data = '需要填写后台地址';
    store.dispatch(buildSaveProjectDispatch(value));
    const config = {
        method: 'post'
    };

    let accessToken = localStorage.getItem("token");


    return axios.post(send_save_data, {"version": "1.0", "accessToken": accessToken, "data": {actionName: "buildProject", data: value}}, config)
        .then(response => {
            if (response.data.respCode === "00") {
                store.dispatch({
                    type: PROJECT_SAVE_SUCCESS,
                });
            } else {
                store.dispatch({
                    type: PROJECT_SAVE_FAIL,
                });
            }
        }).catch(error => {
            console.log("发送数据到后台出现问题" + error);
            store.dispatch({
                type: PROJECT_SAVE_ERROR,
            });
        });
}

//提交再次编辑修改的内容
export function editSave(value) {
    const send_edit_data = '需要填写后台地址';
    store.dispatch(editSaveDispatch(value));
    const config = {
        method: 'post'
    };

    let accessToken = localStorage.getItem("token");


    return axios.post(send_edit_data, {"version": "1.0", "accessToken": accessToken, "data": {actionName: "editProject", data: value}}, config)
        .then(response => {
            if (response.data.respCode === "00") {
                store.dispatch({
                    type: PROJECT_SAVE_SUCCESS,
                });
            } else {
                store.dispatch({
                    type: PROJECT_SAVE_FAIL,
                });
            }
        }).catch(error => {
            console.log("发送数据到后台出现问题" + error);
            store.dispatch({
                type: PROJECT_SAVE_ERROR,
            });
        });
}


export function pullBuildProjectInitial() {
    const send_edit_data = '需要填写后台地址';
    const config = {
        method: 'post'
    };
    //todo:正常向后台要数据的时候，才把这些数据写进去，目前这个初始化调用是放在Project里面
    /*axios.post(send_edit_data, {"version": "1.0", "data": "BuildProjectInitial"},config)
        .then(response => {
            if (response.data.respCode === "00") {
                store.dispatch({
                    type: "save_success",
                });
                store.dispatch({
                    type:"pull_initial_project",
                    payload:InitialData
                })
            }else{
                store.dispatch({
                    type: "save_fail",
                });
            }
        }).catch(error => {
        console.log("后台提取数据出现问题"+error);
        store.dispatch({
            type: "save_error",
        });
    });*/
    //以下是mock数据
    const rand = Math.floor(Math.random() * 40) + 1;
    const InitialData = {
        ProjectID: rand,
        projectType: [{name: "业务需求项目", id: 1}, {name: "系统架构优化", id: 2}],
        projectMembers: [{name: "周之豪", id: 1}, {name: "长泽雅美", id: 2}],
        projectStatus: [{name: "进行中", id: 1}, {name: "已完成", id: 2}]
    };
    store.dispatch({
        type: PULL_INITIAL_PROJECT,
        payload: InitialData
    })
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

export const openBuildProject = () => ({
    type: OPEN_BUILD_PROJECT,
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