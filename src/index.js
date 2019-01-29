import './index.css';
import * as serviceWorker from './serviceWorker';
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory,createHistory  } from "history";
import { Router, Route, Switch ,Redirect,BrowserRouter} from "react-router-dom";
import "./assets/css/material-dashboard-react.css?v=1.5.0";
import indexRoutes from "./routes/index.jsx";
import {Provider} from 'react-redux';
import store from "./stores/index";
import {syncHistoryWithStore} from 'react-router-redux';



const hist = createBrowserHistory();
const histLink=syncHistoryWithStore(hist,store);

//在这里面设置验证通过后的地址
// const handleRedirection = props => localStorage.getItem('token') ? <RecordingList {...props} /> : <Redirect to="/login" />;

ReactDOM.render(
    <Provider store={store}>
        <Router history={hist}>
            <Switch>
                {indexRoutes.map((prop, key) => {
                    return <Route path={prop.path} component={prop.component} key={key} />;
                })}
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
