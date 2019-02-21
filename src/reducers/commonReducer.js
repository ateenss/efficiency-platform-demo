import {
    SHOW_NOTIFICATION,CLOSE_NOTIFICATION
} from '../actions/types';

export const INITIAL_STATE = {
    error: '',
};


//专门用来登录验证的reducer
export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case SHOW_NOTIFICATION:
            return {...state, open: true, message: action.payload};
        case CLOSE_NOTIFICATION:
            return {...state, open : false, message : ""};
        default:
            return state;
    }
}
