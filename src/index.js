import './index.css';
import * as serviceWorker from './serviceWorker';
import React from "react";
import ReactDOM from "react-dom";
// import { createBrowserHistory,createHistory  } from "history";
import { Router, Route, Switch ,Redirect,BrowserRouter} from "react-router-dom";
import "./assets/css/material-dashboard-react.css?v=1.5.0";
import indexRoutes from "./routes/index.jsx";
import {Provider} from 'react-redux';
import store from "./stores/index";
// import {syncHistoryWithStore} from 'react-router-redux';
// import Login from './components/Login/login';
// import Login from './components/Login/login_new'
import Logout from './components/Logout/logout';
// import {history as hist} from './actions/index';
import history from './history/history';
import Login from './components/Login/login';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import getMuiTheme from 'material-ui/styles/getMuiTheme';
// import { indigo500 } from 'material-ui/styles/colors';

// const hist = createBrowserHistory();
// const histLink=syncHistoryWithStore(hist,store);

// const handleRedirection = function (){
//     return (indexRoutes.map((prop, key) => {
//                 return <Route path={prop.path} component={prop.component} key={key}/>;
//             }
//         )
//     )
// };
//在这里面设置验证通过后的地址
// const result = props => localStorage.getItem('token') ?  handleRedirection(): <Redirect to="/login" />;
// const muiTheme = getMuiTheme({
//     palette: {
//         primary1Color: indigo500
//     }
// });

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/logout" component={Logout} />
                {localStorage.getItem('token') ?
                    indexRoutes.map((prop, key) => {
                    return <Route path={prop.path} component={prop.component} key={key} />;
                }):<Redirect to="/login" />}
            </Switch>
        </Router>

    </Provider>
    ,
    document.getElementById("root")
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
