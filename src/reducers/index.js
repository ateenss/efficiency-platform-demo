import { combineReducers } from 'redux';
import authReducer from './authReducer';
import taskReducer from './taskReducer';
import commonReducer from './commonReducer';
import buildProjectReducer from "./buildProjectReducer"
import iterationReducer from "./interationReducer"
import buildDemandReducer from "./buildDemandReducer";
import buildMissionReducer from "./buildMissionReducer"
// import {routerReducer} from 'react-router-redux'

//执行不同功能的reducer拼装
const rootReducer = combineReducers({
    auth:authReducer,
    task:taskReducer,
    common:commonReducer,
    buildProject:buildProjectReducer,
    buildDemand:buildDemandReducer,
    iteration:iterationReducer,
    buildMission:buildMissionReducer
});

export default rootReducer;