var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Http 请求
 */
var HttpClient = (function () {
    function HttpClient() {
        this.callbackList = {};
    }
    /**
     * 发送数据
     */
    HttpClient.prototype.send = function (url, data, callback) {
        var loader = new egret.URLLoader();
        this.callbackList[loader.hashCode] = callback;
        loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        loader.addEventListener(egret.Event.COMPLETE, this.onPostComplete, this);
        //添加加载失败侦听
        loader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadError, this);
        var request = new egret.URLRequest(url);
        request.method = data ? egret.URLRequestMethod.POST : egret.URLRequestMethod.GET;
        /*************************************** */
        var argsArr = [];
        for (var key in data) {
            argsArr.push(key + "=" + data[key]);
        }
        request.data = new egret.URLVariables(argsArr.join("&"));
        loader.load(request);
    };
    HttpClient.prototype.onLoadError = function (event) {
        var loader = event.currentTarget;
        var callback = this.callbackList[loader.hashCode];
        if (callback) {
            callback({ err: 1 });
            delete this.callbackList[loader.hashCode];
        }
        loader.removeEventListener(egret.Event.COMPLETE, this.onPostComplete, this);
        loader.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onPostIOError, this);
        console.log("网络错误", loader._request);
        loader = null;
    };
    HttpClient.prototype.onPostComplete = function (event) {
        var loader = event.currentTarget;
        loader.removeEventListener(egret.Event.COMPLETE, this.onPostComplete, this);
        loader.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onPostIOError, this);
        var str = loader.data.replace(/\s/g, "");
        var data = JSON.parse(str);
        // log(this, loader._request.url, data)
        var callback = this.callbackList[loader.hashCode];
        if (callback) {
            callback({ data: data });
            delete this.callbackList[loader.hashCode];
        }
    };
    HttpClient.prototype.onPostIOError = function (event) {
        egret.error("post error : " + event);
    };
    return HttpClient;
}());
__reflect(HttpClient.prototype, "HttpClient");
//# sourceMappingURL=HttpClient.js.map