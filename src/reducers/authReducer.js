import {
    AUTH_USER,
    SENT_AUTH,
    UNAUTH_USER,
    AUTH_ERROR
} from '../actions/types';

export const INITIAL_STATE = {
    error: '',
};

//专门用来登录验证的reducer
export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case SENT_AUTH:
            return {...state, error: ''};
        case AUTH_USER:
            return {...state, error: '', authenticated: true};
        case UNAUTH_USER:
            return {...state, authenticated: false};
        case AUTH_ERROR:
            state.open = true;
            return {...state, message: action.payload};
        default:
            return state;
    }
}
