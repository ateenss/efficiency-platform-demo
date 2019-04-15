import {
    OPEN_BUILD_DEMAND,
    CLOSE_BUILD_DEMAND,
    PULL_INITIAL_DEMAND,
    BUILD_SAVE_DEMAND,
    OPEN_EDIT_DEMAND,
    CLOSE_EDIT_DEMAND,
    EDIT_SAVE_DEMAND,
    FILTER_DEMAND_OPEN_MANAGER,
    FILTER_DEMAND_CLOSE_MANAGER,
    FILTER_DEMAND_OPEN_DEVELOPER,
    FILTER_DEMAND_CLOSE_DEVELOPER,
    FILTER_DEMAND_MANAGER_SAVE,
    FILTER_DEMAND_DEVELOPER_SAVE,
    UPDATE_ROW,
    EDIT_DEMAND,
    SAVE_EDIT_DEMAND,
    ADD_DEMAND,
    SAVE_ADD_DEMAND,
    REVIEW_DEMAND, CLOSE_REVIEW_DEMAND, SAVE_REVIEW_DEMAND
} from "../actions/types"
import {GET_DEMAND} from "../actions/DemandTasksAction";


export const INITIAL_STATE = {
    buildDemandShow:false,
    editDemandShow:false,
    filterManagerDemandShow:false,
    filterDeveloperDemandShow:false,
    initialData:null,
    hintMessage:'',
    addDemand:[],
    filterManagerContent:[],
    filterDeveloperContent:[]
};



export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case FILTER_DEMAND_OPEN_MANAGER:
            return {...state, filterManagerDemandShow:true, action : FILTER_DEMAND_OPEN_MANAGER};
        case FILTER_DEMAND_CLOSE_MANAGER:
            const closeFilterManagerDemandState=JSON.parse(JSON.stringify(state));
            closeFilterManagerDemandState.filterManagerDemandShow=false;
            return closeFilterManagerDemandState;
        case FILTER_DEMAND_OPEN_DEVELOPER:
            const openFilterDeveloperDemandState=JSON.parse(JSON.stringify(state));
            openFilterDeveloperDemandState.filterDeveloperDemandShow=true;
            return openFilterDeveloperDemandState;
        case FILTER_DEMAND_CLOSE_DEVELOPER:
            const closeFilterDeveloperDemandState=JSON.parse(JSON.stringify(state));
            closeFilterDeveloperDemandState.filterDeveloperDemandShow=false;
            return closeFilterDeveloperDemandState;

        case OPEN_EDIT_DEMAND:
            // console.log("创建提交store");
            const showOpenEditState = JSON.parse(JSON.stringify(state));
            showOpenEditState.editDemandShow=true;
            return showOpenEditState;
        case CLOSE_BUILD_DEMAND:
            // console.log("创建提交store");
            const showCloseBuildState = JSON.parse(JSON.stringify(state));
            showCloseBuildState.buildDemandShow=false;
            return showCloseBuildState;
        case CLOSE_EDIT_DEMAND:
            // console.log("创建提交store");
            const showCloseEditState = JSON.parse(JSON.stringify(state));
            showCloseEditState.editDemandShow=false;
            return showCloseEditState;
        case PULL_INITIAL_DEMAND:
            // console.log("创建提交store");
            const initialState = JSON.parse(JSON.stringify(state));
            initialState.initialData=action.payload;
            initialState.addDemand=action.payload.dataMuiTable;
            return initialState;
        case BUILD_SAVE_DEMAND:
            console.log("提交需求内容");
            const saveState=JSON.parse(JSON.stringify(state));
            saveState.addDemand.push(action.value);
            return saveState;
        case FILTER_DEMAND_MANAGER_SAVE:
            const saveFilterManagerState=JSON.parse(JSON.stringify(state));
            saveFilterManagerState.filterManagerContent.push(action.value);
            return saveFilterManagerState;
        case FILTER_DEMAND_DEVELOPER_SAVE:
            const saveFilterDeveloperState=JSON.parse(JSON.stringify(state));
            saveFilterDeveloperState.filterDeveloperContent.push(action.value);
            return saveFilterDeveloperState;
        case EDIT_SAVE_DEMAND:
            console.log("编辑修改需求");
            const editDemandState=JSON.parse(JSON.stringify(state));
            editDemandState.addDemand.map((value,key)=>{
               if (key===action.value.findNote){
                   editDemandState.addDemand[key]=action.value;
                   console.log(editDemandState.addDemand[key]);
               }
            });

            return editDemandState;
        case EDIT_DEMAND:

            return {...state, editData: action.payload, editDemandShow: true, action : EDIT_DEMAND}
        case ADD_DEMAND:

            return {...state, buildDemandShow: true, action : ADD_DEMAND}
        case UPDATE_ROW:

            return {...state, updatedRow : action.payload, action : UPDATE_ROW}
        case SAVE_EDIT_DEMAND:

            return {...state, updatedRow : action.payload, editDemandShow:false, action:SAVE_EDIT_DEMAND}
        case SAVE_ADD_DEMAND:

            return {...state, updatedRow : action.payload, buildDemandShow:false, action:SAVE_ADD_DEMAND}
        case REVIEW_DEMAND:

            return {...state, editData: action.payload, openReviewDemand: true, action : REVIEW_DEMAND}
        case CLOSE_REVIEW_DEMAND:

            return {...state, openReviewDemand: false, action : CLOSE_REVIEW_DEMAND}
        case SAVE_REVIEW_DEMAND:

            return {...state, updatedRow : action.payload, openReviewDemand:false, action:SAVE_REVIEW_DEMAND}
        default:
            return state;
    }
}