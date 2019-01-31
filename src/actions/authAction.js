import {SENT_AUTH} from "./types";
//这里是表单验证发送action
export const authSend=(value)=>({
    type:SENT_AUTH,
    value
});