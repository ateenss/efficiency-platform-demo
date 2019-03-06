import axios from 'axios';
import store from '../stores/index';
import {
    GET_DEMAND_TASKS,
    CHANGE_TASK_STATUS,
    GET_TASK,
    SAVE_TASK,
    GET_DEMAND
} from './types';

import UrlConf from '../constants/UrlConf'
import RequestBuilder from '../constants/RequestBuilder'

//axios配置
const config = {
    method: 'post'
};

//这里是登录验证的actions，名字需要更改
// LOGIN ACTION
export function getDemandTasks() {
    console.log("getDemandTasks被调用");

    let accessToken = localStorage.getItem("accessToken");

    let request = RequestBuilder.parseRequest(accessToken, {});

    return axios.post(UrlConf.task.getDemandTasks(), request, config)
        .then(response => {


            if (response.data.respCode !== "00") {

            }

            let data = response.data.data;
            // console.log("getDemandTasksResponse" + data);

            store.dispatch({
                type: GET_DEMAND_TASKS,
                payload: data
            });


        })
        .catch(error => {
            // If request fails
            console.log("调用失败");
            // update state to show error to user
            // store.dispatch({
            //     type: AUTH_ERROR,
            //     payload: 'Invalid credentials.'
            // });
        });

}


export function changeTaskStatus(taskId) {
    console.log("changeTaskStatus被调用");

    let accessToken = localStorage.getItem("accessToken");

    return axios.post(UrlConf.task.getDemandTasks(), RequestBuilder.parseRequest(accessToken), config)
        .then(response => {


            if (response.data.respCode !== "00") {

            }

            // let data = response.data.data;

            store.dispatch({
                type: CHANGE_TASK_STATUS,
                payload: taskId
            });


        })
        .catch(error => {
            // If request fails
            console.log("调用失败");
            // update state to show error to user
            // store.dispatch({
            //     type: AUTH_ERROR,
            //     payload: 'Invalid credentials.'
            // });
        });

}

export function editTask(taskId) {
    console.log("editTask");

    let accessToken = localStorage.getItem("accessToken");
    let ret = taskId.split("-");
    let id = 0;
    if(ret.length > 1){
      id  = ret[2];
    }

    return axios.post(UrlConf.task.getTask(), RequestBuilder.parseRequest(accessToken, {"taskId": id}), config)
        .then(response => {


            if (response.data.respCode !== "00") {

            }

            let data = response.data.data;

            store.dispatch({
                type: GET_TASK,
                payload: data
            });


        })
        .catch(error => {
            // If request fails
            console.log("调用失败");
            // update state to show error to user
            // store.dispatch({
            //     type: AUTH_ERROR,
            //     payload: 'Invalid credentials.'
            // });
        });
}


export function saveTask(data) {
    console.log("saveTask");
    let accessToken = localStorage.getItem("accessToken");
    return axios.post(UrlConf.task.saveTask(), RequestBuilder.parseRequest(accessToken, data), config)
        .then(response => {


            if (response.data.respCode !== "00") {

            }

            let data = response.data.data;
console.log("saveTask:"+JSON.stringify(data));
            store.dispatch({
                type: SAVE_TASK,
                payload: data
            });

        })
        .catch(error => {
            // If request fails
            console.log("调用失败");
            // update state to show error to user
            // store.dispatch({
            //     type: AUTH_ERROR,
            //     payload: 'Invalid credentials.'
            // });
        });

}


export function editDemand(demandId) {
    console.log("editDemand");

    let accessToken = localStorage.getItem("accessToken");
    return axios.post(UrlConf.task.getDemand(), RequestBuilder.parseRequest(accessToken, {"demandId": demandId}), config)
        .then(response => {


            if (response.data.respCode !== "00") {

            }

            let data = response.data.data;

            store.dispatch({
                type: GET_DEMAND,
                payload: data
            });


        })
        .catch(error => {
            // If request fails
            console.log("调用失败");
            // update state to show error to user
            // store.dispatch({
            //     type: AUTH_ERROR,
            //     payload: 'Invalid credentials.'
            // });
        });
}
