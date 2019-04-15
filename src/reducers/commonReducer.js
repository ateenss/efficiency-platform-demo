import {
    SHOW_NOTIFICATION, CLOSE_NOTIFICATION,INIT_PROJECT_MEMBERS, START_LOADING, STOP_LOADING
} from '../actions/types';

export const INITIAL_STATE = {
    error: '',
    singleSelectValue:null
};


//专门用来登录验证的reducer
export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case SHOW_NOTIFICATION:
            return {...state, open: true, message: action.payload.message, type:action.payload.type, action :SHOW_NOTIFICATION};
        case CLOSE_NOTIFICATION:
            return {...state, open : false, message : "", action : CLOSE_NOTIFICATION};
        case INIT_PROJECT_MEMBERS:
            return {...state, projectMembers : action.payload, action : INIT_PROJECT_MEMBERS};
        case START_LOADING:
            return {...state, doLoading : true, action : START_LOADING};
        case STOP_LOADING:
            return {...state, doLoading : false, action : STOP_LOADING};
        default:
            return state;
    }
}
