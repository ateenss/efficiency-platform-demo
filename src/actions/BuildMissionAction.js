import store from '../stores/index';
import axios from 'axios';
import UrlConf from '../constants/UrlConf'
import RequestBuilder from '../constants/RequestBuilder'
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
    MODIFY_AFTER_TASKEDITOR
} from './types';
import {GET_PROJECT_MEMBERS} from "./CommonAction";


/*!!this.props.funcArray&&this.props.funcArray.map((value,key)=>{
    value.name===event.target.value&&store.dispatch(value.func(this.props.giveContent))
});*/

export const addTestTask2Panel=value=>({
    type:ADD_TEST_TASK_PANEL,
    value
})

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

export function getDemandTaskPlan(content){
    const send_edit_data = 'http://127.0.0.1:8080/tiger-admin/task/getDemandTaskPlan';
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
    const submit_plan = 'http://127.0.0.1:8080/tiger-admin/task/submitAndSavePlan';
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
    const submit_task_edit = 'http://127.0.0.1:8080/tiger-admin/task/saveTaskEditor';
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
    const submit_task_edit = 'http://127.0.0.1:8080/tiger-admin/task/submitTaskEditor';
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


export function finishTest(content) {
    const finish_test = 'http://127.0.0.1:8080/tiger-admin/task/finishTest';
    const config = {
        method: 'post'
    };
    let accessToken = localStorage.getItem("token");
    let request = RequestBuilder.parseRequest(accessToken,content);
    return axios.post(finish_test, request,config)
        .then(response => {
            if (response.data.respCode === "00") {
                let data = response.data.data;
                store.dispatch(addTestTask2Panel(data));
                console.log("拉取数据成功")
            }else{

                console.log("没能拿到数据")
            }
        }).catch(error => {
            console.log("后台提取数据出现问题"+error);

        });
}


export function goToTest(content){
    store.dispatch(doAssignGoTest(content.taskCode));
    const go_to_test = 'http://127.0.0.1:8080/tiger-admin/task/goToTest';
    const config = {
        method: 'post'
    };
    let accessToken = localStorage.getItem("token");
    let request = RequestBuilder.parseRequest(accessToken,content);
    return axios.post(go_to_test, request,config)
        .then(response => {
            if (response.data.respCode === "00") {
                /*let data = response.data.data;*/
                console.log("存储数据成功")
            }else{

                console.log("没能拿到数据")
            }
        }).catch(error => {
            console.log("后台提取数据出现问题"+error);

        });
}


export function savePlanContent(content) {
    const save_module_data = 'http://127.0.0.1:8080/tiger-admin/task/savePlanContent';
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
    const save_module_data = 'http://127.0.0.1:8080/tiger-admin/task/saveNewDevTask';
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
    const send_edit_data = 'http://127.0.0.1:8080/tiger-admin/task/getMyTaskInfo';
    const config = {
        method: 'post'
    };

    let accessToken = localStorage.getItem("token");
    let request = RequestBuilder.parseRequest(accessToken);
    return axios.post(send_edit_data, request,config)
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
    const send_edit_data = 'http://127.0.0.1:8080/tiger-admin/task/getDemandTaskDetail';
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


export function pullBuildMissionInitial(){
    //以下是mock数据
    const rand=Math.floor(Math.random()*40)+1;
    const InitialData={
        belongProject:["项目1","项目2","项目3","项目4"],
        taskType:["需求评审任务","需求开发任务","上线任务","个人其他任务"],
        missionLevel:["总任务","子任务"],
        missionHead:["员工A","员工B","员工C","员工D","员工E","员工F","员工G","员工H"],
        missionPriority:["高","普通","默认","低"],
        associatedVersion:["49.1","49.2","49.3","49.4"],
        involveModule:["模块1","模块2","模块3","模块4"],
        associatedDemand:["需求1","需求2","需求3","需求4"],
        associatedMission:["任务1","任务2","任务3","任务4"],
        modulePushHead:["员工A","员工B","员工C","员工D","员工E","员工F","员工G","员工H"],
        taskStatus:["进行中","已完成"],
        tasks:[{
            taskCode: '1',
            taskDeadLine: '2018-23-34',
            taskName: "30天从入门到放弃",
            taskStatus: "待处理",
            taskType: "走查任务"
        }, {
            taskCode: '2',
            taskDeadLine: '2018-23-33',
            taskName: "30天学不会react",
            taskStatus: "待处理",
            taskType: "走查任务"
        }, {
            taskCode: '3',
            taskDeadLine: '2018-23-33',
            taskName: "到底能不能学会",
            taskStatus: "已完成",
            taskType: "持续集成任务"
        }, {
            taskCode: '4',
            taskDeadLine: '2018-23-33',
            taskName: "不能啊",
            taskStatus: "待处理",
            taskType: "持续集成任务"
        }, {
            taskCode: '5',
            taskDeadLine: '2018-23-33',
            taskName: "不能啊",
            taskStatus: "已评审",
            taskType: "需求开发任务"
        }, {
            taskCode: '6',
            taskDeadLine: '2018-23-33',
            taskName: "到底能不能学会",
            taskStatus: "待处理",
            taskType: "需求开发任务"
        }, {
            taskCode: '7',
            taskDeadLine: '2018-23-33',
            taskName: "不能啊",
            taskStatus: "已走查",
            taskType: "开发任务"
        }, {
            taskCode: '8',
            taskDeadLine: '2018-23-33',
            taskName: "不能啊",
            taskStatus: "已完成",
            taskType: "开发任务"
        }, {
            taskCode: '8',
            taskDeadLine: '2018-23-33',
            taskName: "不能啊",
            taskStatus: "待处理",
            taskType: "个人其他任务"
        }, {
            taskCode: '8',
            taskDeadLine: '2018-23-33',
            taskName: "不能啊",
            taskStatus: "已完成",
            taskType: "个人其他任务"
        }

        ],

    };
    store.dispatch({
        type:PULL_INITIAL_MISSION,
        payload:InitialData
    })
}

