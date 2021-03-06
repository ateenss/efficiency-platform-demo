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
    INIT_PROJECT_MEMBERS,
    GET_DEVPLAN_DETAIL,
    CLOSE_TEST_CASE_EDIT,
    DELETE_ITERATION, OPEN_ITERATION_FILTER, CLOSE_ITERATION_FILTER,
    DISABLE_ALL_EXCEPT,
    UPDATE_ITERATION_PERSON_INFO, CLOSE_UPDATE_PERSON_INFO,SAVE_UPDATE_PERSON_INFO
} from './types';

import {GET_PROJECT_MEMBERS} from "./CommonAction";
import RequestBuilder from "../constants/RequestBuilder";
import UrlConf from "../constants/UrlConf";
import {error, success, warning} from "./NotificationAction";

//axios配置
const config = {
    method: 'post',
    headers: {'Content-Type': 'application/json;charset=utf-8'},
    inCharset: "utf-8",
    outCharset: "utf-8"
};
export const GET_RECENT = UrlConf.base + 'iteration/getRecentIterations';
export const GET_BY_ID = UrlConf.base + 'iteration/get';
export const DELETE_BY_ID = UrlConf.base + 'iteration/delete';

export const SAVE_PERSON_INFO = UrlConf.base + 'iteration/updatePersonInfo';
export const SAVE = UrlConf.base + 'iteration/save';
export const HISTORY_ITERATION = UrlConf.base + 'iteration/histories';
export const GET_MODULES_STATS_BY_ITERATION = UrlConf.base + "modules/getModulesStatsByIteration";
//审核通过
export function ProvePlan(id) {
    const url = UrlConf.base + 'iteration/proveplan';
    const config = {
        method: 'post'
    };
    let accessToken = localStorage.getItem("token");
    let request = RequestBuilder.parseRequest(accessToken,id);
    return axios.post(url, request,config)
        .then(response => {
            if (response.data.respCode === "00") {
                let data = response.data.data;
                // store.dispatch(saveModule(id));
                initIterationSimple(doAfterInit);
            }else{

                error(response.data.msg);
            }
        }).catch(e => {
            error("后台拉取数据失败",JSON.stringify(e));

        });



}


export function getDownloadLink(iterationId){

    let accessToken = localStorage.getItem("token");

    let url = UrlConf.base + "download/deliveryDoc";

    return axios.post(url, {"version": "1.0", accessToken: accessToken, data : iterationId}, config);


}

export function getRecentIterationByProjectId(projectId) {

    let accessToken = localStorage.getItem("token");

    return axios.post(GET_RECENT, {"version": "1.0", accessToken: accessToken, data : projectId}, config);
}

export function getRecentIteration() {

    let accessToken = localStorage.getItem("token");

    return axios.post(GET_RECENT, {"version": "1.0", accessToken: accessToken}, config);
}

export function init(doAfterInit) {
    console.log("init");

    let accessToken = localStorage.getItem("token");

    axios.post(GET_RECENT, {"version": "1.0", accessToken: accessToken}, config).then(function (members, iterations) {

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


    });

}

export function initIterationSimple(doAfterInit) {

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


function doAfterInit(ret) {
    let iterationState = [];

    let selectId = "";
    for (let i in ret) {
        let iter = ret[i];

        let parent = {};
        let iterationChildren = [];
        for (let j in iter.children) {
            let selected = false;
            if (i == 0 && j == 0) {
                selected = true;
                selectId = iter.children[j].id;
            }
            iterationChildren.push({iter: iter.children[j].name, selected: selected, id: iter.children[j].id});

        }

        parent.children = iterationChildren;
        parent.iteration = {name: iter.iteration, selected: false};
        iterationState.push(parent);
    }

    if (!!selectId) {
        selectIteration(selectId, function () {
        });
    }
}



//这里是登录验证的actions，名字需要更改
// LOGIN ACTION
export function selectIteration(id, callback) {

    let accessToken = localStorage.getItem("token");

    return axios.post(GET_BY_ID, {"version": "1.0", accessToken:accessToken, "data": id}, config)
        .then(response => {

            if (response.data.respCode !== "00") {
                error(response.data.msg);
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
                iterationCode: response.data.data.iteration.iterationCode,
                relatedIterationInfo : response.data.data.relatedIteration
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
        .catch(e => {
            error("后台拉取数据失败",JSON.stringify(e));

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
                    error(response.data.msg);
                    return false;
                }


                ret.editData = response.data.data.iteration;
                store.dispatch({
                    type: EDIT_ITERATION,
                    payload: ret
                })

            })
            .catch(e => {
                error("后台拉取数据失败",JSON.stringify(e));

            });

    } else {
        store.dispatch({
            type: ADD_ITERATION,
            payload: ret
        })
    }


}

export function updatePersonInfo(id) {
    let accessToken = localStorage.getItem("token");


    let ret = {
        editData: {},
        action: ""
    };

    if (!!id) {
        return axios.post(GET_BY_ID, {"version": "1.0", accessToken:accessToken,"data": id}, config)
            .then(response => {

                if (response.data.respCode !== "00") {
                    error(response.data.msg);
                    return false;
                }


                ret.editData = response.data.data.iteration;
                store.dispatch({
                    type: UPDATE_ITERATION_PERSON_INFO,
                    payload: ret
                })

            })
            .catch(e => {
                error("后台拉取数据失败",JSON.stringify(e));

            });

    } else {
        store.dispatch({
            type: ADD_ITERATION,
            payload: ret
        })
    }


}


export function closeUpdatePersonInfo() {
    store.dispatch({
        type: CLOSE_UPDATE_PERSON_INFO
    })

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
    let type = "";
    if (action == ADD_ITERATION) {
        type = SAVE_ADD_ITERATION
    } else if (action == EDIT_ITERATION) {
        type = SAVE_EDIT_ITERATION
    }

    return axios.post(SAVE, {"version": "1.0", accessToken:accessToken,"data": iterationData}, config)
        .then(response => {

            if (response.data.respCode !== "00") {
                error(response.data.msg);
                return false;
            }

            if(action === ADD_ITERATION){
                data.demandList = [];
                data.iterationInfo.id = response.data.data.id;
            }

            data.iterationInfo = response.data.data.iteration;
            data.iterationInfo.unPlanningCnt = response.data.data.unPlanningCnt;
            data.iterationInfo.unCodeReviewCnt = response.data.data.unCodeReviewCnt;
            data.iterationInfo.unCi = response.data.data.unCi;
            data.iterationInfo.finished = response.data.data.finished;


            store.dispatch({
                type: type,
                payload: data
            })
        })
        .catch(e => {
            error("后台拉取数据失败",JSON.stringify(e));

        });

}

export function savePersonInfo(iterationData) {

    let accessToken = localStorage.getItem("token");


    // TODO post here, use iterationData to post
    let data = {};
    data.iterationInfo = iterationData;

    return axios.post(SAVE_PERSON_INFO, {"version": "1.0", accessToken:accessToken,"data": iterationData}, config)
        .then(response => {

            if (response.data.respCode !== "00") {
                error(response.data.msg);
                return false;
            }

            data.iterationInfo = response.data.data.iteration;
            data.iterationInfo.unPlanningCnt = response.data.data.unPlanningCnt;
            data.iterationInfo.unCodeReviewCnt = response.data.data.unCodeReviewCnt;
            data.iterationInfo.unCi = response.data.data.unCi;
            data.iterationInfo.finished = response.data.data.finished;


            store.dispatch({
                type: SAVE_UPDATE_PERSON_INFO,
                payload: data
            })
        })
        .catch(e => {
            error("后台拉取数据失败",JSON.stringify(e));

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

    //这里的data只有数据方案了，之后还要和其他初始数据融合
    const url = UrlConf.base + 'iteration/getDemandTaskPlanInfo';
    const config = {
        method: 'post'
    };

    let accessToken = localStorage.getItem("token");
    let request = RequestBuilder.parseRequest(accessToken, id);
    return axios.post(url, request, config)
        .then(response => {
            if (response.data.respCode === "00") {
                let data = response.data.data;
                if (data.demandTaskStatus!==1&&data.demandTaskStatus!==0) {
                    store.dispatch({
                        type: GET_DEVELOP_PLAN,
                        payload: data
                    })
                }else{
                    warning("开发方案还未完成");
                }
            } else {

                error(response.data.msg);
            }
        }).catch(e => {
            error("后台拉取数据失败",JSON.stringify(e));

        });

}


export function getModuleInfo(taskId){
    const url = UrlConf.base + 'iteration/getModuleInfo';
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

                error(response.data.msg);
            }
        }).catch(e => {
            error("后台拉取数据失败",JSON.stringify(e));

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

export function closeOnlineTestCases() {
    store.dispatch({
        type:CLOSE_PUBLISH_TEST_CASE
    })
}

//上线测试案例通过
export function ProveOnLineTestCases(id) {
    const url = UrlConf.base + 'iteration/proveOnLineTestCase';
    const config = {
        method: 'post'
    };
    let accessToken = localStorage.getItem("token");
    let request = RequestBuilder.parseRequest(accessToken,id);
    return axios.post(url, request,config)
        .then(response => {
            if (response.data.respCode === "00") {
                let data = response.data.data;
                if (data===333){
                    warning("还没完成集成测试");
                }else{
                    initIterationSimple(doAfterInit);
                    store.dispatch({
                    type:CLOSE_PUBLISH_TEST_CASE
                })}
            }else{

                error(response.data.msg);
            }
        }).catch(e => {
            error("后台拉取数据失败",JSON.stringify(e));

        });
}


export function getPublishDocuments(demandId) {
    const send_edit_data = UrlConf.base + 'task/getDemandTaskTestCase';
    let accessToken = localStorage.getItem("token");
    let request = RequestBuilder.parseRequest(accessToken,demandId);
    console.log("打开没有啊1",JSON.stringify(demandId));
    return axios.post(send_edit_data, request,config)
        .then(response => {
            if (response.data.respCode === "00") {
                let data = response.data.data;
                console.log("打开没有啊2",JSON.stringify(data));
                if (data.check!==111){
                    store.dispatch({
                        type: GET_PUBLISH_TEST_CASE,
                        payload: data
                    })
                }else{
                    warning("还没完成上线测试案例");
                }
            }else{

                error(response.data.msg);
            }
        }).catch(e => {
            error("后台拉取数据失败",JSON.stringify(e));

        });


}



/**
 * 这里要区分到底是新增还是编辑
 */
export function deleteIteration(id) {
    let accessToken = localStorage.getItem("token");

    return axios.post(DELETE_BY_ID, {"version": "1.0", accessToken:accessToken,"data": id}, config)
        .then(response => {

            if (response.data.respCode !== "00") {
                error(response.data.msg);
                return false;
            }

            store.dispatch({
                type: DELETE_ITERATION,
                payload : id
            })

        })
        .catch(e => {
            error("后台拉取数据失败",JSON.stringify(e));
        });


}


export function nextPage(pageNo, pageSize, doAfterInit) {

    let accessToken = localStorage.getItem("token");

    return axios.post(HISTORY_ITERATION, {"version": "1.0", accessToken: accessToken, data: {pageNo : pageNo, pageSize : pageSize}}, config)
        .then(response => {

            if (response.data.respCode !== "00") {
                error(response.data.msg);
                return false;
            }

            doAfterInit(response.data.data);

        })
        .catch(e => {
            error("后台拉取数据失败",JSON.stringify(e));
        });
}


export function search(pageNo, pageSize, searchText, doAfterInit) {

    let accessToken = localStorage.getItem("token");

    return axios.post(HISTORY_ITERATION, {"version": "1.0", accessToken: accessToken, data: {pageNo : pageNo, pageSize : pageSize,...searchText}}, config)
        .then(response => {

            if (response.data.respCode !== "00") {
                error(response.data.msg);
                return false;
            }

            doAfterInit(response.data.data);

        })
        .catch(e => {
            error("后台拉取数据失败",JSON.stringify(e));

        });
}

//////
export function saveEditTestCase(content) {
    store.dispatch({
       type:CLOSE_TEST_CASE_EDIT, value:content
    });
    const url = UrlConf.base + 'task/saveEditTestCase';
    const config = {
        method: 'post'
    };
    let accessToken = localStorage.getItem("token");
    let request = RequestBuilder.parseRequest(accessToken,content);
    return axios.post(url, request,config)
        .then(response => {
            if (response.data.respCode === "00") {
                let data = response.data.data;
                success("保存成功");
            }else{
                error(response.data.msg);
            }
        }).catch(e => {
            error("后台拉取数据失败",JSON.stringify(e));

        });
}


export function openFilter(currentTarget, filters){

    store.dispatch({
        type: OPEN_ITERATION_FILTER,
        payload : {currentTarget : currentTarget, filters : filters}
    });

}
export function closeFilter(filters){
    store.dispatch({
        type: CLOSE_ITERATION_FILTER,
        payload : filters
    });
}

export function disableAllExcept(iterationName){

    store.dispatch({
        type : DISABLE_ALL_EXCEPT,
        payload : iterationName
    });


}

export function getModulesStatsByIteration(iterationId){


    let accessToken = localStorage.getItem("token");

    return axios.post(GET_MODULES_STATS_BY_ITERATION, {"version": "1.0", accessToken: accessToken, data : iterationId}, config);

}