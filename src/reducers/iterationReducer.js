import {
    ADD_ITERATION,
    SELECT_ITERATION,
    CLOSE_ADD_ITERATION,
    SAVE_ADD_ITERATION,
    EDIT_ITERATION,
    SAVE_EDIT_ITERATION,
    GET_DEVELOP_PLAN,
    CLOSE_DEVELOP_PLAN,
    GET_PUBLISH_TEST_CASE,
    ITERATION_INIT,
    GET_DEVPLAN_DETAIL,
    CLOSE_TEST_CASE_EDIT,
    CLOSE_PUBLISH_TEST_CASE,
    SAVE_KEY,
    DELETE_ITERATION,
    OPEN_ITERATION_FILTER,
    CLOSE_ITERATION_FILTER,
    DISABLE_ALL_EXCEPT,
    OPEN_TEST_CASE_EDIT,
    UPDATE_ITERATION_PERSON_INFO, CLOSE_UPDATE_PERSON_INFO, SAVE_UPDATE_PERSON_INFO
} from '../actions/types';

export const INITIAL_STATE = {
    error: '',
};


//专门用来登录验证的reducer
export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case OPEN_TEST_CASE_EDIT:
            return {...state,openEditTestCaseShow:true,selectedTestCaseData:action.value,action:OPEN_TEST_CASE_EDIT};
        case CLOSE_TEST_CASE_EDIT:
            return {...state,openEditTestCaseShow:false,action:CLOSE_TEST_CASE_EDIT,afterEditTestCase:!!action.value?action.value:""};
        case SAVE_KEY:
            return {...state,wantKey:action.payload};
        case SELECT_ITERATION:
            return {...state, iteration: action.payload, action: SELECT_ITERATION};
        case ADD_ITERATION:
            return {...state, openAddIteration: true,
                initialData: action.payload.initData,
                action: ADD_ITERATION, editData : {}};
        case CLOSE_ADD_ITERATION:
            return {...state, openAddIteration: false, action: CLOSE_ADD_ITERATION};
        case CLOSE_UPDATE_PERSON_INFO:
            return {...state, openUpdatePersonInfo: false, action: CLOSE_UPDATE_PERSON_INFO};
        case SAVE_ADD_ITERATION:
            return {...state, openAddIteration: false, iteration: action.payload, action: SAVE_ADD_ITERATION};
        case SAVE_EDIT_ITERATION:
            return {...state, openAddIteration: false, iteration: action.payload, action: SAVE_EDIT_ITERATION};
        case SAVE_UPDATE_PERSON_INFO:
            return {...state, openUpdatePersonInfo: false, iteration: action.payload, action: SAVE_UPDATE_PERSON_INFO};
        case EDIT_ITERATION:
            return {
                ...state,
                openAddIteration: true,
                action: EDIT_ITERATION,
                editData: action.payload.editData,
                initialData: action.payload.initData
            };
        case UPDATE_ITERATION_PERSON_INFO:
            return {
                ...state,
                openUpdatePersonInfo: true,
                action: UPDATE_ITERATION_PERSON_INFO,
                editData: action.payload.editData
            };
        case GET_DEVELOP_PLAN:
            let tempTaskIdList=[];
            action.payload.moduleList.map((item,index)=>{
                tempTaskIdList.push(item.taskId)
            });
            return {...state,
                action:GET_DEVELOP_PLAN,
                openDevelopPlan:true,
                developPlan:action.payload.demandTaskPlan,
                moduleList:action.payload.moduleList,
                taskIdList:tempTaskIdList
            };
        case GET_DEVPLAN_DETAIL:
            return {...state,action:GET_DEVPLAN_DETAIL,devPlanContent:action.payload};
        case CLOSE_DEVELOP_PLAN:
            return {...state, action:CLOSE_DEVELOP_PLAN, openDevelopPlan:false};
        case GET_PUBLISH_TEST_CASE:
            return {...state, action:GET_PUBLISH_TEST_CASE,
                openPublishTestCase:true,
                publishTestCase:action.payload.testCase};
        case CLOSE_PUBLISH_TEST_CASE:
            return {...state, action:CLOSE_PUBLISH_TEST_CASE, openPublishTestCase:false};
        case DELETE_ITERATION:
            let iteration = {
                demandList: [],
                iterationCode: "",
                iterationInfo:{}
            }
            return {...state, action: DELETE_ITERATION, deleteId : action.payload, iteration : iteration}
        case OPEN_ITERATION_FILTER:
            return {...state, openIterationFilter : true, action : OPEN_ITERATION_FILTER, currentTarget : action.payload.currentTarget, filters : action.payload.filters}
        case CLOSE_ITERATION_FILTER:
            return {...state, openIterationFilter : false, action : CLOSE_ITERATION_FILTER, currentTarget : null, filters : action.payload}
        case DISABLE_ALL_EXCEPT:
            return {...state, activeName : action.payload, action : DISABLE_ALL_EXCEPT}
        default:
            return state;
    }
}
