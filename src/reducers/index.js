import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import authReducer from './authReducer';
// import {routerReducer} from 'react-router-redux'
import oldReducer from './makereducer';

//执行不同功能的reducer拼装
const rootReducer = combineReducers({
    form:reduxFormReducer,
    auth:authReducer,
    old:oldReducer
});

export default rootReducer;