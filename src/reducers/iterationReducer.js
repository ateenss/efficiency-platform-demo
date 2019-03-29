import {
    ADD_ITERATION,
    SELECT_ITERATION,
    CLOSE_ADD_ITERATION,
    SAVE_ADD_ITERATION,
    EDIT_ITERATION, SAVE_EDIT_ITERATION, GET_DEVELOP_PLAN, CLOSE_DEVELOP_PLAN, GET_PUBLISH_TEST_CASE, ITERATION_INIT
} from '../actions/types';

export const INITIAL_STATE = {
    error: '',
};


//专门用来登录验证的reducer
export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case SELECT_ITERATION:
            return {...state, iteration: action.payload, action: SELECT_ITERATION};
        case ADD_ITERATION:
            return {...state, openAddIteration: true, initialData: action.payload.initData, action: ADD_ITERATION, editData : {}};
        case CLOSE_ADD_ITERATION:
            return {...state, openAddIteration: false, action: CLOSE_ADD_ITERATION};
        case SAVE_ADD_ITERATION:
            return {...state, openAddIteration: false, iteration: action.payload, action: SAVE_ADD_ITERATION};
        case SAVE_EDIT_ITERATION:
            return {...state, openAddIteration: false, iteration: action.payload, action: SAVE_EDIT_ITERATION};
        case EDIT_ITERATION:
            return {
                ...state,
                openAddIteration: true,
                action: EDIT_ITERATION,
                editData: action.payload.editData,
                initialData: action.payload.initData
            };
        case GET_DEVELOP_PLAN:
            return {...state, action:GET_DEVELOP_PLAN, openDevelopPlan:true, developPlan:action.payload.developPlan, testCase : action.payload.testCase, demandId : action.payload.demandId};
        case CLOSE_DEVELOP_PLAN:
            return {...state, action:CLOSE_DEVELOP_PLAN, openDevelopPlan:false};
        case GET_PUBLISH_TEST_CASE:
            return {...state, action:GET_PUBLISH_TEST_CASE, openPublishTestCase:true, publishTestCase:action.payload.publishTestCase};
        default:
            return state;
    }
}
