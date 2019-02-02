
import $ from 'jquery';
//这个是老reducer，dashboard用来获取数据的
const initialState = {
    // bugs :[
    //     'Sign contract for "What are conference organizers afraid of?"',
    //     "Lines From Great Russian Literature? Or E-mails From My Boss?",
    //     "Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit",
    //     "Create 4 Invisible User Experiences you Never Knew About"
    // ],
    bugs:[],
    website:[],
//     website :[
//     "Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit",
//     'Sign contract for "What are conference organizers afraid of?"'
// ],
    server :[],
//     server : [
//     "Lines From Great Russian Literature? Or E-mails From My Boss?",
//     "Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit",
//     'Sign contract for "What are conference organizers afraid of?"'
// ],
    rightTableData:[],
    // rightTableData:[["1", "Dakota Rice", "$36,738", "Niger"],
    //     ["2", "Minerva Hooper", "$23,789", "Curaçao"],
    //     ["3", "Sage Rodriguez", "$56,142", "Netherlands"],
    //     ["4", "Philip Chaney", "$38,735", "Korea, South"]],
    bugsTaskIndexes:[0, 1, 2, 3],
    websiteTaskIndexes:[0, 1],
    serverTaskIndexes:[0, 1, 2]
};
//下面是异步reducer，需要自己写个小的测试reducer
// export default createReducer(initState.userData,ACTION_HANDLERS)
//下面是一个测试用reducer生成器
export default function reducer(state=initialState,action) {
    switch (action.type) {
        case 'edit_change':
            // console.log("这是点击完成之前的"+state.bugs);
            let temp=state.bugs;
            const jianshao=temp.splice(action.value,1);
            // console.log("减少的物体"+jianshao+"编号是："+action.value);
            state.rightTableData.push(["5","new","$250",jianshao]);
            let rightTemp=state.rightTableData;
            // console.log("这是增加信息后的右边框:"+rightTemp);
            state.bugsTaskIndexes.splice(action.value,1);
            const resultIndex=state.bugsTaskIndexes;
            console.log("数字变化问题："+resultIndex);
            state.bugs=temp;
            state.rightTableData=rightTemp;
            state.bugsTaskIndexes=resultIndex;
            return state;

        case 'get_initial':
            const newState=JSON.parse(JSON.stringify(state));
            $.ajax({
                async:true,
                type:"post",
                url:"http://localhost:8090/userTable//authContent",
                'Access-Control-Allow-Origin': '*',
                data:{},
                crossDomain: true,
                // data:newState.singleUserInfo,
                dataType:'json',
                contentType: "application/json;charset=utf-8",
                success:function (result) {
                    newState.bugs=result.bugs;
                    newState.website=result.website;
                    newState.server=result.server;
                    newState.rightTableData=result.rightTableData;
                    // console.log(newState.bugs);
                },
                error:function (qXHR, textStatus, errorThrown) {
                    console.log(qXHR.status + ' ' + qXHR.responseText+' '+textStatus+' '+errorThrown+"没能在后台拿到收据");
                    }
                }
            );
            return newState;

        case 'CLOSE_DIALOG':
            return {
                card: state.card,  // 不需要修改，使用旧state的值
                dialog: {
                    status: false
                }
            };
        default:
            return state
    }
}


