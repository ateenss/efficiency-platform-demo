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
    OPEN_BUILD_PLAN,
    CLOSE_BUILD_PLAN,
    UPDATE_TEST_CASE,
    SAVE_BUILD_PLAN,
    FILTER_DEMAND_MISSION,
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
    OPEN_DETAIL_INTEGRATION,
    CLOSE_DETAIL_INTEGRATION,
    OPEN_DETAIL_OTHERMISSION,
    CLOSE_DETAIL_OTHERMISSION,
    OPEN_DETAIL_DEVMISSION,
    CLOSE_DETAIL_DEVMISSION,
    OPEN_ASSIGN_GOTEST,
    DO_ASSIGN_GOTEST,
    CLOSE_ASSIGN_GOTEST,
    GET_MYTASK_INFO,
    GET_TASK_DETAIL_INFO,
    SAVE_BUILD_MODULE,
    CHANGE_PLAN2_DEV,
    ADD_TEST_TASK_PANEL,
    MODIFY_AFTER_TASKEDITOR,
    FILTER_TEST_TASK,
    ALL_ACTION_SHOW,
    DEMANDTASK_ACTION_SHOW,
    DEVTASK_ACTION_SHOW,INIT_PROJECT_LISTS,INIT_STATUS_TYPE,
    INIT_MODULES, OPEN_TEST_CASE_EDITOR, CLOSE_TEST_CASE_EDITOR,OPEN_NEW_OTHER_TASK,CLOSE_NEW_OTHER_TASK,
    CAL_PERM, SAVE_TEST_CASE, EDIT_TEST_CASE, OPEN_ADD_TEST_CASE, CLOSE_ADD_TEST_CASE, SAVE_EDIT_TEST_CASE
} from "../actions/types"

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

const findTask=(data,changeState)=>{
    let ret =data.split("-");
    let curGroup = ret[0];
    let taskId = ret[2];
    let tempTaskContent=null;
    let taskItem=changeState.demands.taskDetailList[curGroup];
    taskItem.map((item,index)=>{
        if (!(item.taskId-taskId)){
            tempTaskContent=item
        }
    });
    return tempTaskContent;
};

const changeStatus=(from,to,content)=>{
    to.push(content);
    let tempIndex=0;
    from.map((item,index)=>{
        if (item.taskCode===content.taskCode){
            tempIndex=index;
        }
    });
    from.splice(tempIndex,1);
};


export default function (state = INITIAL_STATE, action) {
    let counter=[];
    switch (action.type) {
        case INIT_STATUS_TYPE:
            return {...state,taskStatusList:action.payload.allTaskStatus,taskTypeList:action.payload.allTaskType};
        case CLOSE_NEW_OTHER_TASK:
            return {...state,newOtherTaskShow: false};
        case INIT_PROJECT_LISTS:
            return {...state,initialProjectList:action.payload};
        case OPEN_NEW_OTHER_TASK:
            return {...state,newOtherTaskShow:true};
        case ALL_ACTION_SHOW:
            return {...state,allActonShow:action.payload};
        case DEMANDTASK_ACTION_SHOW:
            return {...state,demandTaskActionShow:action.payload};
        case DEVTASK_ACTION_SHOW:
            return {...state,devTaskActionShow:action.payload};
        case MODIFY_AFTER_TASKEDITOR:
            let newTempTask=JSON.parse(JSON.stringify(state.tempTask));
            newTempTask.content=action.value;
            return {...state,tempTask:newTempTask};
        case CHANGE_PLAN2_DEV:
            let changePLAN2DEV=JSON.parse(JSON.stringify(state.demands));
            changeStatus(changePLAN2DEV.taskDetailList.plan,changePLAN2DEV.taskDetailList.develop,state.tempTask.content);
            return {...state,demands:changePLAN2DEV};
        case OPEN_ASSIGN_GOTEST:
            return {...state,
                assignGoTestShow: true,
                tempAssignGoTest:findTask(action.value,state)};
        case DO_ASSIGN_GOTEST:
            let changTestView=state.demands.taskDetailList;
            changTestView.goTest.push(state.tempAssignGoTest);
            let tempIndex=0;
            changTestView.develop.map((item,index)=>{
               if (item.taskCode===action.value){
                   tempIndex=index;
               }
            });
            changTestView.develop.splice(tempIndex,1);
            return {...state, assignGoTestShow: false,demands:{...state.demands,changTestView}};
        case ADD_TEST_TASK_PANEL:
            let addTaskTemp=state.addTask;
            addTaskTemp.map((item,index)=>{
                if (item.taskId===action.value) {
                    addTaskTemp.splice(index,1)
                }
            });
            return {...state,addTask:addTaskTemp};
        case GET_MYTASK_INFO:
            return {...state,addTask:action.value.taskList,finished:action.value.finished,unfinished:action.value.underWay,relatedProjectId:action.value.relatedProjectId};
        case GET_TASK_DETAIL_INFO:
            // let detailState=JSON.parse(JSON.stringify(state));
            return {...state,demands:action.value};
        case SAVE_BUILD_MODULE:
            let tempSaveContent=new Object();
            tempSaveContent["taskName"]=action.value.taskName;
            tempSaveContent["taskDeadline"]=action.value.taskDeadline;
            /*tempSaveContent["taskOwner"]=action.value.taskOwner;*/
            tempSaveContent["taskStatus"]="待评审";
            tempSaveContent["taskType"]="开发任务";
            let tempState=JSON.parse(JSON.stringify(state));
            tempState.demands.taskDetailList.plan.push(tempSaveContent);
            return {...tempState};
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
        case CAL_PERM:
            let result=false;
            if ((localStorage.getItem("currentUser")-action.value)===0){
                result=true;
            }else{
                result=false;
            }
            return {...state,devEditorCanShow:result};
        case OPEN_TASK_EDITOR:
            let ret =action.value.split("-");
            let curGroup = ret[0];
            let taskId = ret[2];
            let tempTaskContent=null;
            let taskItem=state.demands.taskDetailList[curGroup];
            taskItem.map((item,index)=>{
                if (!(item.taskId-taskId)){
                    tempTaskContent=item;

                }
            });
            return {...state,
                taskEditorShow: true,
                action:"OPEN_TASK_EDITOR",
                tempTask:{
                    ...state.tempTask,
                    content:tempTaskContent,
                    taskID:action.value}};
        case OPEN_TEST_CASE_EDITOR:
            const tempData=JSON.parse(JSON.stringify(action.value.testCase));
            return {...state, openTestCaseEditor: true,action:OPEN_TEST_CASE_EDITOR, testCase : tempData ,demandId : action.value.demandId};
        case OPEN_ADD_TEST_CASE:
            return {...state, openAddTestCase: true, action:OPEN_ADD_TEST_CASE};
        case CLOSE_TASK_EDITOR:
            return {...state, taskEditorShow: false,action:"CLOSE_TASK_EDITOR"};
        case CLOSE_TEST_CASE_EDITOR:
            return {...state, openTestCaseEditor: false,action:CLOSE_TEST_CASE_EDITOR};
        case SAVE_TEST_CASE:
            return {...state, singleTestCase:action.payload, action:SAVE_TEST_CASE, openAddTestCase : false}
        case SAVE_EDIT_TEST_CASE:
            return {...state, singleTestCase:action.payload, action:SAVE_EDIT_TEST_CASE, openAddTestCase : false}
        case EDIT_TEST_CASE:
            return {...state, editTestCase:action.payload, action:EDIT_TEST_CASE, openAddTestCase : true}
        case CLOSE_ADD_TEST_CASE:
            return {...state, action:CLOSE_ADD_TEST_CASE, openAddTestCase : false}
        case OPEN_BUILD_MODULE:
            return {...state, buildModuleShow: true};
        case CLOSE_BUILD_MODULE:
            return {...state, buildModuleShow: false};
        case FILTER_RESET:
            //todo:采用这种写法
            let filterJudge = state.filterJudge;
                filterJudge.switch = "0";
            return {...state,filterJudge:filterJudge};
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
                if (content.taskType === "需求开发任务"){
                    counter.push(key)
                }
            });
            let tempDemand=state.filterJudge;
            tempDemand.switch="1";
            tempDemand.keyArray=counter;
            return {...state, filterJudge: tempDemand};
        case FILTER_TEST_TASK:
            const filterTestMissionState=JSON.parse(JSON.stringify(state));
            filterTestMissionState.addTask.map((content,key)=>{
                if (content.taskType === "走查任务"){
                    counter.push(key)
                }
            });
            let tempTask=state.filterJudge;
            tempTask.switch="1";
            tempTask.keyArray=counter;
            return {...state, filterJudge: tempTask};
        case OPEN_BUILD_PLAN:
            if (action.value==="000"){
                return {...state, tempDemandTaskPlan:"",buildPlanShow: true,action:"OPEN_BUILD_PLAN"};
            }
            return {...state, buildPlanShow: true,tempDemandTaskPlan:action.value,action:"OPEN_BUILD_PLAN"};
        case CLOSE_BUILD_PLAN:
            return {...state, buildPlanShow: false,action:"CLOSE_BUILD_PLAN"};
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
                if (action.value===value.taskId){
                    value["keyNote"]=action.value;
                    tempMissionDeatil=value;
                }
            });
            return {...state, detailMissionShow: true,tempBoardToDetail:tempMissionDeatil};
        case OPEN_DETAIL_GOTEST:
            const openDetailGoTestState=JSON.parse(JSON.stringify(state));
            /*openDetailGoTestState.detailGoTestShow=true;*/
            let tempDetailGotest=state.tempBoardToDetail;
            openDetailGoTestState.addTask.map((value,key)=>{
                if (action.value===value.taskId){
                    value["keyNote"]=action.value;
                    tempDetailGotest=value;
                }
            });
            return {...state,detailGoTestShow:true,tempBoardToDetail:tempDetailGotest, action :OPEN_DETAIL_GOTEST};
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
                if (action.value===value.taskId){
                    value["keyNote"]=action.value;
                    tempIntegration=value;
                }
            });
            return {...state,detailIntegrationShow:true, tempBoardToDetail: tempIntegration};
        case CLOSE_DETAIL_INTEGRATION:
            return {...state, detailIntegrationShow: false};
        case OPEN_DETAIL_OTHERMISSION:
            const openOtherMissionState=JSON.parse(JSON.stringify(state));
            let tempOtherMission=state.tempBoardToDetail;
            openOtherMissionState.addTask.map((value,key)=>{
                if (action.value===value.taskId){
                    value["keyNote"]=action.value;
                    tempOtherMission=value;
                }
            });
            return {...state, detailOtherMissionShow: true,tempBoardToDetail:tempOtherMission};
        case CLOSE_DETAIL_OTHERMISSION:
            return {...state, detailOtherMissionShow: false};
        case OPEN_DETAIL_DEVMISSION:
            const openDevMissionState=JSON.parse(JSON.stringify(state));
            /*openDevMissionState.detailDevMissionShow=true;*/
            let tempDevDetail=state.tempBoardToDetail;
            openDevMissionState.addTask.map((value,key)=>{
                if (action.value===value.taskId){
                    value["keyNote"]=action.value;
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
        case INIT_MODULES:
            return {...state, modules : action.payload}
        default:
            return state;
    }
}