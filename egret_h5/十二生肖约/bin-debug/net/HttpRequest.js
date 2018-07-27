var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var HttpRequest = (function () {
    function HttpRequest() {
        this.urlLoader = new egret.URLLoader;
        this.urlLoader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        this.urlLoader.addEventListener(egret.Event.COMPLETE, this.onLoaderComplete, this);
        this.urlLoader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoaderError, this);
    }
    HttpRequest.prototype.login = function (loginParam) {
        this.messageCode = "1";
        var request = new egret.URLRequest(HttpRequest.CurrentUrl);
        request.method = egret.URLRequestMethod.POST;
        var requestData = [];
        requestData.push("messageCode=1");
        requestData.push(encodeURI(loginParam));
        request.data = new egret.URLVariables(requestData.join("&"));
        this.urlLoader.load(request);
    };
    HttpRequest.prototype.send = function (messageCode, body) {
        if (body === void 0) { body = null; }
        this.messageCode = messageCode;
        var request = new egret.URLRequest(HttpRequest.CurrentUrl);
        request.method = egret.URLRequestMethod.POST;
        var requestData = [];
        requestData.push("messageCode=" + messageCode);
        requestData.push("userId=" + DataManager.inst.userInfo.userId);
        if (body != null) {
            for (var k in body) {
                requestData.push(k + "=" + body[k]);
            }
        }
        request.data = new egret.URLVariables(requestData.join("&"));
        this.urlLoader.load(request);
    };
    HttpRequest.prototype.onLoaderComplete = function (event) {
        this.response(this.urlLoader.data);
    };
    HttpRequest.prototype.onLoaderError = function (event) {
        this.showErrorDialog(-1, "服务器连接中断。", this.messageCode);
    };
    HttpRequest.prototype.response = function (d) {
        // try {
        //     console.log(decodeURI(d));
        // } catch (error) {
        //     this.showErrorDialog(-2, "response is Null!");
        //     return;
        // }
        var msg = null;
        try {
            msg = JSON.parse(d);
        }
        catch (error) {
            this.showErrorDialog(-4, "服务器繁忙,请稍后再试。", this.messageCode);
            console.error(d);
            return;
        }
        switch (msg.msgCode) {
            case 10000:
                return;
            case 20000:
                hlmyPay(msg.payCode);
                return;
        }
        var msgType = msg.msgType;
        var reqCode = msg.reqCode;
        var msgBody = msg.msgBody;
        if (msgType == 1) {
            this.showErrorDialog(msgBody[0].errorCode, msgBody[0].showMsg, reqCode);
            // this.showErrorDialog(msgCode, msgError, this.messageCode);
            return;
        }
        if (msgType == 2) {
            this.showErrorDialog(msgBody[0].ignoreCode, msgBody[0].showMsg, reqCode);
        }
        if (msgBody == null || msgBody.length == 0) {
            this.showErrorDialog(-3, "服务器繁忙,请稍后再试。", this.messageCode);
            return;
        }
        DataManager.inst.pushDatas(this.messageCode, msgBody);
    };
    HttpRequest.prototype.showErrorDialog = function (errorCode, errorMsgString, requestCode) {
        var dialog = new NTextDialog();
        dialog.setTitle("提示");
        dialog.setContent(errorMsgString + "\n\n        " + requestCode + " - " + errorCode);
        // dialog.show(TipLayer.inst);
        dialog.show();
    };
    return HttpRequest;
}());
HttpRequest.ServerUrl = "http://u14935050j.iok.la:7777/StarWarServer/";
HttpRequest.DevelopUrl = "http://u14935050j.iok.la:7766/StarWarServer/";
HttpRequest.Jxy = "http://u14935050j.iok.la:82/StarWarServer/";
HttpRequest.Ip = "http://192.168.1.105:82/StarWarServer/";
HttpRequest.TencentCloud = "http://s.240game.cn:82/StarWarServer/";
HttpRequest.isPhone = true;
HttpRequest.TestName = "wutao129";
HttpRequest.CurrentUrl = HttpRequest.TencentCloud;
__reflect(HttpRequest.prototype, "HttpRequest");
//# sourceMappingURL=HttpRequest.js.map