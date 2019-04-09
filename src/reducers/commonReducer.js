import {
    SHOW_NOTIFICATION,
    CLOSE_NOTIFICATION,
    SINGLE_SELECT_VALUE, INIT_PROJECT_MEMBERS, START_LOADING, STOP_LOADING
} from '../actions/types';

export const INITIAL_STATE = {
    error: '',
    singleSelectValue:null
};


//专门用来登录验证的reducer
export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case SHOW_NOTIFICATION:
            return {...state, open: true, message: action.payload.message, type:action.payload.type};
        case CLOSE_NOTIFICATION:
            return {...state, open : false, message : ""};
        case SINGLE_SELECT_VALUE:
            const singleSelectState = JSON.parse(JSON.stringify(state));
            singleSelectState.singleSelectValue=action.value;
            return singleSelectState;
        case INIT_PROJECT_MEMBERS:
            return {...state, projectMembers : action.payload};
        case START_LOADING:
            return {...state, doLoading : true, action : START_LOADING};
        case STOP_LOADING:
            return {...state, doLoading : false, action : STOP_LOADING};
        default:
            return state;
    }
}
