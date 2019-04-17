

const permProcessor = {
    init : function(currentResource){

        let permInfo = JSON.parse(localStorage.getItem("permInfo"));
        let ret = {};
        let projectItem = permInfo[currentResource].perms;

        for (let j in projectItem) {
            let temp = projectItem[j];
            ret[temp.operation] = true
        }

        return ret;
    },
    bingo : function(cmd, permList){

        return !!permList[cmd];

    }
};


export default permProcessor;
