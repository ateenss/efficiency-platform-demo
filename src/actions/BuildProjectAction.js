import axios from 'axios';
import history from '../history/history';
import store from '../stores/index';




//提交保存填写的项目内容
export function buildSave(value){
    const send_save_data = '需要填写后台地址';
    store.dispatch(buildSaveDispatch(value));
    const config = {
        method: 'post'
    };
    return axios.post(send_save_data, {"version": "1.0", "data": {actionName: "buildProject", data: value}},config)
        .then(response => {
            if (response.data.respCode === "00") {
                store.dispatch({
                    type: "save_success",
                });
            }else{
                store.dispatch({
                    type: "save_fail",
                });
            }
        }).catch(error => {
            console.log("发送数据到后台出现问题"+error);
            store.dispatch({
                type: "save_error",
            });
        });
}
//提交再次编辑修改的内容
export function editSave(value){
    const send_edit_data = '需要填写后台地址';
    store.dispatch(editSaveDispatch(value));
    const config = {
        method: 'post'
    };
    return axios.post(send_edit_data, {"version": "1.0", "data": {actionName: "editProject", data: value}},config)
        .then(response => {
            if (response.data.respCode === "00") {
                store.dispatch({
                    type: "save_success",
                });
            }else{
                store.dispatch({
                    type: "save_fail",
                });
            }
        }).catch(error => {
            console.log("发送数据到后台出现问题"+error);
            store.dispatch({
                type: "save_error",
            });
        });
}

export function pullBuildProjectInitial(){
    const send_edit_data = '需要填写后台地址';
    const config = {
        method: 'post'
    };
    //todo:正常向后台要数据的时候，才把这些数据写进去，目前这个初始化调用是放在Project里面
    /*axios.post(send_edit_data, {"version": "1.0", "data": "BuildProjectInitial"},config)
        .then(response => {
            if (response.data.respCode === "00") {
                store.dispatch({
                    type: "save_success",
                });
                store.dispatch({
                    type:"pull_initial_project",
                    payload:InitialData
                })
            }else{
                store.dispatch({
                    type: "save_fail",
                });
            }
        }).catch(error => {
        console.log("后台提取数据出现问题"+error);
        store.dispatch({
            type: "save_error",
        });
    });*/
    //以下是mock数据
    const rand=Math.floor(Math.random()*40)+1;
    const InitialData={
        ID:rand,
        type:["业务需求项目","系统架构优化"],
        members:["员工A","员工B","员工C","员工D","员工E","员工F","员工G","员工H"],
        head:["员工A","员工B","员工C","员工D","员工E","员工F","员工G","员工H"],
    };
    store.dispatch({
        type:"pull_initial_project",
        payload:InitialData
    })
}


//注意正常使用的时候，把方法切换成上面的真正发送请求的action
export  const editSaveDispatch=(value)=>({
    type:"edit_save",
    value
});
export  const buildSaveDispatch=(value)=>({
    type:"build_save",
    value
});