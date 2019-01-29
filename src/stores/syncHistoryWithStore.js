import {useRouterHistory} from 'react-router';
import {createBrowserHistory} from 'history'
import {routerMiddleware, syncHistoryWithStore} from 'react-router-redux';


/*const browserHistory = useRouterHistory(createHashHistory)({
    basename: '', // 相当于 rootPath
    queryKey: false // 去除随机标识符
});*/

export const historyMiddleware = routerMiddleware(createBrowserHistory);

/**
 * @param  {Store}
 * @return {History} 增强版 history
 */
export default function (store) {
    return syncHistoryWithStore(
        createBrowserHistory(),
        store
    )
}

/*const history = syncHistoryWithStore(createBrowserHistory, store);*/

