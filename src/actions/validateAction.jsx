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
            return {result: false, message: "必填"};
        }
    }

    if (rules.maxLength && value) {
        let maxLength = parseInt(rules.maxLength);
        if (value.length > maxLength) {
            return {result: false, message: "长度超限，最大[" + rules.maxLength + "]"};

        }
    }

    if (rules.expr && value) {
        let regex = new RegExp(rules.expr);
        if (!regex.test(value)) {
            return {result: false, message: "格式校验错误"};
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
            expr: Regex.noSpecialSymbol
        },
        demandType: {
            required: true,
        },
        status: {required: true,},
        demandSourceDept: {
            maxLength: 20,
            expr: Regex.noSpecialSymbol
        },
        // demandScale: {},
        bmRequired: {
            required: true
        },
        uatRequired: {
            required: true
        },
        demandOwnerId: {
            required: true
        }
    },
    reviewDemandProps: {
        demandDevOwnerId: {
            required: true
        },
        iterationId: {
            required: true
        },
        status: {
            required: true
        }
    },
    projectProps: {
        projectName: {
            required: true,
            maxLength: 10,
            expr: Regex.noSpecialSymbol
        },
        projectType: {
            required: true
        },
        projectOwnerId: {
            required: true
        },
        startTime: {
            required: true
        },
        endTime: {
            required: true
        },
        status: {
            required: true
        },
        projectMembers: {
            required: true
        }
    },
    iterationProps: {
        iterationCode: {
            required: true,
            maxLength: 10,
            expr: Regex.projectCodeRegex
        },
        iterationName: {
            required: true,
            maxLength: 10,
            expr: Regex.noSpecialSymbol
        },
        iterationOwnerId: {
            required: true
        }

    }


};

