import {OPEN_BUILD_DEMAND,
        CLOSE_BUILD_DEMAND,
        PULL_INITIAL_DEMAND,
        BUILD_SAVE
} from "../actions/types"


export const INITIAL_STATE = {
    isOrNotShow:false,
    initialData:null,
    hintMessage:'',
    addDemand:[]
};



export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case OPEN_BUILD_DEMAND:
            // console.log("创建提交store");
            const showOpenState = JSON.parse(JSON.stringify(state));
            showOpenState.isOrNotShow=true;
            return showOpenState;
        case CLOSE_BUILD_DEMAND:
            // console.log("创建提交store");
            const showCloseState = JSON.parse(JSON.stringify(state));
            showCloseState.isOrNotShow=false;
            return showCloseState;
        case PULL_INITIAL_DEMAND:
            // console.log("创建提交store");
            const initialState = JSON.parse(JSON.stringify(state));
            initialState.initialData=action.payload;
            return initialState;
        case BUILD_SAVE:
            console.log("提交需求内容");
            const saveState=JSON.parse(JSON.stringify(state));
            saveState.addDemand.push(action.value);
            return saveState;
        default:
            return state;
    }
}