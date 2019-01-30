import thunk from 'redux-thunk';
// import {historyMiddleware} from './syncHistoryWithStore';
import {createLogger} from 'redux-logger';

const logger = createLogger();
const middlewares =[thunk,logger];


//这里有可能加判断，是否是开发环境采用打印logg
/*const createLogger=require('redux-logger');
middlewares.push(createLogger());*/

export default middlewares