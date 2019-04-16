import axios from 'axios';
import store from '../stores/index';
import {
    SELECT_ITERATION,
    ADD_ITERATION,
    CLOSE_ADD_ITERATION,
    SAVE_ADD_ITERATION,
    EDIT_ITERATION,
    SAVE_EDIT_ITERATION,
    GET_DEVELOP_PLAN,
    CLOSE_DEVELOP_PLAN,
    GET_PUBLISH_TEST_CASE,
    CLOSE_PUBLISH_TEST_CASE,
    SHOW_NOTIFICATION, INIT_PROJECT_MEMBERS,
    GET_DEVPLAN_DETAIL
} from './types';

import React from "react";
import {GET_PROJECT_MEMBERS} from "./CommonAction";
import RequestBuilder from "../constants/RequestBuilder";
import {getDemandTaskDetail, saveModule} from "./BuildMissionAction";
import UrlConf from "../constants/UrlConf";

//axios配置
const config = {
    method: 'post',
    headers: {'Content-Type': 'application/json;charset=utf-8'},
    inCharset: "utf-8",
    outCharset: "utf-8"
};
export const GET_RECENT = UrlConf.base + 'iteration/getRecentIterations';
export const GET_BY_ID = UrlConf.base + 'iteration/get';
export const SAVE = UrlConf.base + 'iteration/save';

//审核通过
export function ProvePlan(id) {
    const url = UrlConf.base + 'iteration/proveplan';
    const config = {
        method: 'post'
    };
    let accessToken = localStorage.getItem("token");
    let request = RequestBuilder.parseRequest(accessToken,id);
    console.log("已经执行到这里面",JSON.stringify(id));
    return axios.post(url, request,config)
        .then(response => {
            if (response.data.respCode === "00") {
                let data = response.data.data;
                //下面这个方法没明白是干嘛的
                // store.dispatch(saveModule(id));
                getDemandTaskDetail(data);
            }else{

                console.log("没能拿到数据")
            }
        }).catch(error => {
            console.log("后台提取数据出现问题"+error);

        });



}


export function init(doAfterInit) {
    console.log("init");

    let accessToken = localStorage.getItem("token");

    function getProjectMembers() {
        return axios.post(GET_PROJECT_MEMBERS, {"version": "1.0", accessToken: accessToken}, config);
    }

    function getRecentIteration() {
        return axios.post(GET_RECENT, {"version": "1.0", accessToken: accessToken}, config);
    }

    axios.all([getProjectMembers(), getRecentIteration()]).then(axios.spread(function (members, iterations) {

        store.dispatch({
            type: INIT_PROJECT_MEMBERS,
            payload: members.data.data

        });


        let group = [];
        for (let i in iterations.data.data) {
            let unit = iterations.data.data[i];

            let unitChild = {id: unit.id, name : unit.iterationCode};

            let inGroup = false;

            for(let j in group){

                if(unit.group === group[j].iteration){
                    inGroup = true;
                    group[j].children.push(unitChild);
                }

            }

            if(!inGroup){
                let newUnit = {
                    iteration : unit.group,
                    children : []
                };
                newUnit.children.push(unitChild);
                group.push(newUnit);
            }

        }

        doAfterInit(group);


    }));

}

//这里是登录验证的actions，名字需要更改
// LOGIN ACTION
export function selectIteration(id, callback) {
    console.log("selectIteration被调用" + id);

    let accessToken = localStorage.getItem("token");

    return axios.post(GET_BY_ID, {"version": "1.0", accessToken:accessToken, "data": id}, config)
        .then(response => {

            if (response.data.respCode !== "00") {
                store.dispatch({
                    type: SHOW_NOTIFICATION,
                    payload: response.data.msg
                });
                return false;
            }


            let demandList = response.data.data.demandList;


            let parsedDemandList = [];
            for(let idx in demandList){

                let unit = demandList[idx];

                let demand = [];

                for(let i in unit){
                    demand.push(unit[i]);
                }

                parsedDemandList.push(demand);
            }

            const data = {
                iterationInfo: response.data.data.iteration,
                demandList: parsedDemandList,
                iterationCode: response.data.data.iteration.iterationCode

            };

            data.iterationInfo.unPlanningCnt = response.data.data.unPlanningCnt;
            data.iterationInfo.unCodeReviewCnt = response.data.data.unCodeReviewCnt;
            data.iterationInfo.unCi = response.data.data.unCi;
            data.iterationInfo.finished = response.data.data.finished;


            store.dispatch({
                type: SELECT_ITERATION,
                payload: data
            });

            if(!!callback){
                callback();
            }

        })
        .catch(error => {
            // If request fails
            console.log("!!!!!!!调用失败" + JSON.stringify(error));
            // update state to show error to user

        });

}

/**
 * 这里要区分到底是新增还是编辑
 */
export function addIteration(id) {
    let accessToken = localStorage.getItem("token");


    let ret = {
        editData: {},
        action: ""
    };

    if (!!id) {
        // TODO post here use iterationData in saveIteration
        return axios.post(GET_BY_ID, {"version": "1.0", accessToken:accessToken,"data": id}, config)
            .then(response => {

                if (response.data.respCode !== "00") {
                    store.dispatch({
                        type: SHOW_NOTIFICATION,
                        payload: response.data.msg
                    });
                    return false;
                }


                ret.editData = response.data.data.iteration;
                store.dispatch({
                    type: EDIT_ITERATION,
                    payload: ret
                })

            })
            .catch(error => {
                // If request fails
                console.log("!!!!!!!调用失败" + JSON.stringify(error));
                // update state to show error to user

            });

    } else {
        store.dispatch({
            type: ADD_ITERATION,
            payload: ret
        })
    }


}

export function closeAddIteration() {
    store.dispatch({
        type: CLOSE_ADD_ITERATION
    })

}

/**
 * 这里要区分到底是新增还是编辑
 * @param iterationData
 */
export function saveIteration(action, iterationData) {

    let accessToken = localStorage.getItem("token");


    // TODO post here, use iterationData to post
    let data = {};
    data.iterationInfo = iterationData;
    console.log("inSaveIteration" + JSON.stringify(data));
    let type = "";
    if (action == ADD_ITERATION) {
        type = SAVE_ADD_ITERATION
    } else if (action == EDIT_ITERATION) {
        type = SAVE_EDIT_ITERATION
    }

    return axios.post(SAVE, {"version": "1.0", accessToken:accessToken,"data": iterationData}, config)
        .then(response => {

            if (response.data.respCode !== "00") {
                store.dispatch({
                    type: SHOW_NOTIFICATION,
                    payload: response.data.msg
                });
                return false;
            }

            if(action === ADD_ITERATION){
                data.demandList = [];
                data.iterationInfo.id = response.data.data.id;
            }
            store.dispatch({
                type: type,
                payload: data
            })
        })
        .catch(error => {
            // If request fails
            console.log("!!!!!!!调用失败" + JSON.stringify(error));
            // update state to show error to user

        });

}

export function getDevelopPlan(id) {

    let datatemp = {};


    datatemp.testCase = [
        ["你的大可爱", "none", "testEnv", "front", "aaaaa", "openBrowser, test", "success", "success"],
        ["你的大可爱", "none", "testEnv", "front", "aaaaa", "openBrowser, test", "success", "success"],
        ["你的大可爱", "none", "testEnv", "front", "aaaaa", "openBrowser, test", "success", "success"],
        ["你的大可爱", "none", "testEnv", "front", "aaaaa", "openBrowser, test", "success", "success"]
    ];

    datatemp.demandId = id;

   /* store.dispatch({
        type: GET_DEVELOP_PLAN,
        payload: datatemp
    })
*/
    //这里的data只有数据方案了，之后还要和其他初始数据融合
    const url = 'http://127.0.0.1:8080/tiger-admin/iteration/getDemandTaskPlanInfo';
    const config = {
        method: 'post'
    };

    let accessToken = localStorage.getItem("token");
    let request = RequestBuilder.parseRequest(accessToken, id);
    return axios.post(url, request, config)
        .then(response => {
            if (response.data.respCode === "00") {
                let data = response.data.data;

                store.dispatch({
                    type: GET_DEVELOP_PLAN,
                    payload: data
                })
            } else {

                console.log("没能拿到数据")
            }
        }).catch(error => {
            console.log("后台提取数据出现问题" + error);

        });

}


export function getModuleInfo(taskId){
    const url = 'http://127.0.0.1:8080/tiger-admin/iteration/getModuleInfo';
    const config = {
        method: 'post'
    };

    let accessToken = localStorage.getItem("token");
    let request = RequestBuilder.parseRequest(accessToken, taskId);
    return axios.post(url, request, config)
        .then(response => {
            if (response.data.respCode === "00") {
                let data = response.data.data;

                store.dispatch({
                    type: GET_DEVPLAN_DETAIL,
                    payload: data
                })
            } else {

                console.log("没能拿到数据")
            }
        }).catch(error => {
            console.log("后台提取数据出现问题" + error);

        });
}


export function closePublishTestCase(){
    store.dispatch({
        type:CLOSE_PUBLISH_TEST_CASE
    })
}


export function closeDevelopPlan() {

    store.dispatch({
        type: CLOSE_DEVELOP_PLAN,
    })

}


export function getPublishDocuments() {

    let data = {};

    const columns = [
        {name: "需求ID", options: {filter: false}},
        {name: "需求名称", options: {filter: false}},
        {name: "开发负责人", options: {filter: true}},
        {name: "检查方", options: {filter: true}},
        {name: "检查时间", options: {filter: false}},
        {name: "检查项", options: {filter: false}},
        {name: "步骤或命令", options: {filter: false}},
        {name: "预期结果", options: {filter: false}},
        {name: "实际检查结果", options: {filter: false}},
        {name: "执行状态", options: {filter: false}},];

    data.publishTestCase = [
        ["2019-03-13", "你的大可爱", "长泽雅美", "信总", "2019-03-13", "前台", "openBrowser, test", "success", "success", "ok"],
        ["2019-03-13", "你的大可爱", "长泽雅美", "信总", "2019-03-13", "前台", "openBrowser, test", "success", "success", "ok"],
        ["2019-03-13", "你的大可爱", "长泽雅美", "信总", "2019-03-13", "前台", "openBrowser, test", "success", "success", "ok"],
        ["2019-03-13", "你的大可爱", "长泽雅美", "信总", "2019-03-13", "前台", "openBrowser, test", "success", "success", "ok"],
        ["2019-03-13", "你的大可爱", "长泽雅美", "信总", "2019-03-13", "前台", "openBrowser, test", "success", "success", "ok"]
    ]
    // data.testCase=[{
    //     caseDesc : "你的大可爱",
    //     preCondition : "无",
    //     envDesc : "测试环境",
    //     modules : "前台",
    //     inputData : "AAAA",
    //     steps : "打开浏览器，测试",
    //     expectedResult:"成功",
    //     actualResult : "成功"
    // }]

    store.dispatch({
        type: GET_PUBLISH_TEST_CASE,
        payload: data
    })

}

export function addIterationPerson(id) {


}