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

    if (rules.expr && value) {
        let regex = new RegExp(rules.expr);
        if (!regex.test(value)) {
            return {result: false, message: rules.literal + "格式校验错误"};
        }
    }
    return {result: true};

};


export const Regex = {
    projectCodeRegex: "^(([1-9]{1}\\d*)|(0{1}))(\\.\\d{1,2})$",
    strRegex: "^[0-9a-zA-Z]+$",
    typeRegex: "^([0-9]{1})$",
    noSpecialSymbol: "^[\u0391-\uFFE5A-Za-z0-9]+$"
};


export const Rules = {
    loginProps: {
        username: {
            required :true,
            maxLength: 20
        },
        password:{
            required :true,
            maxLength: 20
        }
    },
    demandProps: { // for add and edit
        demandName: {
            required: true,
            maxLength: 10,
            expr: Regex.noSpecialSymbol,
            literal : "需求名称"
        },
        demandType: {
            required: true,
            literal:"需求类型"
        },
        status: {required: true,literal:"需求状态"},
        demandSourceDept: {
            maxLength: 20,
            expr: Regex.noSpecialSymbol,
            literal:"需求来源部门"
        },
        // demandScale: {},
        bmRequired: {
            required: true,
            literal:"是否涉及bm控制台"
        },
        uatRequired: {
            required: true,
            literal:"是否需要uat"
        },
        demandOwnerId: {
            required: true,
            literal:"需求负责人"
        }
    },
    reviewDemandProps: {
        demandDevOwnerId: {
            required: true,
            literal:"需求开发负责人"
        },
        iterationId: {
            required: true,
            literal:"关联版本"
        },
        status: {
            required: true,
            literal:"需求状态"
        }
    },
    projectProps: {
        projectName: {
            required: true,
            maxLength: 10,
            expr: Regex.noSpecialSymbol,
            literal:"需求负责人"
        },
        projectType: {
            required: true,
            literal:"项目类型"
        },
        projectOwnerId: {
            required: true,
            literal:"项目负责人"
        },
        startTime: {
            required: true,
            literal:"开始时间"
        },
        endTime: {
            required: true,
            literal:"结束时间"
        },
        status: {
            required: true,
            literal:"状态"
        },
        projectMembers: {
            required: true,
            literal:"项目参与人员"
        }
    },
    iterationProps: {
        iterationCode: {
            required: true,
            maxLength: 10,
            expr: Regex.projectCodeRegex,
            literal:"版本编号"
        },
        iterationName: {
            required: true,
            maxLength: 10,
            expr: Regex.noSpecialSymbol,
            literal:"版本名称"
        },
        iterationOwnerId: {
            required: true,
            literal:"版本负责人"
        }

    }


};

