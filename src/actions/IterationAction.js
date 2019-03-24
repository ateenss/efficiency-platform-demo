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
    SHOW_NOTIFICATION,
    AUTH_USER, AUTH_ERROR,
    ITERATION_INIT
} from './types';

import UrlConf from '../constants/UrlConf'
import RequestBuilder from '../constants/RequestBuilder'
import history from "../history/history";

//axios配置
const config = {
    method: 'post'
};
export const LOGIN_ENDPOINT = 'http://localhost:8080/tiger-admin/iteration/getRecentIterations';


export function init(doAfterInit) {
    console.log("init");

    let accessToken = localStorage.getItem("accessToken");


    return axios.post(LOGIN_ENDPOINT, {"version": "1.0"}, config)
        .then(response => {

            if (response.data.respCode !== "00") {
                store.dispatch({
                    type: SHOW_NOTIFICATION,
                    payload: response.data.msg
                });
                return false;
            }


            const iterations = [
                {
                    iteration: "48",
                    children: [
                        "48.1", "48.2", "48.3"
                    ]
                },
                {
                    iteration: "47",
                    children: [
                        "47.1", "47.2"
                    ]
                }


            ];

            let ret = [];

            for(let i in response.data.data){
                let unit = response.data.data[i];
                let iteration = {
                    iteration : unit.iterationCode.split(".")[0],
                    children : []
                }
                ret.push(iteration);

                for(let j in response.data.data){
                    if(iteration.iteration === response.data.data[j].iterationCode.split(".")[0]){
                        iteration.children.push(response.data.data[j].iterationCode);

                    }
                }
            }

            console.log(JSON.stringify(ret))

            doAfterInit(ret);

        })
        .catch(error => {
            // If request fails
            console.log("!!!!!!!调用失败"+JSON.stringify(error));
            // update state to show error to user

        });
}

//这里是登录验证的actions，名字需要更改
// LOGIN ACTION
export function selectIteration(id) {
    console.log("selectIteration被调用");

    let accessToken = localStorage.getItem("accessToken");

    const data = {
            iterationList: {
                iterationOwner: "张无忌",
                demandList: [
                    ["1", "YDZF-201809-12", "快速收款码需求这个需求很厉害", "张飞1", "开发中"],
                    ["2", "TYDZF-201809-13", "ApplePayOnweb需求", "韦小宝1", "已完成"],
                    ["3", "YDZF-201809-15", "你说这是什么需求", "张无忌1", "提测"],
                    ["4", "YDZF-201809-16", "楼上，你在问我吗？", "周芷若1", "未开始"],
                ]
            },
            iterationName: id

        }
    ;

    store.dispatch({
        type: SELECT_ITERATION,
        payload: data
    });
}

/**
 * 这里要区分到底是新增还是编辑
 */
export function addIteration(id) {


    const data = ["周伯通", "员工B", "员工C", "员工D", "员工E", "员工F", "员工G", "员工H"];

    let ret = {
        initData: data,
        editData: {},
        action: ""
    };

    if (!!id) {
        // TODO post here use iterationData in saveIteration
        ret.editData = {
            iterationName: "48.1",
            iterationOwner: "周伯通",
            testDate: "2019/03/01",
            publishDate: "2019/03/01",
            deliveryDate: "2019/03/01",
            developPlanSubmitDate: "2019/03/01",
            codeReviewDate: "2019/03/01",
            ciDate: "2019/03/01"
        }
        store.dispatch({
            type: EDIT_ITERATION,
            payload: ret
        })
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

    // TODO post here, use iterationData to post
    let data = iterationData;
    console.log("inSaveIteration" + JSON.stringify(data));
    let type = "";
    if (action == ADD_ITERATION) {
        data.demandList = [];
        type = SAVE_ADD_ITERATION
    } else if (action == EDIT_ITERATION) {
        type = SAVE_EDIT_ITERATION
    }

    store.dispatch({
        type: type,
        payload: data
    })
}

export function getDevelopPlan() {

    let data = {};

    const columns = [
        {name: "案例描述", options: {filter: false}},
        {name: "前置条件", options: {filter: false}},
        {name: "测试环境描述", options: {filter: true}},
        {name: "涉及子系统", options: {filter: true}},
        {name: "输入", options: {filter: false}},
        {name: "测试步骤", options: {filter: false}},
        {name: "预期结果", options: {filter: false}},
        {name: "实际结果", options: {filter: false}},];


    data.developPlan = {
        DatabaseModifyPoint: "2443",
        DeploymentRequireAdjust: "4",
        DisasterImpactAssessment: "43",
        ExternalSystemPortAdjust: "234",
        ExternalSystemSetTransform: "342",
        FiveHighImpact: "234",
        InternalSubSystemPortAdjust: "34",
        IsOrNotSupportGrayScale: "34",
        MaintenanceInfoChange: "3",
        ModuleOnLineSequenceRequire: "4324",
        OverallSchemeDescription: "<p>324322234324</p>",
        ParamConfigRequire: "24",
        PortSpecificationChange: "24",
        ProductImpactAssessment: "4",
        SafetyRelated: "4"
    };

    data.testCase = [
        ["你的大可爱", "none", "testEnv", "front", "aaaaa", "openBrowser, test", "success", "success"],
        ["你的大可爱", "none", "testEnv", "front", "aaaaa", "openBrowser, test", "success", "success"],
        ["你的大可爱", "none", "testEnv", "front", "aaaaa", "openBrowser, test", "success", "success"],
        ["你的大可爱", "none", "testEnv", "front", "aaaaa", "openBrowser, test", "success", "success"]
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
        type: GET_DEVELOP_PLAN,
        payload: data
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
