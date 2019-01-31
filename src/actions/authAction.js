import {SENT_AUTH,AUTH_ERROR,AUTH_VALIDATE,AUTH_USER} from "./types";
//这里是表单验证发送action
export const authSend=(value)=>({
    type:SENT_AUTH,
    value
});

export const authWrong=value=>({
    type:AUTH_ERROR,
    value
});

export const authValidating=()=>({
    type:AUTH_VALIDATE,
});

export const authSuccess=()=>({
    type:AUTH_USER,
});