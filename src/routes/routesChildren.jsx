// @material-ui/icons
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import Notifications from "@material-ui/icons/Notifications";
// core components/views
import Project from "../components/views/Project.jsx";
import TaskBoard from "../components/views/TaskBoard.jsx";
import DemandBoard from "../components/views/DemandBoard";
import IterationBoard from "../components/views/IterationBoard";
import testDir2 from "../components/testDir/testDir2";


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
        path: "/taskboard/test",
        sidebarName: "第二级",
        navbarName: "第二级",
        icon: Notifications,
        component: testDir2,
        hide: true
    },
    {redirect: true, path: "/", to: "/project", navbarName: "Redirect"}
];

export default dashboardRoutes;
