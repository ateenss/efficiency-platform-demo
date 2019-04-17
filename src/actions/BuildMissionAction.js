import store from '../stores/index';
import axios from 'axios';
import UrlConf from '../constants/UrlConf'
import RequestBuilder from '../constants/RequestBuilder'
import {startLoading, stopLoading} from "../actions/CommonAction";
import {
    OPEN_BUILD_MISSION,
    CLOSE_BUILD_MISSION,
    BUILD_SAVE_MISSION,
    OPEN_EDIT_MISSION,
    CLOSE_EDIT_MISSION,
    EDIT_SAVE_MISSION,
    PULL_INITIAL_MISSION,
    OPEN_DETAIL_MISSION,
    CLOSE_DETAIL_MISSION,
    SAVE_DETAIL_MISSION,
    OPEN_BUILD_PLAN,
    CLOSE_BUILD_PLAN,
    SAVE_BUILD_PLAN,
    FILTER_UNDERWAY,
    FILTER_FINISH,
    FILTER_DEMAND_MISSION,
    FILTER_DEV_MISSION,
    FILTER_OWN_MISSION,
    FILTER_RESET,
    OPEN_BUILD_MODULE,
    CLOSE_BUILD_MODULE,
    OPEN_TASK_EDITOR,
    CLOSE_TASK_EDITOR,
    CHANGE_STATUS_TO_PLAN,
    CHANGE_STATUS_TO_DEV,
    CHANGE_STATUS_TO_INTEGRATION,
    CHANGE_STATUS_TO_TEST,
    SAVE_TASK_EDITOR,
    CHANGE_STATUS_TO_FINISH,
    OPEN_DETAIL_GOTEST,
    CLOSE_DETAIL_GOTEST,
    SAVE_DETIAL_GOTEST,
    OPEN_DETAIL_INTEGRATION,
    CLOSE_DETAIL_INTEGRATION,
    SAVE_DETIAL_INTEGRATION,
    OPEN_DETAIL_OTHERMISSION,
    CLOSE_DETAIL_OTHERMISSION,
    SAVE_DETAIL_OTHERMISSION,
    OPEN_DETAIL_DEVMISSION,
    CLOSE_DETAIL_DEVMISSION,
    SAVE_DETAIL_DEVMISSION,
    OPEN_ASSIGN_GOTEST,
    CLOSE_ASSIGN_GOTEST,
    DO_ASSIGN_GOTEST,
    GET_MYTASK_INFO,
    GET_TASK_DETAIL_INFO,
    SAVE_BUILD_MODULE,
    SHOW_NOTIFICATION,
    INIT_TASK_MEMBERS,
    CHANGE_PLAN2_DEV,
    ADD_TEST_TASK_PANEL,
    MODIFY_AFTER_TASKEDITOR,
    FILTER_TEST_TASK,
    INIT_PROJECT_MEMBERS,
    INIT_MODULES,
    CAL_PERM
} from './types';
import {GET_PROJECT_MEMBERS} from "./CommonAction";
import {GET_DEMANDS} from "./DemandAction";


/*!!this.props.funcArray&&this.props.funcArray.map((value,key)=>{
    value.name===event.target.value&&store.dispatch(value.func(this.props.giveContent))
});*/

export const calPerm=value=>({
    type:CAL_PERM,
    value
});
export const addTestTask2Panel=value=>({
    type:ADD_TEST_TASK_PANEL,
    value
});

export const filterDoGoTestMission=value=>({
    type:FILTER_TEST_TASK,
    value
});

export const getMyTaskInfo=value=>({
    type:GET_MYTASK_INFO,
    value
});

export const getDemandTaskDetailInfo=value=>({
    type: GET_TASK_DETAIL_INFO,
    value
});


export const saveTaskEditor=content=>{
    content.funcArray.map((value,key)=>{
        value.name===content.status&&store.dispatch(value.func(content.id))
    });
    store.dispatch(saveEditorSelf());
};
export const openAssignGoTest=value=>({
    type: OPEN_ASSIGN_GOTEST,
    value
});

export const closeAssignGoTest=value=>({
    type: CLOSE_ASSIGN_GOTEST,
    value
});

export const doAssignGoTest=value=>({
    type:DO_ASSIGN_GOTEST,
    value
});


export const openDevMissionDetail=value=>({
    type: OPEN_DETAIL_DEVMISSION,
    value
});

export const closeDevMissionDetail=()=>({
    type: CLOSE_DETAIL_DEVMISSION
});

export const saveDevMissionDetail=()=>({
    type: SAVE_DETAIL_DEVMISSION
});


export const openOtherMissionDetail=value=>({
    type: OPEN_DETAIL_OTHERMISSION,
    value
});

export const closeOtherMissionDetail=()=>({
    type: CLOSE_DETAIL_OTHERMISSION
});

export const saveOtherMissionDetail=()=>({
    type: SAVE_DETAIL_OTHERMISSION
});

export const openGoTestDetail=value=>({
    type: OPEN_DETAIL_GOTEST,
    value
});

export const closeGoTestDetail=()=>({
    type: CLOSE_DETAIL_GOTEST
});

export const saveGoTestDetail=()=>({
    type: SAVE_DETIAL_GOTEST
});

export const openIntegrationDetail=value=>({
    type: OPEN_DETAIL_INTEGRATION,
    value
});

export const closeIntegrationDetail=()=>({
    type: CLOSE_DETAIL_INTEGRATION
});

export const saveIntegrationDetail=()=>({
    type: SAVE_DETIAL_INTEGRATION
});

const saveEditorSelf=()=>({
    type: SAVE_TASK_EDITOR
});

export const changeStatusToFinish=value=>({
    type:CHANGE_STATUS_TO_FINISH,
    value
});

export const changeStatusToPlan=value=>({
    type:CHANGE_STATUS_TO_PLAN,
    value
});

export const changeStatusToDev=value=>({
    type:CHANGE_STATUS_TO_DEV,
    value
});

export const changeStatusToIntegration=value=>({
    type:CHANGE_STATUS_TO_INTEGRATION,
    value
});

export const changeStatusToGoTest=value=>({
    type:CHANGE_STATUS_TO_TEST,
    value
});

export const openTaskEdit=value=>({
    type: OPEN_TASK_EDITOR,
    value
});

export const closeTaskEdit=()=>({
    type: CLOSE_TASK_EDITOR
});

export const openBuildModule=()=>({
   type: OPEN_BUILD_MODULE
});

export const closeBuildModule=()=>({
    type: CLOSE_BUILD_MODULE
});



export const filterReset=()=>({
    type: FILTER_RESET
});

export const filterDoUnderWay=()=>({
    type: FILTER_UNDERWAY
});

export const filterDoFinish=()=>({
    type: FILTER_FINISH
});

export const filterDoDemandMission=()=>({
   type: FILTER_DEMAND_MISSION
});

export const filterDoDevMission=()=>({
    type:FILTER_DEV_MISSION
}) ;

export const filterDoOwnMission=()=>({
    type:FILTER_OWN_MISSION
});

export const openBuildPlan = value => ({
    type: OPEN_BUILD_PLAN,
    value
});

export const closeBuildPlan=()=>({
    type: CLOSE_BUILD_PLAN
});

export const saveBuildPlan=value=>({
    type: SAVE_BUILD_PLAN,
    value
});


export const openDetailMission=value=>({
    type: OPEN_DETAIL_MISSION,
    value
});

export const closeDetailMission=()=>({
    type: CLOSE_DETAIL_MISSION
});

export const saveDetailMission=(value)=>({
    type: SAVE_DETAIL_MISSION,
    value
});


export const openBuildMission=()=>({
    type:  OPEN_BUILD_MISSION
});

export const closeBuildMission=()=>({
    type:  CLOSE_BUILD_MISSION
});

export const openEditMission=()=>({
    type:  OPEN_EDIT_MISSION
});

export const closeEditMission=()=>({
    type:  CLOSE_EDIT_MISSION
});

export  const buildSaveMissionDispatch=(value)=>({
    type:BUILD_SAVE_MISSION,
    value
});

export  const editSaveMissionDispatch=(value)=>({
    type:EDIT_SAVE_MISSION,
    value
});

export const saveModule=value=>({
    type: SAVE_BUILD_MODULE,
    value
});

export const planChange2Dev=value=>({
    type:CHANGE_PLAN2_DEV,
    value
});

export const modifyAfterEditor=value=>({
    type:MODIFY_AFTER_TASKEDITOR,
    value
});


export function demandTaskGoToIntegration(saveContent) {
    const url = UrlConf.base + 'task/goToIntegeration';
    const config = {
        method: 'post'
    };
    let accessToken = localStorage.getItem("token");
    let request = RequestBuilder.parseRequest(accessToken,saveContent);
    return axios.post(url, request,config)
        .then(response => {
            if (response.data.respCode === "00") {
                let data = response.data.data;
                /*store.dispatch(saveModule(saveContent));*/
                // getDemandTaskDetail(parentTaskId);
            }else{

                console.log("没能拿到数据")
            }
        }).catch(error => {
            console.log("后台提取数据出现问题"+error);

        });
}


export function getDemandTaskPlan(content){
    const send_edit_data = UrlConf.base + 'task/getDemandTaskPlan';
    const config = {
        method: 'post'
    };

    let accessToken = localStorage.getItem("token");
    let request = RequestBuilder.parseRequest(accessToken,content);
    return axios.post(send_edit_data, request,config)
        .then(response => {
            if (response.data.respCode === "00") {
                let data = response.data.data;
                store.dispatch(openBuildPlan(data))
            }else{

                console.log("没能拿到数据")
            }
        }).catch(error => {
            console.log("后台提取数据出现问题"+error);

        });
}



export function submitAndPlan(content) {
    store.dispatch(closeBuildPlan());
    const submit_plan = UrlConf.base + 'task/submitAndSavePlan';
    const config = {
        method: 'post'
    };
    let accessToken = localStorage.getItem("token");
    let request = RequestBuilder.parseRequest(accessToken,content);
    axios.post(submit_plan, request,config)
        .then(response => {
            if (response.data.respCode === "00") {
                let data = response.data.data;
                console.log("存储数据成功")
            }else{

                console.log("没能拿到数据")
            }
        }).catch(error => {
        console.log("后台提取数据出现问题"+error);

    });
}


export function saveDevPlan(content,taskId) {
    const submit_task_edit = UrlConf.base + 'task/saveTaskEditor';
    const config = {
        method: 'post'
    };
    let accessToken = localStorage.getItem("token");
    let request = RequestBuilder.parseRequest(accessToken,content);
    axios.post(submit_task_edit, request,config)
        .then(response => {
            if (response.data.respCode === "00") {
                let data = response.data.data;
                getDemandTaskDetail(taskId);
                console.log("存储数据成功")
            }else{

                console.log("没能拿到数据")
            }
        }).catch(error => {
            console.log("后台提取数据出现问题"+error);

        });

    // store.dispatch(modifyAfterEditor(content));
    store.dispatch(closeTaskEdit());
}


export function submitAndChange2Dev(id,content,parentTaskId){
   /* store.dispatch(modifyAfterEditor(content));*/
    const submit_task_edit = UrlConf.base + 'task/submitTaskEditor';
    const config = {
        method: 'post'
    };
    let accessToken = localStorage.getItem("token");
    let request = RequestBuilder.parseRequest(accessToken,content);
    axios.post(submit_task_edit, request,config)
        .then(response => {
            if (response.data.respCode === "00") {
                let data = response.data.data;
                getDemandTaskDetail(parentTaskId);
                console.log("存储数据成功")
            }else{

                console.log("没能拿到数据")
            }
        }).catch(error => {
            console.log("后台提取数据出现问题"+error);

        });

    //todo:这里有可能多余
    store.dispatch(planChange2Dev(id));
    store.dispatch(closeTaskEdit());

}

export function meetRequirements(content) {
    let ret =content.split("-");
    let taskId =parseInt( ret[2]);
    const url = UrlConf.base + 'task/meetRequirements';
    const config = {
        method: 'post'
    };
    let accessToken = localStorage.getItem("token");
    let request = RequestBuilder.parseRequest(accessToken,taskId);
    return axios.post(url, request,config)
        .then(response => {
            if (response.data.respCode === "00") {
                getDemandTaskDetail(taskId);
                console.log("拉取数据成功")
            }else{

                console.log("没能拿到数据")
            }
        }).catch(error => {
            console.log("后台提取数据出现问题"+error);

        });
}


export function finishTest(content) {
    const finish_test = UrlConf.base + 'task/finishTest';
    const config = {
        method: 'post'
    };
    let accessToken = localStorage.getItem("token");
    let request = RequestBuilder.parseRequest(accessToken,content);
    return axios.post(finish_test, request,config)
        .then(response => {
            if (response.data.respCode === "00") {
                //关闭删除功能
                /*store.dispatch(addTestTask2Panel(content));*/
                console.log("拉取数据成功");

                store.dispatch(closeGoTestDetail());

            }else{

                console.log("没能拿到数据")
            }
        }).catch(error => {
            console.log("后台提取数据出现问题"+error);

        });
}


export function goToTest(content,taskId){
    store.dispatch(doAssignGoTest(content.taskCode));
    const go_to_test = UrlConf.base + 'task/goToTest';
    const config = {
        method: 'post'
    };
    let accessToken = localStorage.getItem("token");
    let request = RequestBuilder.parseRequest(accessToken,content);
    return axios.post(go_to_test, request,config)
        .then(response => {
            if (response.data.respCode === "00") {
                /*let data = response.data.data;*/
                console.log("这里到底发射了什么");
                console.log(content);
                getDemandTaskDetail(taskId);
                console.log("存储数据成功")
            }else{

                console.log("没能拿到数据")
            }
        }).catch(error => {
            console.log("后台提取数据出现问题"+error);

        });
}


export function savePlanContent(content) {
    const save_module_data = UrlConf.base + 'task/savePlanContent';
    const config = {
        method: 'post'
    };
    let accessToken = localStorage.getItem("token");
    let request = RequestBuilder.parseRequest(accessToken,content);
    return axios.post(save_module_data, request,config)
        .then(response => {
            if (response.data.respCode === "00") {
                let data = response.data.data;
                store.dispatch(saveBuildPlan(content));
            }else{

                console.log("没能拿到数据")
            }
        }).catch(error => {
            console.log("后台提取数据出现问题"+error);

        });
}


export function saveBuildModule(saveContent,parentTaskId) {
    const save_module_data = UrlConf.base + 'task/saveNewDevTask';
    const config = {
        method: 'post'
    };
    let accessToken = localStorage.getItem("token");
    let request = RequestBuilder.parseRequest(accessToken,saveContent);
    return axios.post(save_module_data, request,config)
        .then(response => {
            if (response.data.respCode === "00") {
                let data = response.data.data;
                store.dispatch(saveModule(saveContent));
                getDemandTaskDetail(parentTaskId);
            }else{

                console.log("没能拿到数据")
            }
        }).catch(error => {
            console.log("后台提取数据出现问题"+error);

        });
}


export function init() {
    const getMyTaskInfoUrl = UrlConf.base + 'task/getMyTaskInfo';
    const GET_PROJECT_MEMBERS = UrlConf.base + 'member/getProjectMembers';
    const GET_MODULES = UrlConf.base + 'modules/getModules';

    const config = {
        method: 'post'
    };
    let accessToken = localStorage.getItem("token");
    let request = RequestBuilder.parseRequest(accessToken);

    function getMyTask() {
        return axios.post(getMyTaskInfoUrl, {"version": "1.0", accessToken: accessToken}, config);
    }

    function getProjectMembers() {
        return axios.post(GET_PROJECT_MEMBERS, {"version": "1.0", accessToken: accessToken}, config);
    }

    function getModules() {
        return axios.post(GET_MODULES, {"version": "1.0", accessToken: accessToken}, config);
    }

    axios.all([getProjectMembers(),getMyTask(),getModules()]).then(axios.spread(function(members,myTask, modules){
        store.dispatch(getMyTaskInfo(myTask.data.data));
        store.dispatch({
            type: INIT_PROJECT_MEMBERS,
            payload: members.data.data

        });
        store.dispatch({
            type:INIT_MODULES,
            payload : modules.data.data
        })
        stopLoading();
    }));



}

export function getMyTaskMain() {
    const getMyTaskInfoUrl = UrlConf.base + 'task/getMyTaskInfo';
    const config = {
        method: 'post'
    };
    let accessToken = localStorage.getItem("token");
    let request = RequestBuilder.parseRequest(accessToken);
    return axios.post(getMyTaskInfoUrl, request,config)
        .then(response => {
            if (response.data.respCode === "00") {
                let data = response.data.data;

                store.dispatch(getMyTaskInfo(data));

            }else{
                console.log("没能拿到数据")
            }
        }).catch(error => {
            console.log("后台提取数据出现问题"+error);

        });

}


export function getDemandTaskDetail(taskId) {
    const send_edit_data = UrlConf.base + 'task/getDemandTaskDetail';
    const config = {
        method: 'post'
    };
    store.dispatch(openDetailMission(taskId));
    let accessToken = localStorage.getItem("token");
    let request = RequestBuilder.parseRequest(accessToken,taskId);
    return axios.post(send_edit_data, request,config)
        .then(response => {
            if (response.data.respCode === "00") {
                let data = response.data.data;
                store.dispatch(getDemandTaskDetailInfo(data));

            }else{
                console.log("没能拿到数据")
            }
        }).catch(error => {
            console.log("后台提取数据出现问题"+error);

        });

}



