

export const INITIAL_STATE = {
    addProjects:[]
};

//专门用来创建项目的reducer
export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case "edit_save":
            console.log("第一次提交");
            const newState=JSON.parse(JSON.stringify(state));
            newState.addProjects.push(action.value);
            return newState;
        case "edit_ReSave":
            console.log("再次编写修改");
            const newRState=JSON.parse(JSON.stringify(state));
            newRState.addProjects.forEach((item,index)=>{
                if (index===action.value.keyNote){
                    newRState.addProjects[index]=action.value.ReContent
                }
            });
            return newRState;
        default:
            return state;
    }
}