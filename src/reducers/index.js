import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './authReducer';
import {routerReducer} from 'react-router-redux'
// import recordingsReducer from './recordingsReducer';
import oldReducer from './makereducer';

const rootReducer = combineReducers({
    form,
    routing:routerReducer,
    auth:authReducer,
    old:oldReducer
});

export default rootReducer;