import store from '../stores/index';
import {
    OPEN_BUILD_MISSION,
    CLOSE_BUILD_MISSION,
    BUILD_SAVE_MISSION,
    OPEN_EDIT_MISSION,
    CLOSE_EDIT_MISSION,
    EDIT_SAVE_MISSION,
    PULL_INITIAL_MISSION
} from './types';

export const openBuildMission=()=>({
    type:  OPEN_BUILD_MISSION
});

export const closeBuildMission=()=>({
    type:  CLOSE_BUILD_MISSION
});

export const openEditMission=()=>({
    type:  OPEN_EDIT_MISSION
});

export const closeEditMission=()=>({
    type:  CLOSE_EDIT_MISSION
});

export  const buildSaveMissionDispatch=(value)=>({
    type:BUILD_SAVE_MISSION,
    value
});

export  const editSaveMissionDispatch=(value)=>({
    type:EDIT_SAVE_MISSION,
    value
});

export function pullBuildMissionInitial(){
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
        BelongProject:["项目1","项目2","项目3","项目4"],
        MissionType:["需求评审任务","需求开发任务","上线任务","个人其他任务"],
        MissionLevel:["总任务","子任务"],
        MissionHead:["员工A","员工B","员工C","员工D","员工E","员工F","员工G","员工H"],
        MissionPriority:["高","普通","默认","低"],
        AssociatedVersion:["49.1","49.2","49.3","49.4"],
        InvolveModule:["模块1","模块2","模块3","模块4"],
        AssociatedDemand:["需求1","需求2","需求3","需求4"],
        AssociatedMission:["任务1","任务2","任务3","任务4"],
        ModulePushHead:["员工A","员工B","员工C","员工D","员工E","员工F","员工G","员工H"],

    };
    store.dispatch({
        type:PULL_INITIAL_MISSION,
        payload:InitialData
    })
}