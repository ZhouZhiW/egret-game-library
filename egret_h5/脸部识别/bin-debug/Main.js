var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.FACE_KEY = "一个字符串，需要自己申请";
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.loading, _this);
        return _this;
    }
    Main.prototype.loading = function (e) {
        this.loadingView = new LoadingUI(this.stage.stageWidth, this.stage.stageHeight);
        this.stage.addChild(this.loadingView);
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    };
    Main.prototype.onConfigComplete = function (e) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.loadGroup("preload");
    };
    Main.prototype.onResourceProgress = function (event) {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    };
    Main.prototype.onResourceLoadComplete = function (event) {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            this.init();
        }
    };
    Main.prototype.init = function () {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
        this.ai = new MSAi();
        this.ai.addEventListener(egret.Event.COMPLETE, this.AI_complete, this);
        this.ai.addEventListener("error", this.AI_error, this);
        this.bg_scene = new BackgroundScene();
        this.addChild(this.bg_scene);
        this.bg_scene.addEventListener(egret.TouchEvent.TOUCH_TAP, this.click, this);
        this.s_scene = new StartScene();
        this.addChild(this.s_scene);
    };
    Main.prototype.click = function (e) {
        /*
        pickPhotoUrlWithCallback((url, imagetype) => {
            this.showLoading();
            let a = url
            //   if (imagetype=="jpeg")
            //  let base64 = url.substring(23, url.length - 1)
            // let data = egret.Base64Util.decode(base64)
            let data = this.base64ToArrayBuffer(a, imagetype)
            console.log(data.byteLength);
            this.nextStep(data, a, false);
        });
        */
        var _this = this;
        egret.experimental.pickPhoto().then(function (baseUrl) {
            _this.showLoading();
            //   let img = document.createElement("img");
            //   img.src = baseUrl;
            var data = _this.base64ToArrayBuffer(baseUrl, "jpeg");
            _this.nextStep(data, baseUrl, false);
        });
    };
    Main.prototype.base64ToArrayBuffer = function (base64, contentType) {
        contentType = contentType || base64.match(/^data\:([^\;]+)\;base64,/mi)[1] || ''; // e.g. 'data:image/jpeg;base64,...' => 'image/jpeg'
        base64 = base64.replace(/^data\:([^\;]+)\;base64,/gmi, '');
        var binary = atob(base64);
        var len = binary.length;
        var buffer = new ArrayBuffer(len);
        var view = new Uint8Array(buffer);
        for (var i = 0; i < len; i++) {
            view[i] = binary.charCodeAt(i);
        }
        return buffer;
    };
    Main.prototype.showLoading = function () {
        if (this.loading_scene == null) {
            this.loading_scene = new Loading();
        }
        this.addChild(this.loading_scene);
    };
    Main.prototype.nextStep = function (data, base64, xuanzhuan) {
        if (this.imgScene == null) {
            this.imgScene = new ImageScene();
        }
        if (this.s_scene.parent != null) {
            this.removeChild(this.s_scene);
        }
        this.addChildAt(this.imgScene, 1);
        this.imgScene.InitImage(base64, xuanzhuan);
        this.ai.face(this.FACE_KEY, data);
    };
    Main.prototype.AI_complete = function (e) {
        if (this.loading_scene.parent != null) {
            this.removeChild(this.loading_scene);
        }
        console.log(e.data);
        //这里需要处理服务器错误的情况
        if (e.data.statusCode == undefined) {
            console.log("没有错误");
        }
        //得到数据解析
        var rel = [];
        if (e.data.length >= 2) {
            rel = AnLogic.Analysis(e.data);
        }
        else {
            rel = e.data;
        }
        this.imgScene.drawAnalysis(e.data, rel);
    };
    Main.prototype.AI_error = function () {
        //error
        console.warn("ai network error!");
        if (this.loading_scene.parent != null) {
            this.removeChild(this.loading_scene);
        }
        this.s_scene.showError();
        this.addChild(this.s_scene);
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
