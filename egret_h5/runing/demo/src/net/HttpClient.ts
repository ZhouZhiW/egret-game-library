/**
 * Http 请求
 */
class HttpClient {

    private callbackList = {};
    /**
     * 发送数据
     */
    public send(url: string, data: Object, callback: Function) {
        var loader: egret.URLLoader = new egret.URLLoader();
        this.callbackList[loader.hashCode] = callback;
        loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        loader.addEventListener(egret.Event.COMPLETE, this.onPostComplete, this);
        //添加加载失败侦听
        loader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadError, this);
        
        var request: egret.URLRequest = new egret.URLRequest(url);
        request.method = data ? egret.URLRequestMethod.POST : egret.URLRequestMethod.GET;
    
        /*************************************** */
        var argsArr = [];
        for (var key in data) {
            argsArr.push(key + "=" + data[key]);
        }

        request.data = new egret.URLVariables(argsArr.join("&"));
        loader.load(request);
    }

    private onLoadError(event: egret.Event) {
        var loader = <egret.URLLoader>event.currentTarget;
        var callback: Function = this.callbackList[loader.hashCode];
        if (callback) {
            callback({ err: 1 });
            delete this.callbackList[loader.hashCode];
        }
        loader.removeEventListener(egret.Event.COMPLETE, this.onPostComplete, this);
        loader.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onPostIOError, this);

        console.log("网络错误", loader._request);
        loader = null;
    }

    private onPostComplete(event: egret.Event): void {
        var loader = <egret.URLLoader>event.currentTarget;
        loader.removeEventListener(egret.Event.COMPLETE, this.onPostComplete, this);
        loader.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onPostIOError, this);
        var str = loader.data.replace(/\s/g, "");
        var data = JSON.parse(str);
        // log(this, loader._request.url, data)
        var callback: Function = this.callbackList[loader.hashCode];
        if (callback) {
            callback({ data: data});
            delete this.callbackList[loader.hashCode];
        }
    }

    private onPostIOError(event: egret.IOErrorEvent): void {
        egret.error("post error : " + event);
    }
}