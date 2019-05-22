import {
    PULL_INITIAL_PROJECT,
    BUILD_SAVE_PROJECT,
    EDIT_SAVE_PROJECT,
    PROJECT_SAVE_SUCCESS,
    PROJECT_SAVE_FAIL,
    PROJECT_SAVE_ERROR,
    OPEN_BUILD_PROJECT,
    OPEN_EDIT_PROJECT,
    CLOSE_BUILD_PROJECT,
    CLOSE_EDIT_PROJECT,
} from "../actions/types"

export const INITIAL_STATE = {
    addProjects:[],
    noticeMessage:null,
    initialData:null,
    hintMessage:{},
    buildProjectShow:false,
    editProjectShow:false,
};

//专门用来创建项目的reducer
export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case OPEN_BUILD_PROJECT:
            return {...state, buildProjectShow:true,action:OPEN_BUILD_PROJECT};
        case OPEN_EDIT_PROJECT:
            return {...state, editProjectShow:true, project:action.payload,action:OPEN_EDIT_PROJECT};
        case CLOSE_BUILD_PROJECT:
            return {...state, buildProjectShow:false,action:CLOSE_BUILD_PROJECT};
        case CLOSE_EDIT_PROJECT:
            return {...state, editProjectShow:false,action:CLOSE_EDIT_PROJECT};
        case BUILD_SAVE_PROJECT:
            return {...state, newProject : action.payload, buildProjectShow:false,editProjectShow:false, action:BUILD_SAVE_PROJECT};
        case PROJECT_SAVE_SUCCESS:
            console.log("提交后台成功");
            const successState=JSON.parse(JSON.stringify(state));
            successState.noticeMessage="提交成功";
            return successState;
        case PROJECT_SAVE_FAIL:
            console.log("提交后台失败");
            const failState=JSON.parse(JSON.stringify(state));
            successState.noticeMessage="提交失败";
            return failState;
        case PROJECT_SAVE_ERROR:
            console.log("提交后台出现异常");
            const errorState=JSON.parse(JSON.stringify(state));
            successState.noticeMessage="提交过程出现异常";
            return errorState;
        case EDIT_SAVE_PROJECT:
            return {...state, newProject : action.payload, buildProjectShow:false,editProjectShow:false, action:EDIT_SAVE_PROJECT};
        case PULL_INITIAL_PROJECT:
            console.log("获取初始化程序成功");
            const initialState=JSON.parse(JSON.stringify(state));
            initialState.initialData=action.payload;
            return initialState;
        case "hint_pop":
            const hintState=JSON.parse(JSON.stringify(state));
            hintState.hintMessage=action.value;
            return hintState;
        case "hint_delete":
            return {...state, hintMessage:action.value};
        default:
            return state;
    }
}