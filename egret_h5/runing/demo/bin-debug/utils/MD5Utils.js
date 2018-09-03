var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MD5Utils = (function () {
    function MD5Utils() {
    }
    // 4b33bec9f079144c0326d85dc8632311
    MD5Utils.hex_md5 = function (str) {
        return new md5().hex_md5(str + this.secret);
    };
    MD5Utils.getMd5Data = function (sendData) {
        // let timestamp = Math.floor(new Date().getTime() / 1000);
        // sendData["timestamp"] = timestamp;
        // let jsonData = JSON.stringify(sendData);
        // let sign = MD5Utils.hex_md5(jsonData);
        // sendData["sign"] = sign;
        this.sign(sendData);
        return sendData;
    };
    MD5Utils.sign = function (params) {
        params['timestamp'] = Math.floor(new Date().getTime() / 1000);
        var keys = Object.keys(params).sort();
        var sign_data = [];
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i].toLocaleLowerCase();
            if (key === 'sign') {
                continue;
            }
            sign_data.push(key + '=' + params[key]);
        }
        var sign = this.hex_md5(sign_data.join('&'));
        params.sign = sign;
    };
    MD5Utils.secret = "4b33bec9f079144c0326d85dc8632311";
    return MD5Utils;
}());
__reflect(MD5Utils.prototype, "MD5Utils");
//# sourceMappingURL=MD5Utils.js.map