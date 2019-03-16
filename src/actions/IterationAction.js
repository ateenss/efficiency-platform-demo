import axios from 'axios';
import store from '../stores/index';
import {
    SELECT_ITERATION,
    ADD_ITERATION,
    CLOSE_ADD_ITERATION,
    SAVE_ADD_ITERATION,
    EDIT_ITERATION, SAVE_EDIT_ITERATION
} from './types';

import UrlConf from '../constants/UrlConf'
import RequestBuilder from '../constants/RequestBuilder'

//axios配置
const config = {
    method: 'post'
};

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


    const data = ["员工A", "员工B", "员工C", "员工D", "员工E", "员工F", "员工G", "员工H"];

    let ret = {
        initData: data,
        editData: {},
        action: ""
    };

    if (!!id) {
        // TODO post here use iterationData in saveIteration
        ret.editData = {
            iterationName: "48.1",
            iterationOwner: "周日",
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
    let data = {
        iterationName: iterationData.iterationName
    };
    let type = "";
    if (action == ADD_ITERATION) {
        data.iterationList = {
            iterationOwner: iterationData.iterationOwner,
            demandList: []
        };
        type = SAVE_ADD_ITERATION
    }else if(action == EDIT_ITERATION){
        type = SAVE_EDIT_ITERATION
    }

    store.dispatch({
        type: type,
        payload: data
    })
}