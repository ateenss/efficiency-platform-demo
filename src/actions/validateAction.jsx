export function validating(content, props) {
    for (let el in Rules[props]) {

        let value = content[el];

        let ret = validate(Rules[props][el], value);

        if (!ret.result) {
            return ret;
        }
    }

    return {result: true};

}


export function validate(rules, value) {

    if (!rules) {
        return {result: true}
    }

    if (rules.required) {
        console.log("***" + value)
        if (value === undefined || value === "") {
            return {result: false, message: rules.literal + "必填"};
        }
    }

    if (rules.maxLength && value) {
        let maxLength = parseInt(rules.maxLength);

        if (value.length > maxLength) {
            return {result: false, message: rules.literal + "长度超限，最大[" + rules.maxLength + "]"};

        }
    }

    if (rules.expr && value && rules.literal === "预计工时") {
        let regex = new RegExp(rules.expr);
        if (!regex.test(value)) {
            return {result: false, message: rules.literal + "填写纯数字或者带小数点数字"};
        }
    } else if (rules.expr && value) {
        let regex = new RegExp(rules.expr);
        if (!regex.test(value)) {
            return {result: false, message: rules.literal + "格式校验错误"};
        }
    }

    return {result: true};

};


export const Regex = {
    projectCodeRegex: "^(([1-9]{1}\\d*)|(0{1}))(\\-\\d{1,2})$",
    strRegex: "^[0-9a-zA-Z]+$",
    typeRegex: "^([0-9]{1})$",
    noSpecialSymbol: "^[\u0391-\uFFE5A-Za-z0-9]+$",
    testEstimateHours: "^[+-]?(0|([1-9]\\d*))(\\.\\d+)?$"
};


export const Rules = {
    loginProps: {
        username: {
            required: true,
            maxLength: 20,
            literal: "用户名"
        },
        password: {
            required: true,
            maxLength: 20,
            literal: "密码"
        }
    },
    demandProps: { // for add and edit
        demandName: {
            required: true,
            maxLength: 50,
            expr: Regex.noSpecialSymbol,
            literal: "需求名称"
        },
        demandType: {
            required: true,
            literal: "需求类型"
        },
        status: {required: true, literal: "需求状态"},
        demandSourceDept: {
            maxLength: 20,
            expr: Regex.noSpecialSymbol,
            literal: "需求来源部门"
        },
        demandCode:{
            maxLength:20
        },
        demandLinkCode: {
            maxLength : 10,
        },
        bmRequired: {
            required: true,
            literal: "是否涉及bm控制台"
        },
        uatRequired: {
            required: true,
            literal: "是否需要uat"
        },
        demandOwnerId: {
            required: true,
            literal: "需求负责人"
        }
    },
    reviewDemandProps: {
        demandDevOwnerId: {
            required: true,
            literal: "需求开发负责人"
        },
        iterationId: {
            required: true,
            literal: "关联版本"
        },
        status: {
            required: true,
            literal: "需求状态"
        }
    },
    taskProps: {
        /*taskName: {
            required: true,
            maxLength: 10,
            expr: Regex.noSpecialSymbol,
            literal: "任务名称"
        },*/
        estimateWorkTime: {
            required: true,
            maxLength: 4,
            expr: Regex.testEstimateHours,
            literal: "预计工时"
        },

    },
    projectProps: {
        projectName: {
            required: true,
            maxLength: 10,
            expr: Regex.noSpecialSymbol,
            literal: "需求负责人"
        },
        projectType: {
            required: true,
            literal: "项目类型"
        },
        projectOwnerId: {
            required: true,
            literal: "项目负责人"
        },
        startTime: {
            required: true,
            literal: "开始时间"
        },
        endTime: {
            required: true,
            literal: "结束时间"
        },
        status: {
            required: true,
            literal: "状态"
        },
        projectMembers: {
            required: true,
            literal: "项目参与人员"
        }
    },
    iterationProps: {
        iterationCode: {
            required: true,
            maxLength: 10,
            expr: Regex.projectCodeRegex,
            literal: "版本编号"
        },
        iterationName: {
            required: true,
            maxLength: 10,
            expr: Regex.noSpecialSymbol,
            literal: "版本名称"
        },
        iterationOwnerId: {
            required: true,
            literal: "版本负责人"
        }
    },
    testCaseProps: {
        checker: {
            required: true,
            literal: "检查方"
        },
        checkTime: {
            required: true,
            literal: "检查时间"
        },
        checkItem: {
            required: true,
            literal: "检查项"
        },
        supportGray: {
            required: true,
            literal: "是否具备灰度"
        },
        expectedResult: {
            required: true,
            literal: "预期结果"
        },
        steps: {
            required: true,
            literal: "是否具备灰度"
        }
    },
    changePwdProps:{
        oldPwd:{
            required:true,
            literal:"旧密码"
        },
        newPwd:{
            required:true,
            literal:"新密码"
        },
        confirmPwd:{
            required:true,
            literal:"确认密码"
        },
    }


};

