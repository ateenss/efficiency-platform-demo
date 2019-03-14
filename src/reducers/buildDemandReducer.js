import {OPEN_BUILD_DEMAND,
        CLOSE_BUILD_DEMAND,
        PULL_INITIAL_DEMAND,
        BUILD_SAVE_DEMAND,
        OPEN_EDIT_DEMAND,
        CLOSE_EDIT_DEMAND,
        EDIT_SAVE_DEMAND
} from "../actions/types"


export const INITIAL_STATE = {
    buildDemandShow:false,
    editDemandShow:false,
    initialData:null,
    hintMessage:'',
    addDemand:[]
};



export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case OPEN_BUILD_DEMAND:
            // console.log("打开建立需求面板");
            const showOpenBuildState = JSON.parse(JSON.stringify(state));
            showOpenBuildState.buildDemandShow=true;
            return showOpenBuildState;
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
        default:
            return state;
    }
}