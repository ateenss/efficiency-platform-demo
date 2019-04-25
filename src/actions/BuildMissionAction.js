import store from '../stores/index';
import axios from 'axios';
import UrlConf from '../constants/UrlConf'
import RequestBuilder from '../constants/RequestBuilder'
import { stopLoading} from "../actions/CommonAction";
import {
    CLOSE_BUILD_MISSION,
    OPEN_DETAIL_MISSION,
    CLOSE_DETAIL_MISSION,
    OPEN_BUILD_PLAN,
    CLOSE_BUILD_PLAN,
    SAVE_BUILD_PLAN,
    FILTER_DEMAND_MISSION,
    FILTER_OWN_MISSION,
    FILTER_RESET,
    OPEN_BUILD_MODULE,
    CLOSE_BUILD_MODULE,
    OPEN_TASK_EDITOR,
    CLOSE_TASK_EDITOR,
    SAVE_TASK_EDITOR,
    OPEN_DETAIL_GOTEST,
    CLOSE_DETAIL_GOTEST,
    OPEN_DETAIL_INTEGRATION,
    CLOSE_DETAIL_INTEGRATION,
    OPEN_DETAIL_OTHERMISSION,
    CLOSE_DETAIL_OTHERMISSION,
    OPEN_DETAIL_DEVMISSION,
    OPEN_ASSIGN_GOTEST,
    CLOSE_ASSIGN_GOTEST,
    DO_ASSIGN_GOTEST,
    GET_MYTASK_INFO,
    GET_TASK_DETAIL_INFO,
    SAVE_BUILD_MODULE,
    CHANGE_PLAN2_DEV,
    MODIFY_AFTER_TASKEDITOR,
    FILTER_TEST_TASK,
    INIT_PROJECT_MEMBERS,
    INIT_MODULES,
    CAL_PERM,
    OPEN_TEST_CASE_EDITOR, CLOSE_TEST_CASE_EDITOR,
    SAVE_TEST_CASE,
    EDIT_TEST_CASE,
    OPEN_ADD_TEST_CASE,
    CLOSE_ADD_TEST_CASE,
    SAVE_EDIT_TEST_CASE,
    ALL_ACTION_SHOW,
    DEMANDTASK_ACTION_SHOW,
    DEVTASK_ACTION_SHOW
} from './types';
import {error} from "./NotificationAction";
const config = {
    method: 'post',
    headers: {'Content-Type': 'application/json;charset=utf-8'},
    inCharset: "utf-8",
    outCharset: "utf-8"
};



export const calPerm=value=>({
    type:CAL_PERM,
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

export const  getDemandTaskDetailInfo=value=>({
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



export const openOtherMissionDetail=value=>({
    type: OPEN_DETAIL_OTHERMISSION,
    value
});

export const closeOtherMissionDetail=()=>({
    type: CLOSE_DETAIL_OTHERMISSION
});



export const openGoTestDetail=value=>({
    type: OPEN_DETAIL_GOTEST,
    value
});

export const closeGoTestDetail=()=>({
    type: CLOSE_DETAIL_GOTEST
});



export const openIntegrationDetail=value=>({
    type: OPEN_DETAIL_INTEGRATION,
    value
});

export const closeIntegrationDetail=()=>({
    type: CLOSE_DETAIL_INTEGRATION
});



const saveEditorSelf=()=>({
    type: SAVE_TASK_EDITOR
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


export const openTestCaseEditor=value=>({
    type: OPEN_TEST_CASE_EDITOR,
    value
});
export const closeTestCaseEditor=()=>({
    type: CLOSE_TEST_CASE_EDITOR
});

export const filterReset=()=>({
    type: FILTER_RESET
});



export const filterDoDemandMission=()=>({
   type: FILTER_DEMAND_MISSION
});


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




export const closeBuildMission=()=>({
    type:  CLOSE_BUILD_MISSION
});


export const saveModule=value=>({
    type: SAVE_BUILD_MODULE,
    value
});

export const planChange2Dev=value=>({
    type:CHANGE_PLAN2_DEV,
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

export function getDemandTaskTestCase(content){
    const send_edit_data = UrlConf.base + 'task/getDemandTaskTestCase';
    const config = {
        method: 'post'
    };

    let accessToken = localStorage.getItem("token");
    let request = RequestBuilder.parseRequest(accessToken,content);
    return axios.post(send_edit_data, request,config)
        .then(response => {
            if (response.data.respCode === "00") {
                let data = response.data.data;
                store.dispatch(openTestCaseEditor(data));
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
                getDemandTaskDetailSimple(content.taskId);
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
                // getDemandTaskDetail(parentTaskId);
                console.log("我进来了");

                getDemandTaskDetailSimple(parentTaskId);
                store.dispatch(closeTaskEdit());
                console.log("存储数据成功")
            }else{

                console.log("没能拿到数据")
            }
        }).catch(error => {
            console.log("后台提取数据出现问题"+error);

        });

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
                console.log("拉取数据成功");
                getMyTaskMain();
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
    console.log("我來查快餐"+JSON.stringify(saveContent));
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
        console.log("任务主面板初始化数据拉取成功");
        stopLoading();
    }));



}

//显示面板在主界面的时候，父任务里面的按钮显示问题
export function judgeDemandTaskShowAction(taskOwnerId){
    if ((localStorage.getItem("currentUser")-taskOwnerId)===0) {
        store.dispatch({
            type:ALL_ACTION_SHOW,
            payload : true
        });
    }else{
       /* store.dispatch({
            type:DEMANDTASK_ACTION_SHOW,
            payload : false
        });*/
        store.dispatch({
            type:ALL_ACTION_SHOW,
            payload : false
        });
    }
}

export function judgeDevTaskShowActin(taskOwnerId){
    if ((localStorage.getItem("currentUser")-taskOwnerId)===0) {
        store.dispatch({
            type:DEVTASK_ACTION_SHOW,
            payload : true
        });
    }else{
        store.dispatch({
            type:DEVTASK_ACTION_SHOW,
            payload : false
        });
    }
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
                judgeDemandTaskShowAction(data.taskOwner);
            }else{
                console.log("没能拿到数据")
            }
        }).catch(error => {
            console.log("后台提取数据出现问题"+error);

        });

}

export function getDemandTaskDetailSimple(taskId) {
    console.log("我被调用了"+JSON.stringify(taskId));
    const send_edit_data = UrlConf.base + 'task/getDemandTaskDetail';
    const config = {
        method: 'post'
    };
    let accessToken = localStorage.getItem("token");
    let request = RequestBuilder.parseRequest(accessToken,taskId);
    return axios.post(send_edit_data, request,config)
        .then(response => {
            if (response.data.respCode === "00") {
                let data = response.data.data;
                store.dispatch(getDemandTaskDetailInfo(data));
                judgeDemandTaskShowAction(data.taskOwner);
            }else{
                console.log("没能拿到数据")
            }
        }).catch(error => {
            console.log("后台提取数据出现问题"+error);

        });

}


export const SAVE_TEST_CASE_URL = UrlConf.base + 'task/saveTestCase';

/**
 * 这里要区分到底是新增还是编辑
 * @param iterationData
 */
export function saveTestCase(action, data) {

    // TODO post here, use iterationData to post
    console.log("inSaveTestCase" + JSON.stringify(data));

    let accessToken = localStorage.getItem("token");

    return axios.post(SAVE_TEST_CASE_URL, {"version": "1.0", "accessToken": accessToken, "data": data}, config)
        .then(response => {

            if (response.data.respCode !== "00") {
                error(response.data.msg);
                return false;
            }

            let type = "";
            if(action === OPEN_ADD_TEST_CASE){
                type = SAVE_TEST_CASE
            }else if(action === EDIT_TEST_CASE){
                type = SAVE_EDIT_TEST_CASE
            }


            store.dispatch({
                type: type,
                payload: response.data.data
            })
        })
        .catch(error => {
            // If request fails
            console.log("!!!!!!!调用失败" + JSON.stringify(error));
            // update state to show error to user

        });

}


export const GET_TEST_CASE = UrlConf.base + 'task/getTestCase';
export function editTestCase(id) {
    console.log("editTestCase"+id);

    let accessToken = localStorage.getItem("accessToken");
    return axios.post(GET_TEST_CASE, {"version": "1.0", accessToken: accessToken, data: id}, config)
        .then(response => {

            if (response.data.respCode !== "00") {
                error(response.data.msg);
            }

            let data = response.data.data;

            store.dispatch({
                type: EDIT_TEST_CASE,
                payload: data
            });


        })
        .catch(error => {
            console.log("调用失败");
        });
}

export function handleAddTestCase(){
    store.dispatch({
        type: OPEN_ADD_TEST_CASE,
    });

}



export function closeAddTestCase(){
    store.dispatch({
        type: CLOSE_ADD_TEST_CASE,
    });
}