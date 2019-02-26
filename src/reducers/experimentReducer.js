

export const INITIAL_STATE = {
    name:"我是初始名字"
};

//专门用来登录验证的reducer
export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case "save_change":
            return {name:action.value};
        default:
            return state;
    }
}