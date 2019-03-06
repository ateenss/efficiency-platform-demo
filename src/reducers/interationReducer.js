import {
    SELECT_ITERATION
} from '../actions/types';

export const INITIAL_STATE = {
    error: '',
};



//专门用来登录验证的reducer
export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case SELECT_ITERATION:
            let newState = JSON.parse(JSON.stringify(state));
            newState.iteration=action.payload;

            return {...state, iteration:action.payload}
        default:
            return state;
    }
}
