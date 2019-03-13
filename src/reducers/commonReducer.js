import {
    SHOW_NOTIFICATION,
    CLOSE_NOTIFICATION,
    SINGLE_SELECT_VALUE
} from '../actions/types';

export const INITIAL_STATE = {
    error: '',
    singleSelectValue:null
};


//专门用来登录验证的reducer
export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case SHOW_NOTIFICATION:
            return {...state, open: true, message: action.payload};
        case CLOSE_NOTIFICATION:
            return {...state, open : false, message : ""};
        case SINGLE_SELECT_VALUE:
            const singleSelectState = JSON.parse(JSON.stringify(state));
            singleSelectState.singleSelectValue=action.value;
            return singleSelectState;
        default:
            return state;
    }
}
