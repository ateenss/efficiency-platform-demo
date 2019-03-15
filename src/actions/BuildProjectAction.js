import axios from 'axios';
import history from '../history/history';
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
} from "./types"




//提交保存填写的项目内容
export function buildSave(value){
    const send_save_data = '需要填写后台地址';
    store.dispatch(buildSaveProjectDispatch(value));
    const config = {
        method: 'post'
    };
    return axios.post(send_save_data, {"version": "1.0", "data": {actionName: "buildProject", data: value}},config)
        .then(response => {
            if (response.data.respCode === "00") {
                store.dispatch({
                    type: PROJECT_SAVE_SUCCESS,
                });
            }else{
                store.dispatch({
                    type: PROJECT_SAVE_FAIL,
                });
            }
        }).catch(error => {
            console.log("发送数据到后台出现问题"+error);
            store.dispatch({
                type: PROJECT_SAVE_ERROR,
            });
        });
}
//提交再次编辑修改的内容
export function editSave(value){
    const send_edit_data = '需要填写后台地址';
    store.dispatch(editSaveDispatch(value));
    const config = {
        method: 'post'
    };
    return axios.post(send_edit_data, {"version": "1.0", "data": {actionName: "editProject", data: value}},config)
        .then(response => {
            if (response.data.respCode === "00") {
                store.dispatch({
                    type: PROJECT_SAVE_SUCCESS,
                });
            }else{
                store.dispatch({
                    type: PROJECT_SAVE_FAIL,
                });
            }
        }).catch(error => {
            console.log("发送数据到后台出现问题"+error);
            store.dispatch({
                type: PROJECT_SAVE_ERROR,
            });
        });
}

export function pullBuildProjectInitial(){
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
    const rand=Math.floor(Math.random()*40)+1;
    const InitialData={
        ProjectID:rand,
        ProjectType:["业务需求项目","系统架构优化"],
        ProjectMembers:["员工A","员工B","员工C","员工D","员工E","员工F","员工G","员工H"],
        ProjectHead:["员工A","员工B","员工C","员工D","员工E","员工F","员工G","员工H"],
        ProjectStatus:["正在进行","已经完成"]
    };
    store.dispatch({
        type:PULL_INITIAL_PROJECT,
        payload:InitialData
    })
}


//todo:注意正常使用的时候，把方法切换成上面的真正发送请求的action
export  const editSaveDispatch=(value)=>({
    type:EDIT_SAVE_PROJECT,
    value
});
export  const buildSaveProjectDispatch=(value)=>({
    type:BUILD_SAVE_PROJECT,
    value
});

export  const openBuildProject=()=>({
    type:OPEN_BUILD_PROJECT,
});

export const closeBuildProject=()=>({
    type:CLOSE_BUILD_PROJECT,
});

export  const openEditProject=()=>({
    type:OPEN_EDIT_PROJECT,
});
export const closeEditProject=()=>({
    type:CLOSE_EDIT_PROJECT
});

//todo:这里面需要修改，有点问题，现在弃用
export const hintPopUp=(value)=>({
    type:"hint_pop",
    value
});

export const hintDelete=(value)=>({
    type:"hint_delete",
    value
});