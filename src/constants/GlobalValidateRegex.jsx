
const GlobalValidateRegex = {
    projectCodeRegex: "^(([1-9]{1}\\d*)|(0{1}))(\\.\\d{1,2})$",
    strRegex : "^[0-9a-zA-Z]+$",

    username : {
        ok : value => !value || !/^[a-zA-Z0-9]{4,10}$/.test(value) ? false : true,
        message : "6-10 letters of numbers"
    },
    password : {
        ok : value => value && !/^[a-zA-Z0-9]{4,10}$/.test(value) ? false : true,
        message : "wrong password"
    },

    taskName:{
        ok : value => !value || !/^[a-zA-Z0-9]{4,10}$/.test(value) ? false : true,
        message : "6-10 letters of numbers"
    },
    taskContent:{
        ok : value => !value || !/^[a-zA-Z0-9]{4,10}$/.test(value) ? false : true,
        message : "6-10 letters of numbers"
    },
    name:{
        ok : value => !value || !/^[a-zA-Z0-9]{4,10}$/.test(value) ? false : true,
        message : "6-10 letters of numbers"
    }
};


export default GlobalValidateRegex;
