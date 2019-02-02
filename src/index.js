import './index.css';
import * as serviceWorker from './serviceWorker';
import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Switch } from "react-router-dom";
import "./assets/css/material-dashboard-react.css?v=1.5.0";
import {Provider} from 'react-redux';
import store from "./stores/index";
import history from './history/history';
import Login from './components/Login/login';
import logout from './components/Logout/logout';
import AuthRoute from "./routes/authRoute";

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/logout" component={logout} />
                <AuthRoute/>
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
