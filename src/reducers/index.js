import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import authReducer from './authReducer';
import {routerReducer} from 'react-router-redux'
// import recordingsReducer from './recordingsReducer';
import oldReducer from './makereducer';

const rootReducer = combineReducers({
    form:reduxFormReducer,
    routing:routerReducer,
    auth:authReducer,
    old:oldReducer
});

export default rootReducer;