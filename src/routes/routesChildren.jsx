// @material-ui/icons
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import Notifications from "@material-ui/icons/Notifications";
import Dashboard from "@material-ui/icons/Dashboard";

// core components/views
import Project from "../components/views/Project.jsx";
import TaskBoard from "../components/views/TaskBoard.jsx";
import DemandBoard from "../components/views/DemandBoard";
import IterationBoard from "../components/views/IterationBoard";
import MyPage from "../components/BuildMission/MyPage";
import TestCaseTask from "../components/BuildMission/TestCaseTask";
import My from "../components/views/My";


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
        path: "/my",
        sidebarName: "我的",
        navbarName: "我的",
        icon: Notifications,
        component: My,
    },
    {
        path: "/project",
        sidebarName: "项目",
        navbarName: "项目",
        icon: Dashboard,
        component: Project
    },
    {
        path: "/taskboard",
        sidebarName: "我的任务",
        navbarName: "我的任务",
        icon: LibraryBooks,
        component: TaskBoard,
        hide:true
    },
    {
      path: "/iteration",
      sidebarName: "版本",
      navbarName: "版本",
      icon: "content_paste",
      component: IterationBoard
    },


    {
        path: "/demands",
        sidebarName: "需求",
        navbarName: "需求",
        icon: BubbleChart,
        component: DemandBoard
    },

    {
        path: "/taskboard/detail",
        sidebarName: "任务详情",
        navbarName: "任务详情",
        icon: Notifications,
        component: MyPage,
        hide: true
    },

    {
        path: "/taskboard/testCase",
        sidebarName: "上线任务详情",
        navbarName: "上线任务详情",
        icon: Notifications,
        component: TestCaseTask,
        hide: true
    },


    {redirect: true, path: "/", to: "/my", navbarName: "Redirect"}
];

export default dashboardRoutes;
