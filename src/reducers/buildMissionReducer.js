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
    CHANGE_STATUS_TO_JOINTTRIAL,
    CHANGE_STATUS_TO_TEST,
    SAVE_TASK_EDITOR
} from "../actions/types"
/*import {taskStatusChange} from "../actions/TaskStatusChangeFunc"*/

export const INITIAL_STATE = {
    buildMissionShow:false,
    editMissionShow:false,
    detailMissionShow:false,
    buildModuleShow:false,
    buildPlanShow:false,
    taskEditorShow:false,
    filterManagerMissionShow:false,
    filterDeveloperMissionShow:false,
    initialData:null,
    addMission:[],
    addPlan:[],
    tempBoardToDetail:null,
    filterJudge:{switch:"0",keyArray:[]},
    demands:null,
    tempTask:{content:null,taskID:null}
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
        case SAVE_TASK_EDITOR:
            let saveTaskEditorState=JSON.parse(JSON.stringify(state));
            return saveTaskEditorState;
        case CHANGE_STATUS_TO_PLAN:
            let toPlanState=JSON.parse(JSON.stringify(state));
            toPlanState.demands=taskStatusChange(toPlanState.demands,action,"plan");
            return toPlanState;
        case CHANGE_STATUS_TO_DEV:
            let toDevState=JSON.parse(JSON.stringify(state));
            toDevState.demands=taskStatusChange(toDevState.demands,action,"develop");
            return toDevState;
        case CHANGE_STATUS_TO_JOINTTRIAL:
            let toJointTrialState=JSON.parse(JSON.stringify(state));
            toJointTrialState.demands=taskStatusChange(toJointTrialState.demands,action,"jointTrial");
            return toJointTrialState;
        case CHANGE_STATUS_TO_TEST:
            let toTestState=JSON.parse(JSON.stringify(state));
            toTestState.demands=taskStatusChange(toTestState.demands,action,"test");
            return toTestState;
        case OPEN_TASK_EDITOR:
            const openTaskEditorState=JSON.parse(JSON.stringify(state));
            openTaskEditorState.taskEditorShow=true;
            let ret =action.value.split("-");
            let curGroup = ret[0];
            let taskId = ret[2];
            let tempTaskContent=null;
            let keyTaskName=Object.keys(openTaskEditorState.demands[0]["tasks"]);
            console.log("我已经执行了");
            console.log(keyTaskName);
            //todo:这里的需求编号需要重新做，目前是假值
            openTaskEditorState.demands.map((content,key)=>{
                content.demandName==="需求任务1"&&keyTaskName.map((v1,k1)=>{
                    v1===curGroup&&openTaskEditorState.demands[key].tasks[v1].map((v2,k2)=>{
                        taskId===v2["taskId"]&&(tempTaskContent=v2)
                    })
                })
            });
            openTaskEditorState.tempTask["content"]=tempTaskContent;
            openTaskEditorState.tempTask["taskID"]=action.value;
            return openTaskEditorState;
        case CLOSE_TASK_EDITOR:
            const closeTaskEditorState=JSON.parse(JSON.stringify(state));
            closeTaskEditorState.taskEditorShow=false;
            return closeTaskEditorState;
        case OPEN_BUILD_MODULE:
            const openBuildModuleState=JSON.parse(JSON.stringify(state));
            openBuildModuleState.buildModuleShow=true;
            return openBuildModuleState;
        case CLOSE_BUILD_MODULE:
            const closeBuildModuleState=JSON.parse(JSON.stringify(state));
            closeBuildModuleState.buildModuleShow=false;
            return closeBuildModuleState;
        case FILTER_RESET:
            const filterResetState=JSON.parse(JSON.stringify(state));
            filterResetState.filterJudge["switch"]="0";
            return filterResetState;
        case FILTER_UNDERWAY:
            const filterUnderWayState=JSON.parse(JSON.stringify(state));
            filterUnderWayState.addMission.map((content,key)=>{
               if (content.MissionStatus === "进行中"){
                   counter.push(key)
               }
                filterUnderWayState.filterJudge={switch:"1",keyArray:counter}
            });
            return filterUnderWayState;
        case FILTER_FINISH:
            const filterFinishState=JSON.parse(JSON.stringify(state));
            filterFinishState.addMission.map((content,key)=>{
                if (content.MissionStatus === "已完成"){
                    counter.push(key)
                }
                filterFinishState.filterJudge={switch:"1",keyArray:counter}
            });
            return filterFinishState;
        case FILTER_DEV_MISSION:
            const filterDevMissionState=JSON.parse(JSON.stringify(state));
            filterDevMissionState.addMission.map((content,key)=>{
                if (content.MissionType === "开发任务"){
                    counter.push(key)
                }
                filterDevMissionState.filterJudge={switch:"1",keyArray:counter}
            });
            return filterDevMissionState;
        case FILTER_OWN_MISSION:
            const filterOwnMissionState=JSON.parse(JSON.stringify(state));
            filterOwnMissionState.addMission.map((content,key)=>{
                if (content.MissionType === "个人任务"){
                    counter.push(key)
                }
                filterOwnMissionState.filterJudge={switch:"1",keyArray:counter}
            });
            return filterOwnMissionState;
        case FILTER_DEMAND_MISSION:
            const filterDemandMissionState=JSON.parse(JSON.stringify(state));
            filterDemandMissionState.addMission.map((content,key)=>{
                if (content.MissionType === "需求任务"){
                    counter.push(key)
                }
                filterDemandMissionState.filterJudge={switch:"1",keyArray:counter}
            });
            return filterDemandMissionState;
        case OPEN_BUILD_PLAN:
            const openBuildPlanState=JSON.parse(JSON.stringify(state));
            openBuildPlanState.buildPlanShow=true;
            return openBuildPlanState;
        case CLOSE_BUILD_PLAN:
            const closeBuildPlanState=JSON.parse(JSON.stringify(state));
            closeBuildPlanState.buildPlanShow=false;
            return closeBuildPlanState;
        case SAVE_BUILD_PLAN:
            const saveBuildPlanState=JSON.parse(JSON.stringify(state));
            saveBuildPlanState.addPlan.push(action.value);
            return saveBuildPlanState;
        case OPEN_BUILD_MISSION:
            const openBuildMissionState=JSON.parse(JSON.stringify(state));
            openBuildMissionState.buildMissionShow=true;
            return openBuildMissionState;
        case OPEN_DETAIL_MISSION:
            const openDetailMissionState=JSON.parse(JSON.stringify(state));
            openDetailMissionState.detailMissionShow=true;
            // console.log("這是後臺"+action.value);
            openDetailMissionState.addMission.map((value,key)=>{
                if (key===action.value){
                    value["keyNote"]=action.value;
                    openDetailMissionState.tempBoardToDetail=value
                }
            });
            return openDetailMissionState;
        case CLOSE_DETAIL_MISSION:
            const closeDetailMissionState=JSON.parse(JSON.stringify(state));
            closeDetailMissionState.detailMissionShow=false;
            return closeDetailMissionState;
        case CLOSE_BUILD_MISSION:
            const closeBuildMissionState=JSON.parse(JSON.stringify(state));
            closeBuildMissionState.buildMissionShow=false;
            return closeBuildMissionState;
        case BUILD_SAVE_MISSION:
            const saveBuildMissionState=JSON.parse(JSON.stringify(state));
            saveBuildMissionState.addMission.push(action.value);
            return saveBuildMissionState;
        case PULL_INITIAL_MISSION:
            const initialMissionState = JSON.parse(JSON.stringify(state));
            initialMissionState.initialData=action.payload;
            initialMissionState.addMission=action.payload.tasks;
            initialMissionState.demands=action.payload.demands;
            return initialMissionState;
        case OPEN_EDIT_MISSION:
            const openEditMissionState=JSON.parse(JSON.stringify(state));
            openEditMissionState.editMissionShow=true;
            return openEditMissionState;
        case CLOSE_EDIT_MISSION:
            const closeEditMissionState=JSON.parse(JSON.stringify(state));
            closeEditMissionState.editMissionShow=false;
            return closeEditMissionState;
        case EDIT_SAVE_MISSION:
            //todo:这里缺少对于edit的判断，注意修改
            const saveEditMissionState=JSON.parse(JSON.stringify(state));
            console.log("試探：");
            console.log(action.value.keyNote);
            saveEditMissionState.addMission.map((content,key)=>{
                if (action.value.keyNote===key){
                    saveEditMissionState.addMission[key]=action.value;
                    saveEditMissionState.tempBoardToDetail=action.value
                }
            });
            return saveEditMissionState;
        default:
            return state;
    }
}