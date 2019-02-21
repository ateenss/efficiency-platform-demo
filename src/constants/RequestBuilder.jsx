const RequestBuilder = {
    version: "1.0",
    parseRequest: function (accessToken, data) {
        if (!!data) {
            return {"version": "1.0", "accessToken": accessToken, "data": data};
        } else {
            return {"version": "1.0", "accessToken": accessToken};
        }
    }
};

export default RequestBuilder;
