class HttpRequest {
    private static ServerUrl = "http://u14935050j.iok.la:7777/StarWarServer/";
    private static DevelopUrl = "http://u14935050j.iok.la:7766/StarWarServer/";
    private static Jxy = "http://u14935050j.iok.la:82/StarWarServer/";
    private static Ip = "http://192.168.1.105:82/StarWarServer/"
    private static TencentCloud = "http://s.240game.cn:82/StarWarServer/";

    public static isPhone = true;
    public static TestName = "wutao129";
    public static CurrentUrl = HttpRequest.TencentCloud;

    private urlLoader: egret.URLLoader;
    private messageCode: string;

    public constructor() {
        this.urlLoader = new egret.URLLoader;
        this.urlLoader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        this.urlLoader.addEventListener(egret.Event.COMPLETE, this.onLoaderComplete, this);
        this.urlLoader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoaderError, this);
    }

    public login(loginParam: string) {
        this.messageCode = "1";
        let request = new egret.URLRequest(HttpRequest.CurrentUrl);
        request.method = egret.URLRequestMethod.POST;
        let requestData = [];
        requestData.push("messageCode=1");
        requestData.push(encodeURI(loginParam));
        request.data = new egret.URLVariables(requestData.join("&"));
        this.urlLoader.load(request);
    }

    public send(messageCode: string, body: any = null) {
        this.messageCode = messageCode;
        let request = new egret.URLRequest(HttpRequest.CurrentUrl);
        request.method = egret.URLRequestMethod.POST;
        let requestData = [];
        requestData.push("messageCode=" + messageCode);
        requestData.push("userId=" + DataManager.inst.userInfo.userId);
        if (body != null) {
            for (const k in body) {
                requestData.push(k + "=" + body[k]);
            }
        }
        request.data = new egret.URLVariables(requestData.join("&"));
        this.urlLoader.load(request);
    }

    private onLoaderComplete(event: egret.Event) {
        this.response(this.urlLoader.data)
    }

    private onLoaderError(event: egret.Event) {
        this.showErrorDialog(-1, "服务器连接中断。", this.messageCode);
    }

    public response(d: any) {
        // try {

        //     console.log(decodeURI(d));
        // } catch (error) {
        //     this.showErrorDialog(-2, "response is Null!");
        //     return;
        // }
        let msg = null;
        try {
            msg = JSON.parse(d);
        } catch (error) {
            this.showErrorDialog(-4, "服务器繁忙,请稍后再试。", this.messageCode);
            console.error(d);
            return;
        }

        switch (msg.msgCode) {
            case 10000://无数据返回体
                return;
            case 20000://支付订单
                hlmyPay(msg.payCode);
                return;
        }

        const msgType: number = msg.msgType;
        const reqCode: number = msg.reqCode;
        const msgBody: Array<any> = msg.msgBody;

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
    }

    private showErrorDialog(errorCode: number, errorMsgString, requestCode) {
        const dialog = new NTextDialog();
        dialog.setTitle("提示")
        dialog.setContent(errorMsgString + "\n\n        " + requestCode + " - " + errorCode);
        // dialog.show(TipLayer.inst);
        dialog.show();
    }
}