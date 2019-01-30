import {applyMiddleware,compose,createStore,combineReducers } from 'redux';
import reducer from '../reducers/index';
import middleware from './middlewares';
/*import enhances from './enhancers';*/
/*import syncHistoryWithStore from './syncHistoryWithStore';*/
//下面是和router有关的引用
import {routerReducer} from 'react-router-redux';


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

/*const hist=createBrowserHistory();
export const histLink=syncHistoryWithStore(hist,store);*/


export  default store;
/*export const history = syncHistoryWithStore(store);*/
