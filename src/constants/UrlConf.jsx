const UrlConf = {
    base: "http://127.0.0.1:8080/tiger-admin/",
    getUrl: function (domain, cmd) {
        let url = this.base + domain + "/";
        if (!!cmd) {
            return url + cmd;
        } else {
            return url;
        }
    },
    task: {
        getDemandTasks: function () {
            return UrlConf.getUrl('task', "getDemandTasks")
        },
        changeTaskStatus: function () {
            return UrlConf.getUrl('task', 'changeTaskStatus')
        },
        getTask: function () {
            return UrlConf.getUrl('task', 'getTask')
        },
        saveTask:function(){
            return UrlConf.getUrl('task', 'saveTask')
        },
        getDemand:function(){
            return UrlConf.getUrl('task', 'getDemand')
        }
    },
    project : {
        openProject : function(){
            return UrlConf.getUrl('project', "openProject")
        }
    }
};

export default UrlConf;
