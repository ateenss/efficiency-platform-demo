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
    FILTER_DEMAND_DEVELOPER_SAVE
} from './types';

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
        DemandDevHead:["员工A","员工B","员工C","员工D","员工E","员工F","员工G","员工H"],
        dataMuiTable:[
            {listID:"1",BusinessNum:"YDZF-201809-12",DemandName:"快速收款码需求这个需求很厉害",DemandDevHead:"张飞",DemandStatus:"开发中"},
            {listID:"2",BusinessNum:"TYDZF-201809-13",DemandName:"ApplePayOnweb需求",DemandDevHead:"韦小宝",DemandStatus:"已完成"},
            {listID:"3",BusinessNum:"YDZF-201809-15",DemandName:"你说这是什么需求",DemandDevHead:"张无忌",DemandStatus:"提测"},
            {listID:"4",BusinessNum:"YDZF-201809-16",DemandName:"楼上，你在问我吗？",DemandDevHead:"周芷若",DemandStatus:"未开始"},
        ]
    };
    store.dispatch({
        type:PULL_INITIAL_DEMAND,
        payload:InitialData
    })
}