import thunk from 'redux-thunk';
// import {historyMiddleware} from './syncHistoryWithStore';
import {createLogger} from 'redux-logger';
//用来拼装放置中间件的地方，logger中间件一定要放在最后
const logger = createLogger();
const middlewares =[thunk,logger];

export default middlewares