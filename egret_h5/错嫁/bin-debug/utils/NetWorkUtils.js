var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author
 *
 */
var NetWorkUtils = (function () {
    function NetWorkUtils() {
    }
    NetWorkUtils.sendPostRequest = function (sendobj, onPostComplete, onPostIOError, thisObj) {
        var sendjson = JSON.stringify(sendobj);
        var url;
        if (GameUtils.RELEASE_STAGE == 0) {
            url = GameUtils.SEND_URL_RELEASE;
        }
        else if (GameUtils.RELEASE_STAGE == 1) {
            url = GameUtils.SEND_URL_TEST;
        }
        else {
            url = GameUtils.SEND_URL_NETTEST;
        }
        GameUtils.gameSandPause = true;
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.open(url, egret.HttpMethod.POST);
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.send(sendjson);
        request.addEventListener(egret.Event.COMPLETE, onPostComplete, thisObj);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR, onPostIOError, thisObj);
    };
    NetWorkUtils.sendGetRequest = function (url, onGETComplete, onGETIOError, thisObj) {
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.open(url, egret.HttpMethod.GET);
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.send();
        request.addEventListener(egret.Event.COMPLETE, onGETComplete, thisObj);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR, onGETIOError, thisObj);
    };
    NetWorkUtils.getResponseObj = function (protoname, event) {
        var request = event.currentTarget;
        // console.log(request);
        // console.log(request.response);
        var responseObj = JSON.parse(request.response);
        // console.log(responseObj);
        NetWorkUtils.clearNetLoading();
        return responseObj;
    };
    //消息
    NetWorkUtils.sendSimpleNetPostRequest = function (requestnum, onPostComplete, onPostIOError, netparent, thisObj) {
        NetWorkUtils.netLoading = new NetLoadingUI();
        netparent.addChild(NetWorkUtils.netLoading);
        var sendobj = { cmd: requestnum, player_token: GameUtils.playerToken, return_json: 1 };
        NetWorkUtils.sendPostRequest(sendobj, onPostComplete, onPostIOError, thisObj);
    };
    NetWorkUtils.sendNetPostRequest = function (sendobj, onPostComplete, onPostIOError, netparent, thisObj) {
        NetWorkUtils.netLoading = new NetLoadingUI();
        netparent.addChild(NetWorkUtils.netLoading);
        NetWorkUtils.sendPostRequest(sendobj, onPostComplete, onPostIOError, thisObj);
    };
    NetWorkUtils.clearNetLoading = function () {
        if (NetWorkUtils.netLoading.parent) {
            NetWorkUtils.netLoading.clearSceneNetLoading();
            NetWorkUtils.netLoading.parent.removeChild(NetWorkUtils.netLoading);
        }
        GameUtils.gameSandPause = false;
    };
    return NetWorkUtils;
}());
__reflect(NetWorkUtils.prototype, "NetWorkUtils");
//# sourceMappingURL=NetWorkUtils.js.map