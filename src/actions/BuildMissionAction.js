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
    GET_TASK_DETAIL_INFO
} from './types';


/*!!this.props.funcArray&&this.props.funcArray.map((value,key)=>{
    value.name===event.target.value&&store.dispatch(value.func(this.props.giveContent))
});*/

export const getMyTaskInfo=value=>({
    type:GET_MYTASK_INFO,
    value
});

export const getDemandTaskDetailInfo=value=>({
    type: GET_TASK_DETAIL_INFO,
    value
});


export const saveTaskEditor=content=>{
    /*console.log("testahhahahahahhah");*/
    content.funcArray.map((value,key)=>{
        /*console.log("开始");
        console.log("结束");
        console.log(value.name);
        console.log(value.func);*/
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

export const openBuildPlan=()=>({
   type: OPEN_BUILD_PLAN
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

export function init() {
    const send_edit_data = 'http://127.0.0.1:8080/tiger-admin/task/getMyTaskInfo';
    const config = {
        method: 'post'
    };

    let accessToken = localStorage.getItem("token");
    console.log("这是accessToken");
    // console.log(localStorage);
    console.log(accessToken);
    let request = RequestBuilder.parseRequest(accessToken);
    return axios.post(send_edit_data, request,config)
        .then(response => {
            if (response.data.respCode === "00") {
                let data = response.data.data;
                console.log("已经成功");
                console.log(response.data.data);
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

    console.log("内部详情成功启动");
    let accessToken = localStorage.getItem("token");
    let request = RequestBuilder.parseRequest(accessToken,{taskId});
    return axios.post(send_edit_data, request,config)
        .then(response => {
            if (response.data.respCode === "00") {
                let data = response.data.data;
                console.log("内部详情已经成功");
                console.log(response.data.data);
                store.dispatch(getDemandTaskDetailInfo(data));
            }else{

                console.log("没能拿到数据")
            }
        }).catch(error => {
            console.log("后台提取数据出现问题"+error);

        });

}


export function pullBuildMissionInitial(){
   /* const send_edit_data = 'http://127.0.0.1:8080/tiger-admin/task/getMyTaskInfo';
    const config = {
        method: 'post'
    };
    return axios.post(send_edit_data, {"version": "1.0"},config)
        .then(response => {
            if (response.data.respCode === "00") {
                /!*store.dispatch({
                    type: "save_success",
                });
                store.dispatch({
                    type:"pull_initial_project",
                    payload:InitialData
                })*!/
                console.log("已经成功");
                console.log(response);
            }else{
                /!*store.dispatch({
                    type: "save_fail",
                });*!/
                console.log("没能拿到数据")
            }
        }).catch(error => {
        console.log("后台提取数据出现问题"+error);
        /!*store.dispatch({
            type: "save_error",
        });*!/
    });*/
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
        demands:[
            {
                tasks:{"develop":[{
                        "taskContent": "我是开发1",
                        "taskName": "凤凰战车的任务",
                        "taskId": "1",
                    },{
                        "taskContent": "我是开发2",
                        "taskName": "枪兵的任务",
                        "taskId": "2"
                    }],
                    "plan": [{
                        "taskContent": "我是方案",
                        "taskName": "赤木晴子的任务",
                        "taskId": "3"
                    },
                        {
                            "taskContent": "我是方案",
                            "taskName": "雷蛇的任务",
                            "taskId": "4"
                        }],
                    "integration": [{
                        "taskContent": "我是持续集成",
                        "taskName": "曹志的持续集成",
                        "taskId": "5"
                    },
                        {
                            "taskContent": "我是持续集成",
                            "taskName": "阿拉蕾的持续集成",
                            "taskId": "6"
                        }],
                    "goTest": [{
                        "taskContent": "我是走查",
                        "taskName": "李淳风的走查",
                        "taskId": "7"
                    },{
                        "taskContent": "我是走查",
                        "taskName": "巫妖王的走查",
                        "taskId": "8"
                    },
                    ],
                    "finish":[
                        {
                            "taskContent":"我是完成",
                            "taskName": "李淳风的完成",
                            "taskId": "9"
                        },{
                            "taskContent":"我是完成",
                            "taskName": "喵的完成",
                            "taskId": "10"
                        }
                    ]
                },
                taskName:"需求任务1",
                taskOwner:"需求任务拥有者1",
                taskDeadLine:"2018-23-33",
                taskCode:"1069"
            }
        ]
    };
    store.dispatch({
        type:PULL_INITIAL_MISSION,
        payload:InitialData
    })
}

