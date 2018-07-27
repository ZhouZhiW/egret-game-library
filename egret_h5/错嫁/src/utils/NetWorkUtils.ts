/**
 *
 * @author 
 *
 */
class NetWorkUtils {
    public static netLoading: NetLoadingUI;
    public constructor() {
    }
    public static sendPostRequest(sendobj: Object, onPostComplete: Function, onPostIOError: Function, thisObj: any) {
        var sendjson: string = JSON.stringify(sendobj);
        var url: string;
        if (GameUtils.RELEASE_STAGE == 0) {
            url = GameUtils.SEND_URL_RELEASE;
        } else if (GameUtils.RELEASE_STAGE == 1) {
            url = GameUtils.SEND_URL_TEST;
        } else {
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
    }
    public static sendGetRequest(url: string, onGETComplete: Function, onGETIOError: Function, thisObj: any) {
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.open(url, egret.HttpMethod.GET);
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.send();
        request.addEventListener(egret.Event.COMPLETE, onGETComplete, thisObj);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR, onGETIOError, thisObj);
    }
    public static getResponseObj(protoname: string, event: egret.Event): any {
        var request = <egret.HttpRequest>event.currentTarget;
        // console.log(request);
        // console.log(request.response);
        var responseObj: any = JSON.parse(request.response);
        // console.log(responseObj);
        NetWorkUtils.clearNetLoading();
        return responseObj;
    }
    //消息
    public static sendSimpleNetPostRequest(requestnum: number, onPostComplete: Function, onPostIOError: Function, netparent: any, thisObj: any) {
        NetWorkUtils.netLoading = new NetLoadingUI();
        netparent.addChild(NetWorkUtils.netLoading);
        var sendobj: Object = { cmd: requestnum, player_token: GameUtils.playerToken, return_json: 1 };
        NetWorkUtils.sendPostRequest(sendobj, onPostComplete, onPostIOError, thisObj);
    }
    public static sendNetPostRequest(sendobj: Object, onPostComplete: Function, onPostIOError: Function, netparent: any, thisObj: any) {
        NetWorkUtils.netLoading = new NetLoadingUI();
        netparent.addChild(NetWorkUtils.netLoading);
        NetWorkUtils.sendPostRequest(sendobj, onPostComplete, onPostIOError, thisObj);
    }
    public static clearNetLoading() {
        if (NetWorkUtils.netLoading.parent) {
            NetWorkUtils.netLoading.clearSceneNetLoading();
            NetWorkUtils.netLoading.parent.removeChild(NetWorkUtils.netLoading);
        }
        GameUtils.gameSandPause = false;
    }

}
