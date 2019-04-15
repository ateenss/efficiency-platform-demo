import store from "../stores";
import {SHOW_NOTIFICATION} from "./types";

export function success(message){

    if(!message){
        message = "成功";
    }

    showNotification("success", message);

}


export function error(message){

    if(!message){
        message = "出错了，你到底干了什么？";
    }

    showNotification("error", message);

}

export function showNotification(type, message) {
    store.dispatch({
        type: SHOW_NOTIFICATION,
        payload: {type: type, message: message}
    });
}