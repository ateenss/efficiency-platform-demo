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
    SAVE_BUILD_PLAN
} from "../actions/types"

export const INITIAL_STATE = {
    buildMissionShow:false,
    editMissionShow:false,
    detailMissionShow:false,
    buildPlanShow:false,
    filterManagerMissionShow:false,
    filterDeveloperMissionShow:false,
    initialData:null,
    addMission:[],
    addPlan:[],
    tempBoardToDetail:null
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
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