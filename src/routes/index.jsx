import mainFrame from "../components/layouts/mainFrame.jsx";
import DashboardPage from "../components/views/Dashboard.jsx";
import { Router, Route, Switch ,Redirect,IndexRoute} from "react-router-dom";
import React from 'react';
import UserProfile from "../components/views/UserProfile.jsx";
import TableList from "../components/views/TableList.jsx";
import Typography from "../components/views/Typography.jsx";
import Icons from "../components/views/Icons.jsx";
import NotificationsPage from "../components/views/Notifications.jsx";
import history from "../history/history";

const indexRoutes = [{ path: "/", component: mainFrame}];
// console.log(history);
// const RoutesAll=(
//     <Route path="/" component={mainFrame}>
//         <Switch>
//             <Route  path="/dashboard" component={DashboardPage}/>
//             <Route  path="/user" component={UserProfile}/>
//             <Route  path="/table" component={TableList}/>
//             <Route  path="/typography" component={Typography}/>
//             <Route  path="/icons" component={Icons}/>
//             <Route  path="/notifications" component={NotificationsPage}/>
//         </Switch>
//     </Route>
// );






// export default indexRoutes;
export default indexRoutes;
