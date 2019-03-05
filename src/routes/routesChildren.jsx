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
import Project from "../components/views/Project.jsx";
import TaskBoard from "../components/views/TaskBoard.jsx";
import DemandBoard from "../components/views/DemandBoard";
import IterationBoard from "../components/views/IterationBoard";


const dashboardRoutes = [

    // {
    //   path: "/user",
    //   sidebarName: "User Profile",
    //   navbarName: "Profile",
    //   icon: Person,
    //   component: UserProfile
    // },
    // {
    //   path: "/dashboard",
    //   sidebarName: "Dashboard",
    //   navbarName: "Material Dashboard",
    //   icon: Dashboard,
    //   component: DashboardPage
    // },
    {
      path: "/iteration",
      sidebarName: "版本",
      navbarName: "版本",
      icon: "content_paste",
      component: IterationBoard
    },
    {
        path: "/project",
        sidebarName: "项目",
        navbarName: "项目",
        icon: BubbleChart,
        component: Project
    },
    {
        path: "/taskboard",
        sidebarName: "我的任务",
        navbarName: "我的任务",
        icon: LibraryBooks,
        component: TaskBoard
    },
    {
        path: "/demands",
        sidebarName: "需求",
        navbarName: "需求",
        icon: BubbleChart,
        component: DemandBoard
    },

    {
        path: "/task/my",
        sidebarName: "需求",
        navbarName: "我的需求",
        icon: Notifications,
        component: MyPage,
        hide: true
    },
    {redirect: true, path: "/", to: "/project", navbarName: "Redirect"}
];

export default dashboardRoutes;
