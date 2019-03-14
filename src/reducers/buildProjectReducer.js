import {PULL_INITIAL_PROJECT,
    BUILD_SAVE_PROJECT,
    EDIT_SAVE_PROJECT,
    PROJECT_SAVE_SUCCESS,
    PROJECT_SAVE_FAIL,
    PROJECT_SAVE_ERROR
}from "../actions/types"

export const INITIAL_STATE = {
    addProjects:[],
    noticeMessage:null,
    initialData:null,
    hintMessage:{}
};

//专门用来创建项目的reducer
export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case BUILD_SAVE_PROJECT:
            console.log("创建提交store");
            const newState=JSON.parse(JSON.stringify(state));
            newState.addProjects.push(action.value);
            return newState;
        case PROJECT_SAVE_SUCCESS:
            console.log("提交后台成功");
            const successState=JSON.parse(JSON.stringify(state));
            successState.noticeMessage="提交成功";
            return successState;
        case PROJECT_SAVE_FAIL:
            console.log("提交后台失败");
            const failState=JSON.parse(JSON.stringify(state));
            successState.noticeMessage="提交成功";
            return failState;
        case PROJECT_SAVE_ERROR:
            console.log("提交后台出现异常");
            const errorState=JSON.parse(JSON.stringify(state));
            successState.noticeMessage="提交过程出现异常";
            return errorState;
        case EDIT_SAVE_PROJECT:
            console.log("编辑修改store");
            const newRState=JSON.parse(JSON.stringify(state));
            newRState.addProjects.forEach((item,index)=>{
                if (index===action.value.keyNote){
                    newRState.addProjects[index]=action.value.ReContent
                }
            });
            return newRState;
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
            const hintDeleteState=JSON.parse(JSON.stringify(state));
            hintDeleteState.hintMessage=action.value;
            return hintDeleteState;
        default:
            return state;
    }
}