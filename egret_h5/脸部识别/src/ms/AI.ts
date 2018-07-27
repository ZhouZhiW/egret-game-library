class MSAi extends egret.EventDispatcher{

    //08a907e3f7e94e4696d00f4697426e67
    private faceReq: egret.HttpRequest;
    public face(key: string, data: any) {
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
        this.faceReq.send(data)
    }
    private onFaceComplete(e: egret.Event) {
        var request = <egret.HttpRequest>e.currentTarget;
        //egret.log("get data : ", request.response);
        let obj = JSON.parse(request.response)
        let evt:egret.Event = new egret.Event( egret.Event.COMPLETE );
        evt.data = obj;
        this.dispatchEvent(evt)
    }

    //44297f66642f440881cc1e3758d7111d
    private emotionReq: egret.HttpRequest;
    public emotion(key: string, data: any) {
        if (this.emotionReq == null) {
            this.emotionReq = new egret.HttpRequest();
            this.emotionReq.addEventListener(egret.Event.COMPLETE, this.onEmotionComplete, this);
            this.emotionReq.addEventListener(egret.IOErrorEvent.IO_ERROR, this.netError, this);
        }
        this.emotionReq.responseType = egret.HttpResponseType.TEXT;
        this.emotionReq.open("https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize", egret.HttpMethod.POST);

        this.emotionReq.setRequestHeader("Content-Type", "application/octet-stream");
        this.emotionReq.setRequestHeader("Ocp-Apim-Subscription-Key",key);

        this.emotionReq.send(data)
    }

    private onEmotionComplete(e: egret.Event) {
        var request = <egret.HttpRequest>e.currentTarget;
        egret.log("get data : ", request.response);
    }

    //net error handler
    private netError(e: egret.IOErrorEvent) {
        console.log("网络错误信息：",e)
        this.dispatchEventWith("error")
    }
}