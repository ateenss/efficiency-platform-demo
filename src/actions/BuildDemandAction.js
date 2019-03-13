import store from '../stores/index';
import {
    OPEN_BUILD_DEMAND,
    CLOSE_BUILD_DEMAND,
    PULL_INITIAL_DEMAND,
    BUILD_SAVE
} from './types';

export const openBuildDemand=()=>({
    type:OPEN_BUILD_DEMAND
});
export const closeBuildDemand=()=>({
    type:CLOSE_BUILD_DEMAND
});

export  const buildSaveDispatch=(value)=>({
    type:BUILD_SAVE,
    value
});

export function pullBuildDemandInitial(){
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
        DemandID:rand,
        DemandType:["外部需求","内部需求"],
        DemandStatus:["未评审","评审通过","评审未通过","已提测","已发布","已上线"],
        DemandMember:["员工A","员工B","员工C","员工D","员工E","员工F","员工G","员工H"],
        DemandScale:["小型","中型","大型"],
        DemandPriority:["p1","p2","p3"],
        AssociatedVersion:["49.1","49.2","49.3","49.4"],
        DemandDevHead:["员工A","员工B","员工C","员工D","员工E","员工F","员工G","员工H"]
    };
    store.dispatch({
        type:PULL_INITIAL_DEMAND,
        payload:InitialData
    })
}