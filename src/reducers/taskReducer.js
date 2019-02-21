import {
    GET_DEMAND_TASKS, CHANGE_TASK_STATUS, GET_TASK, SAVE_TASK
} from '../actions/types';

export const INITIAL_STATE = {
    error: '',
};

const taskStatus = {

    status: [
        {
            name: "方案",
            value: "plan"
        },
        {
            name: "开发",
            value: "develop"
        }
    ],
    next: function (curStatus) {
        let idx = 0;
        for (let idx = 0; idx < this.status.length; idx++) {
            if (curStatus === this.status[idx].value) {
                break;

            }
        }
        if (idx === this.status.length) {
            return this.status[idx].value;
        }
        return this.status[idx + 1].value;
    }

};


//专门用来登录验证的reducer
export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_DEMAND_TASKS:
            // console.log("get"+JSON.stringify(action.payload));
            return {...state, demands: action.payload};
        case CHANGE_TASK_STATUS:

            let changeRet = function () {
                let newDemands = JSON.parse(JSON.stringify(state.demands));
                let ret = action.payload.split("-");
                let curGroup = ret[0];
                let taskId = ret[2];
                // console.log(taskId);
                for (let idx in newDemands) {
                    let tasksGroup = newDemands[idx].tasks;
                    if (!tasksGroup) {
                        continue;
                    }
                    let nextGroup = taskStatus.next(curGroup);

                    var thisTask = 0;

                    let curGroupTask = tasksGroup[curGroup];
                    for (let i in curGroupTask) {
                        if (taskId === curGroupTask[i].taskId) {
                            thisTask = i;
                        }
                    }
                    // console.log("lallala"+ nextGroup +"|" +JSON.stringify(tasksGroup[nextGroup]));
                    tasksGroup[nextGroup].push(curGroupTask[thisTask]);
                    delete curGroupTask[thisTask];
                    return newDemands;
                }
            }()
            return {...state, demands: changeRet};
        case GET_TASK:
            return {...state, task: action.payload, openTask: true, action: "getTask"};
        case SAVE_TASK:

            let saveRet = function () {
                let newDemands = JSON.parse(JSON.stringify(state.demands));
                let curGroup = "plan";
                let taskId = action.payload.taskId;
                // console.log(taskId);
                for (let idx in newDemands) {
                    let tasksGroup = newDemands[idx].tasks;
                    if (!tasksGroup) {
                        continue;
                    }
                    let nextGroup = taskStatus.next(curGroup);

                    var thisTask = 0;

                    let curGroupTask = tasksGroup[curGroup];
                    for (let i in curGroupTask) {
                        if (taskId === curGroupTask[i].taskId) {
                            thisTask = i;
                        }
                    }

                    curGroupTask[thisTask] = action.payload;
                    return newDemands;
                }
            }()


            return {...state, openTask: false, action: "saveTask", demands: saveRet}
        default:
            return state;
    }
}
