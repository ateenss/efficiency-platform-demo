

export const INITIAL_STATE = {
    MuitableData:[[ "Business Analyst", "Wed Feb 20 2019 20:37:00 GMT+0800 (中国标准时间)", "二维码团队,安全攻防团队", "$100,000","<p>fadsf</p>"],
    ["1","2","3","4","5"]]
};

//专门用来创建项目的reducer
export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case "edit_save":
            // state.tableData.push(action.value);
            console.log("以下是我做的检验");
            // console.log(state.MuitableData);
            const tempData=state.MuitableData;
            tempData.push(action.value);
            console.log(tempData);
            return {MuitableData:tempData};
        default:
            return state;
    }
}