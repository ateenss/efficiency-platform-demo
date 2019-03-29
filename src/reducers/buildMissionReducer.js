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
    DO_ASSIGN_GOTEST,
    CLOSE_ASSIGN_GOTEST,
    GET_MYTASK_INFO,
    GET_TASK_DETAIL_INFO
} from "../actions/types"
/*import {taskStatusChange} from "../actions/TaskStatusChangeFunc"*/

export const INITIAL_STATE = {
    detailGoTestShow:false,
    assignGoTestShow:false,
    detailIntegrationShow:false,
    detailOtherMissionShow:false,
    detailDevMissionShow:false,
    buildMissionShow:false,
    editMissionShow:false,
    detailMissionShow:false,
    buildModuleShow:false,
    buildPlanShow:false,
    taskEditorShow:false,
    filterManagerMissionShow:false,
    filterDeveloperMissionShow:false,
    initialData:null,
    addTask:[],
    addPlan:[],
    tempBoardToDetail:null,
    filterJudge:{switch:"0",keyArray:[]},
    demands:null,
    tempTask:{content:null,taskID:null},
    tempAssignGoTest:null
};
const taskStatusChange = (newDemands, action,statusTo) => {
    let ret = action.value.split("-");
    let curGroup = ret[0];
    let taskId = ret[2];
    for (let idx in newDemands) {
        let tasksGroup = newDemands[idx].tasks;
        if (!tasksGroup) {
            continue;
        }
        let nextGroup =statusTo;
        let thisTask = 0;

        let curGroupTask = tasksGroup[curGroup];
        for (let i in curGroupTask) {
            if (taskId === curGroupTask[i].taskId) {
                thisTask = i;
            }
        }
        tasksGroup[nextGroup].push(curGroupTask[thisTask]);
        curGroupTask.splice(thisTask,1);
        return newDemands;
    }
};

export default function (state = INITIAL_STATE, action) {
    let counter=[];
    switch (action.type) {
        case OPEN_ASSIGN_GOTEST:
            let openAssignGoTestState=JSON.parse(JSON.stringify(state));
            let res = action.value.split("-");
            let currentGroup = res[0];
            let currentTaskId = res[2];
            let tempAssignGoTest=state.tempAssignGoTest;
            openAssignGoTestState.demands.map((item,index)=>{
                if (currentGroup==="develop") {
                    item.tasks.develop.map((item2,index2)=>{
                        if (item2.taskId===currentTaskId) {
                            /*openAssignGoTestState.tempAssignGoTest=item2*/
                            tempAssignGoTest=item2
                        }
                    });
                }
            });
            /*openAssignGoTestState.assignGoTestShow=true;*/
            return {...state, assignGoTestShow: true,tempAssignGoTest:tempAssignGoTest};
        case DO_ASSIGN_GOTEST:
            //todo:这里做的事情：将任务添加在被指定人的我的任务列表里面，并且将相关信息传入
            //信息已经全部加入到tempAssignGoTest，只要利用他去后台捞数据就行了包括id和被指定人
            let tempDoAssign=state.tempAssignGoTest;
            tempDoAssign.goTestMan=action.value;
            return {...state, assignGoTestShow: false,tempAssignGoTest:tempDoAssign};
        case GET_MYTASK_INFO:
            return {...state,addTask:action.value.taskList};
        case GET_TASK_DETAIL_INFO:
            return {...state,demands:action.value};
        case CLOSE_ASSIGN_GOTEST:
            return {...state, assignGoTestShow: false};
        case SAVE_TASK_EDITOR:
            let saveTaskEditorState=JSON.parse(JSON.stringify(state));
            return saveTaskEditorState;
        case CHANGE_STATUS_TO_PLAN:
            return {...state, demands: taskStatusChange(state.demands,action,"plan")};
        case CHANGE_STATUS_TO_FINISH:
            return {...state, demands: taskStatusChange(state.demands,action,"finish")};
        case CHANGE_STATUS_TO_DEV:
            return {...state, demands: taskStatusChange(state.demands,action,"develop")};
        case CHANGE_STATUS_TO_INTEGRATION:
            return {...state, demands: taskStatusChange(state.demands,action,"integration")};
        case CHANGE_STATUS_TO_TEST:
            return {...state, demands: taskStatusChange(state.demands,action,"goTest")};
        case OPEN_TASK_EDITOR:
            const openTaskEditorState=JSON.parse(JSON.stringify(state));
            let ret =action.value.split("-");
            let curGroup = ret[0];
            let taskId = ret[2];
            let tempTaskContent=null;
            let keyTaskName=Object.keys(openTaskEditorState.demands[0]["tasks"]);
            //todo:这里的需求编号需要重新做，目前是假值
            openTaskEditorState.demands.map((content,key)=>{
                content.taskName==="需求任务1"&&keyTaskName.map((v1,k1)=>{
                    v1===curGroup&&openTaskEditorState.demands[key].tasks[v1].map((v2,k2)=>{
                        taskId===v2["taskId"]&&(tempTaskContent=v2)
                    })
                })
            });
            return {...state,
                taskEditorShow: true,
                tempTask:{
                    ...state.tempTask,
                    content:tempTaskContent,
                    taskID:action.value}};
        case CLOSE_TASK_EDITOR:
            return {...state, taskEditorShow: false};
        case OPEN_BUILD_MODULE:
            return {...state, buildModuleShow: true};
        case CLOSE_BUILD_MODULE:
            return {...state, buildModuleShow: false};
        case FILTER_RESET:
            //todo:采用这种写法
            let filterJudge = state.filterJudge;
                filterJudge.switch = "0";
            return {...state,filterJudge:filterJudge};
        case FILTER_UNDERWAY:
            const filterUnderWayState=JSON.parse(JSON.stringify(state));
            filterUnderWayState.addTask.map((content,key)=>{
               if (content.taskStatus === "进行中"){
                   counter.push(key)
               }
            });
            let tempUnderWay=state.filterJudge;
            tempUnderWay.switch="1";
            tempUnderWay.keyArray=counter;
            return {...state, filterJudge: tempUnderWay};
        case FILTER_FINISH:
            const filterFinishState=JSON.parse(JSON.stringify(state));
            filterFinishState.addTask.map((content,key)=>{
                if (content.taskStatus === "已完成"){
                    counter.push(key)
                }
            });
            let tempFinish=state.filterJudge;
            tempFinish.switch="1";
            tempFinish.keyArray=counter;
            return {...state, filterJudge: tempFinish};
        case FILTER_DEV_MISSION:
            const filterDevMissionState=JSON.parse(JSON.stringify(state));
            filterDevMissionState.addTask.map((content,key)=>{
                if (content.taskType === "开发任务"){
                    counter.push(key)
                }
            });
            let tempDev=state.filterJudge;
            tempDev.switch="1";
            tempDev.keyArray=counter;
            return {...state, filterJudge: tempDev};
        case FILTER_OWN_MISSION:
            const filterOwnMissionState=JSON.parse(JSON.stringify(state));
            filterOwnMissionState.addTask.map((content,key)=>{
                if (content.taskType === "个人任务"){
                    counter.push(key)
                }
            });
            let tempOwn=state.filterJudge;
            tempOwn.switch="1";
            tempOwn.keyArray=counter;
            return {...state, filterJudge: tempOwn};
        case FILTER_DEMAND_MISSION:
            const filterDemandMissionState=JSON.parse(JSON.stringify(state));
            filterDemandMissionState.addTask.map((content,key)=>{
                if (content.taskType === "需求任务"){
                    counter.push(key)
                }
            });
            let tempDemand=state.filterJudge;
            tempDemand.switch="1";
            tempDemand.keyArray=counter;
            return {...state, filterJudge: tempDemand};
        case OPEN_BUILD_PLAN:
            return {...state, buildPlanShow: true};
        case CLOSE_BUILD_PLAN:
            return {...state, buildPlanShow: false};
        case SAVE_BUILD_PLAN:
            let tempAddPlan=state.addPlan;
            tempAddPlan.push(action.value);
            return {...state, addPlan: tempAddPlan};
        case OPEN_BUILD_MISSION:
            return {...state, buildMissionShow: true};
        case OPEN_DETAIL_MISSION:
            const openDetailMissionState=JSON.parse(JSON.stringify(state));
            openDetailMissionState.detailMissionShow=true;
            let tempMissionDeatil=state.tempBoardToDetail;
            openDetailMissionState.addTask.map((value,key)=>{
                if (action.value===value.taskCode){
                    //todo:这个地方missionId和keyNote之后要厘清
                    value["keyNote"]=action.value;
                    /*openDetailMissionState.tempBoardToDetail=value*/
                    tempMissionDeatil=value;
                }
            });
            return {...state, detailMissionShow: true,tempBoardToDetail:tempMissionDeatil};
        case OPEN_DETAIL_GOTEST:
            const openDetailGoTestState=JSON.parse(JSON.stringify(state));
            /*openDetailGoTestState.detailGoTestShow=true;*/
            let tempDetailGotest=state.tempBoardToDetail;
            openDetailGoTestState.addTask.map((value,key)=>{
                if (action.value===value.taskCode){
                    //todo:这个地方missionId和keyNote之后要厘清
                    value["keyNote"]=action.value;
                   /* openDetailGoTestState.tempBoardToDetail=value*/
                    tempDetailGotest=value;
                }
            });
            return {...state,detailGoTestShow:true,tempBoardToDetail:tempDetailGotest};
        case CLOSE_DETAIL_MISSION:
            return {...state, detailMissionShow: false};
        case CLOSE_DETAIL_GOTEST:
            return {...state, detailGoTestShow: false};
        case CLOSE_BUILD_MISSION:
            return {...state, buildMissionShow: false};
        case BUILD_SAVE_MISSION:
            let tempSaveMission=state.addTask;
            tempSaveMission.push(action.value);
            return {...state, addTask: tempSaveMission};
        case OPEN_DETAIL_INTEGRATION:
            const openDetailIntegrationState=JSON.parse(JSON.stringify(state));
           /* openDetailIntegrationState.detailIntegrationShow=true;*/
            let tempIntegration=state.tempBoardToDetail;
            openDetailIntegrationState.addTask.map((value,key)=>{
                if (action.value===value.taskCode){
                    //todo:这个地方missionId和keyNote之后要厘清
                    value["keyNote"]=action.value;
                    /*openDetailIntegrationState.tempBoardToDetail=value*/
                    tempIntegration=value;
                }
            });
            return {...state,detailIntegrationShow:true, tempBoardToDetail: tempIntegration};
        case CLOSE_DETAIL_INTEGRATION:
            return {...state, detailIntegrationShow: false};
        case OPEN_DETAIL_OTHERMISSION:
            const openOtherMissionState=JSON.parse(JSON.stringify(state));
            /*openOtherMissionState.detailOtherMissionShow=true;*/
            let tempOtherMission=state.tempBoardToDetail;
            openOtherMissionState.addTask.map((value,key)=>{
                if (action.value===value.taskCode){
                    //todo:这个地方missionId和keyNote之后要厘清
                    value["keyNote"]=action.value;
                    /*openOtherMissionState.tempBoardToDetail=value*/
                    tempOtherMission=value;
                }
            });
            return {...state, detailOtherMissionShow: true,tempBoardToDetail:tempOtherMission};
            return openOtherMissionState;
        case CLOSE_DETAIL_OTHERMISSION:
            return {...state, detailOtherMissionShow: false};
        case OPEN_DETAIL_DEVMISSION:
            const openDevMissionState=JSON.parse(JSON.stringify(state));
            /*openDevMissionState.detailDevMissionShow=true;*/
            let tempDevDetail=state.tempBoardToDetail;
            openDevMissionState.addTask.map((value,key)=>{
                if (action.value===value.taskCode){
                    //todo:这个地方missionId和keyNote之后要厘清
                    value["keyNote"]=action.value;
                    /*openDevMissionState.tempBoardToDetail=value*/
                    tempDevDetail=value
                }
            });
            return {...state, detailDevMissionShow: true,tempBoardToDetail:tempDevDetail};
        case CLOSE_DETAIL_DEVMISSION:
            return {...state, detailDevMissionShow: false};
        case PULL_INITIAL_MISSION:
            return {...state, initialData: action.payload,addTask:action.payload.tasks,demands:action.payload.demands};
        case OPEN_EDIT_MISSION:
            return {...state, editMissionShow: true};
        case CLOSE_EDIT_MISSION:
            return {...state, editMissionShow: false};
        case EDIT_SAVE_MISSION:
            //todo:这里缺少对于edit的判断，注意修改
            const saveEditMissionState=JSON.parse(JSON.stringify(state));
            saveEditMissionState.addTask.map((content,key)=>{
                if (action.value.keyNote===key){
                    saveEditMissionState.addTask[key]=action.value;
                    saveEditMissionState.tempBoardToDetail=action.value
                }
            });
            return saveEditMissionState;
        default:
            return state;
    }
}