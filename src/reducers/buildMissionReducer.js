import {
    OPEN_BUILD_MISSION,
    CLOSE_BUILD_MISSION,
    BUILD_SAVE_MISSION,
    OPEN_EDIT_MISSION,
    CLOSE_EDIT_MISSION,
    EDIT_SAVE_MISSION,
    PULL_INITIAL_MISSION
} from "../actions/types"

export const INITIAL_STATE = {
    buildMissionShow:false,
    editMissionShow:false,
    filterManagerMissionShow:false,
    filterDeveloperMissionShow:false,
    initialData:null,
    addMission:[],
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case OPEN_BUILD_MISSION:
            const openBuildMissionState=JSON.parse(JSON.stringify(state));
            openBuildMissionState.buildMissionShow=true;
            return openBuildMissionState;
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
            // initialMissionState.addDemand=action.payload.dataMuiTable;
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
            saveEditMissionState.addMission.push(action.value);
            return saveEditMissionState;
        default:
            return state;
    }
}