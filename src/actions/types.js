export const UPDATE_ROW = "update_row";
export const EDIT_DEMAND = "edit_demand";
export const SPLIT_DEMAND="split_demand";
export const ADD_DEMAND = "add_demand";
export const SYNC_DEMAND="sync_demand";
export const SAVE_ADD_DEMAND="save_add_demand";
export const REVIEW_DEMAND="review_demand";
export const CLOSE_REVIEW_DEMAND="close_review_demand";
export const SAVE_REVIEW_DEMAND="save_review_demand";
//所有的action公用名字在这里拾取
export const INIT_MODULES="init_modules";
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
export const CHANGE_TASK_OWNER="change_task_owner";
export const CLOSE_CHANGE_TASK_OWNER="close_change_task_owner";
export const GET_DEMAND="get_demand";
export const SELECT_ITERATION="select_iteration";
export const UPDATE_ITERATION_PERSON_INFO = "update_iteration_person_info";
export const CLOSE_UPDATE_PERSON_INFO="close_update_person_info";
export const SAVE_UPDATE_PERSON_INFO="save_update_person_info";
export const DISABLE_ALL_EXCEPT="disable_all_except";
export const START_LOADING = "start_loading";
export const STOP_LOADING = "stop_loading";
export const ITERATION_INIT="init_iteration";
export const GET_PUBLISH_TEST_CASE="get_publish_test_case";
export const CLOSE_PUBLISH_TEST_CASE="close_publish_test_case";
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
export const PROJECT_SAVE_FAIL="project_save_fail";
export const PROJECT_SAVE_ERROR="project_save_error";
export const FILTER_DEMAND_OPEN_MANAGER="filter_demand_open_manager";
export const FILTER_DEMAND_CLOSE_MANAGER="filter_demand_close_manager";
export const FILTER_DEMAND_OPEN_DEVELOPER="filter_demand_open_developer";
export const FILTER_DEMAND_CLOSE_DEVELOPER="filter_demand_close_developer";
export const FILTER_DEMAND_MANAGER_SAVE="filter_demand_manager_save";
export const FILTER_DEMAND_DEVELOPER_SAVE="filter_demand_developer_save";
export const OPEN_DEMAND_FILTER="open_demand_filter";
export const CLOSE_DEMAND_FILTER="close_demand_filter";
export const INIT_PROJECT_MEMBERS="init_project_members";
export const SAVE_EDIT_DEMAND="save_edit_demand";
export const DELETE_ITERATION="delete_iteration";
export const OPEN_ITERATION_FILTER="open_iteration_filter";
export const CLOSE_ITERATION_FILTER="close_iteration_filter";
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
//走查任务详情
export const OPEN_DETAIL_GOTEST="open_detail_goTest";
export const CLOSE_DETAIL_GOTEST="close_detail_goTest";
//持续集成任务详情
export const OPEN_DETAIL_INTEGRATION="open_detail_integration";
export const CLOSE_DETAIL_INTEGRATION="close_detail_integration";
//个人其他任务详情
export const OPEN_DETAIL_OTHERMISSION="open_detail_otherMission";
export const CLOSE_DETAIL_OTHERMISSION="close_detail_otherMission";
//开发任务详情
export const OPEN_DETAIL_DEVMISSION="open_detail_devMission";
export const CLOSE_DETAIL_DEVMISSION="close_detail_devMission";
//新建方案
export const OPEN_BUILD_PLAN="open_build_plan";
export const CLOSE_BUILD_PLAN="close_build_plan";
export const SAVE_BUILD_PLAN="save_build_plan";
//需求任务筛选
export const FILTER_DEMAND_MISSION="filter_demand_mission";
export const FILTER_OWN_MISSION="filter_own_mission";
export const FILTER_RESET="filter_reset";
//模块（子任务）
export const OPEN_BUILD_MODULE="open_build_module";
export const CLOSE_BUILD_MODULE="close_build_module";
export const SAVE_BUILD_MODULE="save_build_module";
export const OPEN_TASK_EDITOR="open_task_editor";
export const CLOSE_TASK_EDITOR="close_task_editor";
export const SAVE_TASK_EDITOR="save_task_editor";
export const OPEN_TEST_CASE_EDITOR="open_test_case_editor";
export const CLOSE_TEST_CASE_EDITOR="close_test_case_editor";
export const SAVE_TEST_CASE="save_test_case";
export const EDIT_TEST_CASE="edit_test_case";
export const CLOSE_ADD_TEST_CASE="close_add_test_case";
export const OPEN_ADD_TEST_CASE="open_add_test_case";
export const SAVE_EDIT_TEST_CASE="save_edit_test_case";
//模块（子任务）状态跃迁
export const CHANGE_STATUS_TO_PLAN="change_status_to_plan";
export const CHANGE_STATUS_TO_DEV="change_status_to_dev";
export const CHANGE_STATUS_TO_INTEGRATION="change_status_to_integration";
export const CHANGE_STATUS_TO_TEST="change_status_to_test";
export const CHANGE_STATUS_TO_FINISH="change_status_to_finish";
//taskEditor对指定走查人的操作
export const OPEN_ASSIGN_GOTEST="open_assign_goTest";
export const CLOSE_ASSIGN_GOTEST="close_assign_goTest";
export const DO_ASSIGN_GOTEST="do_assign_goTest";
//拉取MyTask初始化列表
export const GET_MYTASK_INFO="get_myTask_info";
//初始化需求开发任务详情
export const GET_TASK_DETAIL_INFO="get_taskDetail_info";
//获取任务人员
//新增走查任务到达主面板
export const ADD_TEST_TASK_PANEL="add_test_task_panel";
//从方案状态改写到开发状态
export const CHANGE_PLAN2_DEV="change_plan2_dev";
//编辑任务方案后实时对前端数据修改
export const MODIFY_AFTER_TASKEDITOR="modify_after_taskeditor";
export const FILTER_TEST_TASK="filter_test_task";
export const GET_DEVPLAN_DETAIL="get_devplan_detail";
export const SAVE_KEY="save_key";
export const CAL_PERM="cal_perm";
export const CHANGE_PASSWORD="change_password";
export const SAVE_CHANGE_PASSWORD="save_change_password";
export const CLOSE_CHANGE_PASSWORD="close_change_password";
//需求父任务的按钮显示问题
export const ALL_ACTION_SHOW="all_action_show";
export const DEMANDTASK_ACTION_SHOW="demandTask_action_show";
//开发任务的按钮显示问题
export const DEVTASK_ACTION_SHOW="devTask_action_show";
//打开新建其他个人子任务面板
export const OPEN_NEW_OTHER_TASK="open_new_other_task";
//关闭新建其他个人子任务面板
export const CLOSE_NEW_OTHER_TASK="close_new_other_task";
export const INIT_PROJECT_LISTS="init_project_lists";
export const INIT_STATUS_TYPE="init_task_status_type";
export const OPEN_EDIT_ITERATION_MEMBER="open_edit_iteration_member";
export const CLOSE_EDIT_ITERATION_MEMBER="close_edit_iteration_member";
export const OPEN_TEST_CASE_TASK="open_test_case_task";
export const CLOSE_TEST_CASE_TASK="close_test_case_task";
export const INJECT_TEST_CASE_CONTENT="inject_test_case_content";
export const TEST_CASE_SAVE_DEMANDID="test_case_save_demandId";
export const SAVE_ACTUAL_VALUE_INSERT="save_actual_value_insert";
export const EMPTY_ACTION="empty_action";
export const OPEN_TEST_CASE_EDIT="open_test_case_edit";
export const CLOSE_TEST_CASE_EDIT="close_test_case_edit";

export const SYS_INIT="sys_init";