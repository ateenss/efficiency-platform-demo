// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
// import ContentPaste from "@material-ui/icons/ContentPaste";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import Notifications from "@material-ui/icons/Notifications";
// core components/views
import DashboardPage from "../components/views/Dashboard.jsx";
import UserProfile from "../components/views/UserProfile.jsx";
import TableList from "../components/views/TableList.jsx";
import Typography from "../components/views/Typography.jsx";
import Icons from "../components/views/Icons.jsx";
import NotificationsPage from "../components/views/Notifications.jsx";
import MyPage from "../components/views/MyPage.jsx";
const dashboardRoutes = [

  {
    path: "/my",
    sidebarName: "需求",
    navbarName: "我的需求",
    icon: Notifications,
    component: MyPage
  },
  { redirect: true, path: "/", to: "/my", navbarName: "Redirect" }
];

export default dashboardRoutes;
