import store from '../stores/index';
import {
    OPEN_BUILD_MISSION,
    CLOSE_BUILD_MISSION,
    BUILD_SAVE_MISSION,
    OPEN_EDIT_MISSION,
    CLOSE_EDIT_MISSION,
    EDIT_SAVE_MISSION,
    PULL_INITIAL_MISSION,
    OPEN_DETAIL_MISSION,
    CLOSE_DETAIL_MISSION,
    SAVE_DETAIL_MISSION,
    OPEN_BUILD_PLAN,
    CLOSE_BUILD_PLAN,
    SAVE_BUILD_PLAN
} from './types';

export const openBuildPlan=()=>({
   type: OPEN_BUILD_PLAN
});

export const closeBuildPlan=()=>({
    type: CLOSE_BUILD_PLAN
});

export const saveBuildPlan=()=>({
    type: SAVE_BUILD_PLAN
});


export const openDetailMission=value=>({
    type: OPEN_DETAIL_MISSION,
    value
});

export const closeDetailMission=()=>({
    type: CLOSE_DETAIL_MISSION
});

export const saveDetailMission=(value)=>({
    type: SAVE_DETAIL_MISSION,
    value
});


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
        tasks:[{
            taskId: '1',
            MissionDeadLine: '2018-23-34',
            MissionName: "30天从入门到放弃",
            taskStatus: "进行中",
            MissionType: "需求任务"
        }, {
            taskId: '2',
            MissionDeadLine: '2018-13-31',
            MissionName: "30天学不会react",
            taskStatus: "进行中",
            MissionType: "开发任务"
        }, {
            taskId: '3',
            MissionDeadLine: '2018-23-32',
            MissionName: "到底能不能学会",
            taskStatus: "进行中",
            MissionType: "开发任务"
        }, {
            taskId: '4',
            MissionDeadLine: '2018-33-33',
            MissionName: "不能啊",
            taskStatus: "进行中",
            MissionType: "开发任务"
        }, {
            taskId: '5',
            MissionDeadLine: '2018-43-34',
            MissionName: "不能啊",
            taskStatus: "进行中",
            MissionType: "开发任务"
        }, {
            taskId: '6',
            MissionDeadLine: '2018-53-35',
            MissionName: "到底能不能学会",
            taskStatus: "进行中",
            MissionType: "开发任务"
        }, {
            taskId: '7',
            MissionDeadLine: '2018-63-36',
            MissionName: "不能啊",
            taskStatus: "进行中",
            MissionType: "开发任务"
        }, {
            taskId: '8',
            MissionDeadLine: '2018-73-37',
            MissionName: "不能啊",
            taskStatus: "进行中",
            MissionType: "开发任务"
        }
        ]
    };
    store.dispatch({
        type:PULL_INITIAL_MISSION,
        payload:InitialData
    })
}

