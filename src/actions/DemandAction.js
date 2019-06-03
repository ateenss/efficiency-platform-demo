import store from '../stores/index';
import {
    OPEN_BUILD_DEMAND,
    CLOSE_BUILD_DEMAND,
    PULL_INITIAL_DEMAND,
    BUILD_SAVE_DEMAND,
    OPEN_EDIT_DEMAND,
    CLOSE_EDIT_DEMAND,
    EDIT_SAVE_DEMAND,
    FILTER_DEMAND_OPEN_MANAGER,
    FILTER_DEMAND_CLOSE_MANAGER,
    FILTER_DEMAND_OPEN_DEVELOPER,
    FILTER_DEMAND_CLOSE_DEVELOPER,
    FILTER_DEMAND_MANAGER_SAVE,
    FILTER_DEMAND_DEVELOPER_SAVE,
    ADD_DEMAND,
    SHOW_NOTIFICATION,
    SAVE_ADD_DEMAND,
    SAVE_EDIT_DEMAND,
    UPDATE_ROW,
    INIT_PROJECT_MEMBERS,
    EDIT_DEMAND,
    SAVE_REVIEW_DEMAND,
    CLOSE_REVIEW_DEMAND,
    REVIEW_DEMAND,
    OPEN_DEMAND_FILTER,
    CLOSE_DEMAND_FILTER,
    SPLIT_DEMAND,
    SYNC_DEMAND
} from './types';
import axios from "axios";
import {GET_PROJECT_MEMBERS, startLoading, stopLoading} from "./CommonAction";
import UrlConf from "../constants/UrlConf";
import {error} from "../actions/NotificationAction"
//axios配置
const config = {
    method: 'post',
    headers: {'Content-Type': 'application/json;charset=utf-8'},
    inCharset: "utf-8",
    outCharset: "utf-8"
};

export const GET_DEMANDS = UrlConf.base + 'demand/getDemands';
export const GET_RECENT = UrlConf.base + 'iteration/getRecentIterations';
export const DETERMIND_ITERATION = UrlConf.base + 'demand/determineIteration';
export const GET_DEMAND = UrlConf.base + 'demand/getDemand';
export const SAVE = UrlConf.base + 'demand/save';
export const SAVE_REVIEW = UrlConf.base + 'demand/saveReview';
export const DEMAND_SPLIT = UrlConf.base + "demand/splitDemand";
export const DEMAND_SYNC = UrlConf.base + 'demand/syncDemand';

export function openFilter(currentTarget, filters){

    store.dispatch({
        type: OPEN_DEMAND_FILTER,
        payload : {currentTarget : currentTarget, filters : filters}
    });

}
export function closeFilter(filters){
    store.dispatch({
        type: CLOSE_DEMAND_FILTER,
        payload : filters
    });
}
export function addDemand() {
    console.log("addDemand");

    store.dispatch({
        type: ADD_DEMAND
    });

}


export function handleDownload(filters){

    let accessToken = localStorage.getItem("token");

    let url = UrlConf.base + "download/demands";

    return axios.post(url, {"version": "1.0", accessToken: accessToken, data : filters}, config);

}

export function demandSync(callback){


    let accessToken = localStorage.getItem("token");

    return axios.post(DEMAND_SYNC, {"version": "1.0", "accessToken": accessToken}, config)
        .then(response => {

            if (response.data.respCode !== "00") {
                error(response.data.msg);
                return false;
            }

            store.dispatch({
                type: SYNC_DEMAND,
                payload: response.data.data
            })


            callback();

        })
        .catch(e => {
            error("后台拉取数据失败",JSON.stringify(e));

        });


}


/**
 * 这里要区分到底是新增还是编辑
 * @param iterationData
 */
export function saveDemand(data) {

    console.log("inSaveDemand" + JSON.stringify(data));

    let accessToken = localStorage.getItem("token");

    return axios.post(SAVE, {"version": "1.0", "accessToken": accessToken, "data": data}, config)
        .then(response => {

            if (response.data.respCode !== "00") {
                error(response.data.msg);
                return false;
            }

            store.dispatch({
                type: SAVE_ADD_DEMAND,
                payload: response.data.data
            })
        })
        .catch(e => {
            error("后台拉取数据失败",JSON.stringify(e));

        });

}


/**
 * 这里要区分到底是新增还是编辑
 * @param iterationData
 */
export function saveReviewDemand(data) {

    console.log("insaveReviewDemand" + JSON.stringify(data));

    let accessToken = localStorage.getItem("token");

    return axios.post(SAVE_REVIEW, {"version": "1.0", "accessToken": accessToken, "data": data}, config)
        .then(response => {

            if (response.data.respCode !== "00") {
                error(response.data.msg);
                return false;
            }

            store.dispatch({
                type: SAVE_REVIEW_DEMAND,
                payload: response.data.data
            })
        })
        .catch(e => {
            error("后台拉取数据失败",JSON.stringify(e));

        });

}

/**
 * 这里要区分到底是新增还是编辑
 * @param iterationData
 */
export function saveEditDemand(data) {

    console.log("inSaveDemand" + JSON.stringify(data));

    let accessToken = localStorage.getItem("token");

    return axios.post(SAVE, {"version": "1.0", "accessToken": accessToken, "data": data}, config)
        .then(response => {

            if (response.data.respCode !== "00") {
                error(response.data.msg);
                return false;
            }

            store.dispatch({
                type: SAVE_EDIT_DEMAND,
                payload: response.data.data
            })
        })
        .catch(e => {
            error("后台拉取数据失败",JSON.stringify(e));
        });

}


export function closeReviewDemand(){
    store.dispatch({
        type : CLOSE_REVIEW_DEMAND
    })
}


export function openReviewDemand(demandId) {
    console.log("openReviewDemand");

    let accessToken = localStorage.getItem("token");

    // store.dispatch({
    //     type: REVIEW_DEMAND,
    //     payload : {id : demandId}
    // });
    return axios.post(GET_DEMAND, {"version": "1.0", accessToken: accessToken, data: demandId}, config)
        .then(response => {

            if (response.data.respCode !== "00") {
                error(response.data.msg);
            }

            let data = response.data.data;

            store.dispatch({
                type: REVIEW_DEMAND,
                payload: data
            });


        })
        .catch(e => {
            error("后台拉取数据失败",JSON.stringify(e));
        });
}


export function determineIteration(iterationId, demandId) {


    console.log("determineIteration");

    let accessToken = localStorage.getItem("token");

    return axios.post(DETERMIND_ITERATION, {
        "version": "1.0",
        accessToken: accessToken,
        data: {iterationId: iterationId, demandId: demandId}
    }, config)
        .then(response => {

            if (response.data.respCode !== "00") {
                error(response.data.msg);
                return false;
            }

            store.dispatch({

                type: UPDATE_ROW,
                payload: response.data.data

            })


        })
        .catch(e => {
            error("后台拉取数据失败",JSON.stringify(e));

        });


}


export function getRecentIteration(doAfterInit) {

    console.log("getRecentIteration");

    let accessToken = localStorage.getItem("token");

    return axios.post(GET_RECENT, {"version": "1.0", accessToken: accessToken}, config)
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


/**
 * 获取需求的分页列表，这里要对分页做处理
 * pageNo
 *
 * @param doAfterInit
 * @returns {Promise<AxiosResponse<any> | never>}
 */
export function init(pageNo, doAfterInit) {
    console.log("init");

    let accessToken = localStorage.getItem("token");

    function getDemands() {
        return axios.post(GET_DEMANDS, {"version": "1.0", accessToken: accessToken, data: {pageNo : pageNo}}, config);
    }

    function getProjectMembers() {
        return axios.post(GET_PROJECT_MEMBERS, {"version": "1.0", accessToken: accessToken}, config);
    }

    function getRecentIteration() {
        return axios.post(GET_RECENT, {"version": "1.0", accessToken: accessToken}, config);
    }

    axios.all([ getProjectMembers(), getRecentIteration()]).then(axios.spread(function (members, iterations) {

        store.dispatch({
            type: INIT_PROJECT_MEMBERS,
            payload: members.data.data

        });

        doAfterInit(members.data.data, iterations.data.data);

    }));

}

export function nextPage(pageNo, pageSize, doAfterInit) {

    let accessToken = localStorage.getItem("token");

    return axios.post(GET_DEMANDS, {"version": "1.0", accessToken: accessToken, data: {pageNo : pageNo, pageSize : pageSize}}, config)
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

    return axios.post(GET_DEMANDS, {"version": "1.0", accessToken: accessToken, data: {pageNo : pageNo, pageSize : pageSize, ...searchText}}, config)
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


export function editDemand(demandId) {
    console.log("editDemand");

    let accessToken = localStorage.getItem("token");
    return axios.post(GET_DEMAND, {"version": "1.0", accessToken: accessToken, data: demandId}, config)
        .then(response => {

            if (response.data.respCode !== "00") {
                error(response.data.msg);
            }

            let data = response.data.data;

            store.dispatch({
                type: EDIT_DEMAND,
                payload: data
            });


        })
        .catch(e => {
            error("后台拉取数据失败",JSON.stringify(e));

        });
}

export function splitDemand(demandId) {
    console.log("splitDemand");

    startLoading();


    let accessToken = localStorage.getItem("token");

    return axios.post(DEMAND_SPLIT, {"version": "1.0", accessToken: accessToken, data: demandId}, config)
        .then(response => {

            if (response.data.respCode !== "00") {
                error(response.data.msg);
            }

            let data = response.data.data;

            store.dispatch({
                type: SPLIT_DEMAND,
                payload: data
            });


            stopLoading()

        })
        .catch(e => {
            error("后台拉取数据失败",JSON.stringify(e));

        });
}

export const openFilterManagerDemand=()=>({
    type:  FILTER_DEMAND_OPEN_MANAGER
});

export const closeFilterManagerDemand=()=>({
    type:FILTER_DEMAND_CLOSE_MANAGER
});

export const openFilterDeveloperDemand=()=>({
    type:FILTER_DEMAND_OPEN_DEVELOPER
});

export const closeFilterDeveloperDemand=()=>({
    type:FILTER_DEMAND_CLOSE_DEVELOPER
});


export const openBuildDemand=()=>({
    type:OPEN_BUILD_DEMAND
});
export const closeBuildDemand=()=>({
    type:CLOSE_BUILD_DEMAND
});

export  const buildSaveDemandDispatch=(value)=>({
    type:BUILD_SAVE_DEMAND,
    value
});
export  const editDemandDispatch=(value)=>({
    type:EDIT_SAVE_DEMAND,
    value
});

export const filterSaveManagerDemand=(value)=>({
    type:FILTER_DEMAND_MANAGER_SAVE,
    value
});

export const filterSaveDeveloperDemand=value=>({
    type:FILTER_DEMAND_DEVELOPER_SAVE,
    value
});

export  const openEditDemand=()=>({
    type:OPEN_EDIT_DEMAND,
});
export const closeEditDemand=()=>({
    type:CLOSE_EDIT_DEMAND
});

