
//所有的action公用名字在这里拾取

export const AUTH_USER = 'auth_user';
export const SENT_AUTH = 'sent_auth';
export const SHOW_NOTIFICATION = 'show_notification';
export const CLOSE_NOTIFICATION = 'close_notification';
export const AUTH_ERROR = 'auth_error';
export const UNAUTH_USER = 'unauth_user';
export const GET_DEMAND_TASKS="get_demand_tasks";
export const CHANGE_TASK_STATUS="change_task_status";
export const GET_TASK="get_task";
export const SAVE_TASK="save_task";
export const GET_DEMAND="get_demand";
export const OPEN_PROJECT="open_project";
export const SELECT_ITERATION="select_iteration";

export const ITERATION_INIT="init_iteration";
export const GET_PUBLISH_TEST_CASE="get_publish_test_case";
export const CLOSE_DEVELOP_PLAN="close_develop_plan";
export const GET_DEVELOP_PLAN="get_develop_plan";
export const ADD_ITERATION="add_iteration";
export const SAVE_ADD_ITERATION="save_add_iteration";
export const SAVE_EDIT_ITERATION="save_edit_iteration";
export const EDIT_ITERATION="edit_iteration";
export const CLOSE_ADD_ITERATION="close_add_iteration";
export const OPEN_BUILD_DEMAND="open_build_demand";
export const OPEN_BUILD_PROJECT="open_build_project";
export const OPEN_EDIT_DEMAND="open_edit_demand";
export const OPEN_EDIT_PROJECT="open_edit_project";
export const CLOSE_BUILD_DEMAND="close_build_demand";
export const CLOSE_BUILD_PROJECT="close_build_project";
export const CLOSE_EDIT_DEMAND="close_edit_demand";
export const CLOSE_EDIT_PROJECT="close_edit_project";
export const PULL_INITIAL_DEMAND="pull_initial_demand";
export const PULL_INITIAL_PROJECT="pull_initial_project";
export const SINGLE_SELECT_VALUE="single_select_value";
export const BUILD_SAVE_PROJECT="build_save_project";
export const BUILD_SAVE_DEMAND="build_save_demand";
export const EDIT_SAVE_DEMAND="edit_save_demand";
export const EDIT_SAVE_PROJECT="edit_save_project";
export const PROJECT_SAVE_SUCCESS="project_save_success";
export const DEMAND_SAVE_SUCCESS="demand_save_success";
export const PROJECT_SAVE_FAIL="project_save_fail";
export const DEMAND_SAVE_FAIL="demand_save_fail";
export const PROJECT_SAVE_ERROR="project_save_error";
export const DEMAND_SAVE_ERROR="demand_save_error";
export const FILTER_DEMAND_OPEN_MANAGER="filter_demand_open_manager";
export const FILTER_DEMAND_CLOSE_MANAGER="filter_demand_close_manager";
export const FILTER_DEMAND_OPEN_DEVELOPER="filter_demand_open_developer";
export const FILTER_DEMAND_CLOSE_DEVELOPER="filter_demand_close_developer";
export const FILTER_DEMAND_MANAGER_SAVE="filter_demand_manager_save";
export const FILTER_DEMAND_DEVELOPER_SAVE="filter_demand_developer_save";


//任务管理
//任务新建
export const OPEN_BUILD_MISSION="open_build_mission";
export const CLOSE_BUILD_MISSION="close_build_mission";
export const BUILD_SAVE_MISSION="build_save_mission";
export const PULL_INITIAL_MISSION="pull_initial_mission";
//任务编辑
export const OPEN_EDIT_MISSION="open_edit_mission";
export const CLOSE_EDIT_MISSION="close_edit_mission";
export const EDIT_SAVE_MISSION="edit_save_mission";
//需求任务详情
export const OPEN_DETAIL_MISSION="open_detail_mission";
export const CLOSE_DETAIL_MISSION="close_detail_mission";
export const SAVE_DETAIL_MISSION="save_detail_mission";
//新建方案
export const OPEN_BUILD_PLAN="open_build_plan";
export const CLOSE_BUILD_PLAN="close_build_plan";
export const SAVE_BUILD_PLAN="save_build_plan";
//需求任务筛选
export const FILTER_UNDERWAY="filter_underway";
export const FILTER_FINISH="filter_finish";
export const FILTER_DEMAND_MISSION="filter_demand_mission";
export const FILTER_DEV_MISSION="filter_dev_mission";
export const FILTER_OWN_MISSION="filter_own_mission";
export const FILTER_RESET="filter_reset";
//模块（子任务）
export const OPEN_BUILD_MODULE="open_build_module";
export const CLOSE_BUILD_MODULE="close_build_module";
export const OPEN_TASK_EDITOR="open_task_editor";
export const CLOSE_TASK_EDITOR="close_task_editor";
export const SAVE_TASK_EDITOR="save_task_editor";
//模块（子任务）状态跃迁
export const CHANGE_STATUS_TO_PLAN="change_status_to_plan";
export const CHANGE_STATUS_TO_DEV="change_status_to_dev";
export const CHANGE_STATUS_TO_JOINTTRIAL="change_status_to_jointTrial";
export const CHANGE_STATUS_TO_TEST="change_status_to_test";
