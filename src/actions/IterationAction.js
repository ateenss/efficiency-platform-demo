import axios from 'axios';
import store from '../stores/index';
import {
    SELECT_ITERATION,
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

            iterationOwner: "张无忌",
            demandList: [
                ["1", "YDZF-201809-12", "快速收款码需求这个需求很厉害", "张飞1", "开发中"],
                ["2", "TYDZF-201809-13", "ApplePayOnweb需求", "韦小宝1", "已完成"],
                ["3", "YDZF-201809-15", "你说这是什么需求", "张无忌1", "提测"],
                ["4", "YDZF-201809-16", "楼上，你在问我吗？", "周芷若1", "未开始"],
            ]

        }
    ;

    store.dispatch({
        type: SELECT_ITERATION,
        payload: data
    });
}

