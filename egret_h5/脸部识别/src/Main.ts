class Main extends egret.DisplayObjectContainer {

    private ai: MSAi;
    private s_scene: StartScene;
    private bg_scene: BackgroundScene;
    private loading_scene: Loading;

    private FACE_KEY: string = "一个字符串，需要自己申请"

    private loadingView: LoadingUI;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.loading, this);
    }

    private loading(e: egret.Event) {
        this.loadingView = new LoadingUI(this.stage.stageWidth, this.stage.stageHeight);
        this.stage.addChild(this.loadingView);

        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }
    private onConfigComplete(e: RES.ResourceEvent): void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.loadGroup("preload");
    }
    private onResourceProgress(event: RES.ResourceEvent) {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }

    private onResourceLoadComplete(event: RES.ResourceEvent) {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            this.init();
        }
    }

    private init() {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);

        this.ai = new MSAi();
        this.ai.addEventListener(egret.Event.COMPLETE, this.AI_complete, this);
        this.ai.addEventListener("error", this.AI_error, this);

        this.bg_scene = new BackgroundScene();
        this.addChild(this.bg_scene);
        this.bg_scene.addEventListener(egret.TouchEvent.TOUCH_TAP, this.click, this);

        this.s_scene = new StartScene();
        this.addChild(this.s_scene);
    }

    private imgScene: ImageScene;
    private click(e: egret.TouchEvent) {
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

        egret.experimental.pickPhoto().then((baseUrl: string) => {
            this.showLoading();

         //   let img = document.createElement("img");
         //   img.src = baseUrl;

            let data = this.base64ToArrayBuffer(baseUrl,"jpeg");
            this.nextStep(data, baseUrl, false);

        });

    }
    private base64ToArrayBuffer(base64, contentType) {
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
    }

    private showLoading() {
        if (this.loading_scene == null) {
            this.loading_scene = new Loading();
        }
        this.addChild(this.loading_scene);
    }

    private nextStep(data: any, base64: string, xuanzhuan: boolean) {
        if (this.imgScene == null) {
            this.imgScene = new ImageScene();
        }
        if (this.s_scene.parent != null) {
            this.removeChild(this.s_scene);
        }
        this.addChildAt(this.imgScene, 1);
        this.imgScene.InitImage(base64, xuanzhuan);

        this.ai.face(this.FACE_KEY, data);
    }

    private AI_complete(e: egret.Event) {

        if (this.loading_scene.parent != null) {
            this.removeChild(this.loading_scene);
        }
        console.log(e.data);
        //这里需要处理服务器错误的情况
        if (e.data.statusCode == undefined) {
            console.log("没有错误");
        }
        //得到数据解析
        let rel: Object[] = [];
        if (e.data.length >= 2) {
            rel = AnLogic.Analysis(e.data);
        } else {
            rel = e.data;
        }
        this.imgScene.drawAnalysis(e.data, rel);
    }

    private AI_error() {
        //error
        console.warn("ai network error!")
        if (this.loading_scene.parent != null) {
            this.removeChild(this.loading_scene);
        }
        this.s_scene.showError();
        this.addChild(this.s_scene);
    }
}