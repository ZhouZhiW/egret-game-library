var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MSAi = (function (_super) {
    __extends(MSAi, _super);
    function MSAi() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MSAi.prototype.face = function (key, data) {
        if (this.faceReq == null) {
            this.faceReq = new egret.HttpRequest();
            this.faceReq.addEventListener(egret.Event.COMPLETE, this.onFaceComplete, this);
            this.faceReq.addEventListener(egret.IOErrorEvent.IO_ERROR, this.netError, this);
        }
        this.faceReq.responseType = egret.HttpResponseType.TEXT;
        //this.faceReq.open("https://westus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false&returnFaceAttributes=age,gender,smile", egret.HttpMethod.POST);
        this.faceReq.open("https://api.cognitive.azure.cn/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false&returnFaceAttributes=age,gender,smile", egret.HttpMethod.POST);
        this.faceReq.setRequestHeader("Content-Type", "application/octet-stream");
        this.faceReq.setRequestHeader("Ocp-Apim-Subscription-Key", key);
        this.faceReq.send(data);
    };
    MSAi.prototype.onFaceComplete = function (e) {
        var request = e.currentTarget;
        //egret.log("get data : ", request.response);
        var obj = JSON.parse(request.response);
        var evt = new egret.Event(egret.Event.COMPLETE);
        evt.data = obj;
        this.dispatchEvent(evt);
    };
    MSAi.prototype.emotion = function (key, data) {
        if (this.emotionReq == null) {
            this.emotionReq = new egret.HttpRequest();
            this.emotionReq.addEventListener(egret.Event.COMPLETE, this.onEmotionComplete, this);
            this.emotionReq.addEventListener(egret.IOErrorEvent.IO_ERROR, this.netError, this);
        }
        this.emotionReq.responseType = egret.HttpResponseType.TEXT;
        this.emotionReq.open("https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize", egret.HttpMethod.POST);
        this.emotionReq.setRequestHeader("Content-Type", "application/octet-stream");
        this.emotionReq.setRequestHeader("Ocp-Apim-Subscription-Key", key);
        this.emotionReq.send(data);
    };
    MSAi.prototype.onEmotionComplete = function (e) {
        var request = e.currentTarget;
        egret.log("get data : ", request.response);
    };
    //net error handler
    MSAi.prototype.netError = function (e) {
        console.log("网络错误信息：", e);
        this.dispatchEventWith("error");
    };
    return MSAi;
}(egret.EventDispatcher));
__reflect(MSAi.prototype, "MSAi");
