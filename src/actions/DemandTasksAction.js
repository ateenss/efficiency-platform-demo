// import axios from 'axios';
// import store from '../stores/index';
// import {
//     GET_DEMAND_TASKS,
//     CHANGE_TASK_STATUS,
//     GET_TASK,
//     SAVE_TASK,
//     EDIT_DEMAND,
//     SHOW_NOTIFICATION,
//     UPDATE_ROW,
//     INIT_PROJECT_MEMBERS,
//     BUILD_SAVE_PROJECT,
//     SAVE_EDIT_DEMAND,
//     ADD_DEMAND,
//     SAVE_ADD_DEMAND,
//     REVIEW_DEMAND,CLOSE_REVIEW_DEMAND
// } from './types';
//
// import UrlConf from '../constants/UrlConf'
// import RequestBuilder from '../constants/RequestBuilder'
// import {GET_PROJECT_MEMBERS} from "./CommonAction";
//
// //axios配置
// const config = {
//     method: 'post',
//     headers: {'Content-Type': 'application/json;charset=utf-8'},
//     inCharset: "utf-8",
//     outCharset: "utf-8"
// };
// export const GET_DEMANDS = 'http://172.20.182.141:8080/tiger-admin/demand/getDemands';
// export const GET_RECENT = 'http://172.20.182.141:8080/tiger-admin/iteration/getRecentIterations';
// export const DETERMIND_ITERATION = 'http://172.20.182.141:8080/tiger-admin/demand/determineIteration';
// export const GET_DEMAND = 'http://172.20.182.141:8080/tiger-admin/demand/getDemand';
// export const SAVE = 'http://172.20.182.141:8080/tiger-admin/demand/save';
//
//
// export function addDemand() {
//     console.log("addDemand");
//
//     store.dispatch({
//         type: ADD_DEMAND
//     });
//
// }
//
// export function closeReviewDemand(){
//     store.dispatch({
//         type : CLOSE_REVIEW_DEMAND
//     })
// }
//
//
// export function openReviewDemand(demandId) {
//     console.log("openReviewDemand");
//
//     let accessToken = localStorage.getItem("accessToken");
//
//     store.dispatch({
//         type: REVIEW_DEMAND,
//         payload : {id : demandId}
//     });
//     // return axios.post(GET_DEMAND, {"version": "1.0", accessToken: accessToken, data: demandId}, config)
//     //     .then(response => {
//     //
//     //         if (response.data.respCode !== "00") {
//     //
//     //         }
//     //
//     //         let data = response.data.data;
//     //
//     //         store.dispatch({
//     //             type: REVIEW_DEMAND,
//     //             payload: data
//     //         });
//     //
//     //
//     //     })
//     //     .catch(error => {
//     //         // If request fails
//     //         console.log("调用失败");
//     //         // update state to show error to user
//     //         // store.dispatch({
//     //         //     type: AUTH_ERROR,
//     //         //     payload: 'Invalid credentials.'
//     //         // });
//     //     });
// }
//
// /**
//  * 这里要区分到底是新增还是编辑
//  * @param iterationData
//  */
// export function saveDemand(data) {
//
//     console.log("inSaveDemand" + JSON.stringify(data));
//
//     let accessToken = localStorage.getItem("token");
//
//     return axios.post(SAVE, {"version": "1.0", "accessToken": accessToken, "data": data}, config)
//         .then(response => {
//
//             if (response.data.respCode !== "00") {
//                 store.dispatch({
//                     type: SHOW_NOTIFICATION,
//                     payload: response.data.msg
//                 });
//                 return false;
//             }
//
//             store.dispatch({
//                 type: SAVE_ADD_DEMAND,
//                 payload: response.data.data
//             })
//         })
//         .catch(error => {
//             // If request fails
//             console.log("!!!!!!!调用失败" + JSON.stringify(error));
//             // update state to show error to user
//
//         });
//
// }
//
// /**
//  * 这里要区分到底是新增还是编辑
//  * @param iterationData
//  */
// export function saveEditDemand(data) {
//
//     console.log("inSaveDemand" + JSON.stringify(data));
//
//     let accessToken = localStorage.getItem("token");
//
//     return axios.post(SAVE, {"version": "1.0", "accessToken": accessToken, "data": data}, config)
//         .then(response => {
//
//             if (response.data.respCode !== "00") {
//                 store.dispatch({
//                     type: SHOW_NOTIFICATION,
//                     payload: response.data.msg
//                 });
//                 return false;
//             }
//
//             store.dispatch({
//                 type: SAVE_EDIT_DEMAND,
//                 payload: response.data.data
//             })
//         })
//         .catch(error => {
//             // If request fails
//             console.log("!!!!!!!调用失败" + JSON.stringify(error));
//             // update state to show error to user
//
//         });
//
// }
//
//
// export function determineIteration(iterationId, demandId) {
//
//
//     console.log("determineIteration");
//
//     let accessToken = localStorage.getItem("token");
//
//     return axios.post(DETERMIND_ITERATION, {
//         "version": "1.0",
//         accessToken: accessToken,
//         data: {iterationId: iterationId, demandId: demandId}
//     }, config)
//         .then(response => {
//
//             if (response.data.respCode !== "00") {
//                 store.dispatch({
//                     type: SHOW_NOTIFICATION,
//                     payload: response.data.msg
//                 });
//                 return false;
//             }
//
//             store.dispatch({
//
//                 type: UPDATE_ROW,
//                 payload: response.data.data
//
//             })
//
//
//         })
//         .catch(error => {
//             // If request fails
//             console.log("!!!!!!!调用失败" + JSON.stringify(error));
//             // update state to show error to user
//
//         });
//
//
// }
//
//
// export function getRecentIteration(doAfterInit) {
//
//     console.log("getRecentIteration");
//
//     let accessToken = localStorage.getItem("token");
//
//     return axios.post(GET_RECENT, {"version": "1.0", accessToken: accessToken}, config)
//         .then(response => {
//
//             if (response.data.respCode !== "00") {
//                 store.dispatch({
//                     type: SHOW_NOTIFICATION,
//                     payload: response.data.msg
//                 });
//                 return false;
//             }
//
//             doAfterInit(response.data.data);
//
//         })
//         .catch(error => {
//             // If request fails
//             console.log("!!!!!!!调用失败" + JSON.stringify(error));
//             // update state to show error to user
//
//         });
// }
//
//
// /**
//  * 获取需求的分页列表，这里要对分页做处理
//  * pageNo
//  *
//  * @param doAfterInit
//  * @returns {Promise<AxiosResponse<any> | never>}
//  */
// export function init(pageNo, doAfterInit) {
//     console.log("init");
//
//     let accessToken = localStorage.getItem("token");
//
//     function getDemands() {
//         return axios.post(GET_DEMANDS, {"version": "1.0", accessToken: accessToken, data: pageNo}, config);
//     }
//
//     function getProjectMembers() {
//         return axios.post(GET_PROJECT_MEMBERS, {"version": "1.0", accessToken: accessToken}, config);
//     }
//
//     function getRecentIteration() {
//         return axios.post(GET_RECENT, {"version": "1.0", accessToken: accessToken}, config);
//     }
//
//     axios.all([getDemands(), getProjectMembers(), getRecentIteration()]).then(axios.spread(function (demands, members, iterations) {
//
//         store.dispatch({
//             type: INIT_PROJECT_MEMBERS,
//             payload: members.data.data
//
//         });
//
//         doAfterInit(demands.data.data, members.data.data, iterations.data.data);
//
//     }));
//     //
//     //
//     // return axios.post(GET_DEMANDS, {"version": "1.0", accessToken:accessToken, data : pageNo}, config)
//     //     .then(response => {
//     //
//     //         if (response.data.respCode !== "00") {
//     //             store.dispatch({
//     //                 type: SHOW_NOTIFICATION,
//     //                 payload: response.data.msg
//     //             });
//     //             return false;
//     //         }
//     //
//     //         doAfterInit(response.data.data);
//     //
//     //     })
//     //     .catch(error => {
//     //         // If request fails
//     //         console.log("!!!!!!!调用失败" + JSON.stringify(error));
//     //         // update state to show error to user
//     //
//     //     });
// }
//
// export function nextPage(pageNo, doAfterInit) {
//
//     let accessToken = localStorage.getItem("token");
//
//     return axios.post(GET_DEMANDS, {"version": "1.0", accessToken: accessToken, data: pageNo}, config)
//         .then(response => {
//
//             if (response.data.respCode !== "00") {
//                 store.dispatch({
//                     type: SHOW_NOTIFICATION,
//                     payload: response.data.msg
//                 });
//                 return false;
//             }
//
//             doAfterInit(response.data.data);
//
//         })
//         .catch(error => {
//             // If request fails
//             console.log("!!!!!!!调用失败" + JSON.stringify(error));
//             // update state to show error to user
//
//         });
// }
//
//
// export function editDemand(demandId) {
//     console.log("editDemand");
//
//     let accessToken = localStorage.getItem("accessToken");
//     return axios.post(GET_DEMAND, {"version": "1.0", accessToken: accessToken, data: demandId}, config)
//         .then(response => {
//
//             if (response.data.respCode !== "00") {
//
//             }
//
//             let data = response.data.data;
//
//             store.dispatch({
//                 type: EDIT_DEMAND,
//                 payload: data
//             });
//
//
//         })
//         .catch(error => {
//             // If request fails
//             console.log("调用失败");
//             // update state to show error to user
//             // store.dispatch({
//             //     type: AUTH_ERROR,
//             //     payload: 'Invalid credentials.'
//             // });
//         });
// }
//
//
// //这里是登录验证的actions，名字需要更改
// // LOGIN ACTION
// export function getDemandTasks() {
//     console.log("getDemandTasks被调用");
//
//     let accessToken = localStorage.getItem("accessToken");
//
//     let request = RequestBuilder.parseRequest(accessToken, {});
//
//     return axios.post(UrlConf.task.getDemandTasks(), request, config)
//         .then(response => {
//
//
//             if (response.data.respCode !== "00") {
//
//             }
//
//             let data = response.data.data;
//             // console.log("getDemandTasksResponse" + data);
//
//             store.dispatch({
//                 type: GET_DEMAND_TASKS,
//                 payload: data
//             });
//
//
//         })
//         .catch(error => {
//             // If request fails
//             console.log("调用失败");
//             // update state to show error to user
//             // store.dispatch({
//             //     type: AUTH_ERROR,
//             //     payload: 'Invalid credentials.'
//             // });
//         });
//
// }
//
//
// export function changeTaskStatus(taskId) {
//     console.log("changeTaskStatus被调用");
//
//     //todo:临时被拿出来了
//     let accessToken = localStorage.getItem("accessToken");
//     store.dispatch({
//         type: CHANGE_TASK_STATUS,
//         payload: taskId
//     });
//
//     return axios.post(UrlConf.task.getDemandTasks(), RequestBuilder.parseRequest(accessToken), config)
//         .then(response => {
//
//
//             if (response.data.respCode !== "00") {
//
//             }
//
//             // let data = response.data.data;
//
//             store.dispatch({
//                 type: CHANGE_TASK_STATUS,
//                 payload: taskId
//             });
//
//
//         })
//         .catch(error => {
//             // If request fails
//             console.log("调用失败");
//             // update state to show error to user
//             // store.dispatch({
//             //     type: AUTH_ERROR,
//             //     payload: 'Invalid credentials.'
//             // });
//         });
//
// }
//
// export function editTask(taskId) {
//     console.log("editTask");
//     let data = {"hah": "ll"};
//     store.dispatch({
//         type: GET_TASK,
//         payload: data
//     });
//
//     let accessToken = localStorage.getItem("accessToken");
//     let ret = taskId.split("-");
//     let id = 0;
//     if (ret.length > 1) {
//         id = ret[2];
//     }
//
//     return axios.post(UrlConf.task.getTask(), RequestBuilder.parseRequest(accessToken, {"taskId": id}), config)
//         .then(response => {
//
//
//             if (response.data.respCode !== "00") {
//
//             }
//
//             let data = response.data.data;
//
//             store.dispatch({
//                 type: GET_TASK,
//                 payload: data
//             });
//
//
//         })
//         .catch(error => {
//             // If request fails
//             console.log("调用失败");
//             // update state to show error to user
//             // store.dispatch({
//             //     type: AUTH_ERROR,
//             //     payload: 'Invalid credentials.'
//             // });
//         });
// }
//
//
// export function saveTask(data) {
//     console.log("saveTask");
//     let accessToken = localStorage.getItem("accessToken");
//     return axios.post(UrlConf.task.saveTask(), RequestBuilder.parseRequest(accessToken, data), config)
//         .then(response => {
//
//
//             if (response.data.respCode !== "00") {
//
//             }
//
//             let data = response.data.data;
//             console.log("saveTask:" + JSON.stringify(data));
//             store.dispatch({
//                 type: SAVE_TASK,
//                 payload: data
//             });
//
//         })
//         .catch(error => {
//             // If request fails
//             console.log("调用失败");
//             // update state to show error to user
//             // store.dispatch({
//             //     type: AUTH_ERROR,
//             //     payload: 'Invalid credentials.'
//             // });
//         });
//
// }
//
//
