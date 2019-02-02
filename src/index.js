import './index.css';
import * as serviceWorker from './serviceWorker';
import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Switch ,Redirect} from "react-router-dom";
import "./assets/css/material-dashboard-react.css?v=1.5.0";
import indexRoutes from "./routes/index.jsx";
import {Provider} from 'react-redux';
import store from "./stores/index";
import history from './history/history';
import Login from './components/Login/login';
import logout from './components/Logout/logout';
import MainFrame from "./components/layouts/mainFrame.jsx";
import AuthRoute from "./routes/authRoute";
// ReactDOM.render(
//     <Provider store={store}>
//         <Router history={history}>
//             <Switch>
//                 <Route path="/login" component={Login} />
//                 <Route path="/logout" component={logout} />
//                 {localStorage.getItem('token') ?
//                     indexRoutes.map((prop, key) => {
//                     return <Route path={prop.path} component={prop.component} key={key} />;
//                 }):<Redirect to="/login" />}
//             </Switch>
//         </Router>
//     </Provider>
//     ,
//     document.getElementById("root")
// );
const handleRedirection = () => localStorage.getItem('token') ? <MainFrame/> :<Redirect to="/login" />;
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
