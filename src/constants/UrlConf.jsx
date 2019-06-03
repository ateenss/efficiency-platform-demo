const UrlConf = {
    base: "http://localhost:8080/tiger-admin/",
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
        saveTask: function () {
            return UrlConf.getUrl('task', 'saveTask')
        },
        getDemand: function () {
            return UrlConf.getUrl('task', 'getDemand')
        }
    },
    project: {
        openProject: function () {
            return UrlConf.getUrl('project', "openProject")
        }
    }
};

export const UrlParser = {

    parse: function (url) {

        let ret = {};

        let str = url.split("?")[1],
            items = str.split("&");
        let arr, name, value;
        for (let i = 0, l = items.length; i < l; i++) {
            arr = items[i].split("=");
            name = arr[0];
            value = arr[1];
            ret[name] = value;
        }
        return ret;
    }


}

export default UrlConf;
