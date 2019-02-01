import {applyMiddleware,compose,createStore,combineReducers } from 'redux';
import reducer from '../reducers/index';
import middleware from './middlewares';
//下面是和router有关的引用
import {routerReducer} from 'react-router-redux';


//组装store，可以放入中间件，增强器，调试工具，reducer已经在该文件夹完成reducer们的拼装
const store=createStore(
    combineReducers({
        reducer,
        routing: routerReducer
    }),
    compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

export  default store;

