var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        _super.call(this);
        this.timer = new egret.Timer(1000); //定时器
        this.acc = "";
        this.pas = "";
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var d = __define,c=Main,p=c.prototype;
    p.onAddToStage = function (event) {
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.prompt = new PromptUI();
        this.stage.addChild(this.loadingView);
        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    };
    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    p.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    };
    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    p.onResourceLoadComplete = function (event) {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.netMsg = new NetMsg();
            if (this.$GET("acc") != null && this.$GET("pas") != null) {
                this.acc = this.$GET("acc"); //获取网址传参 帐号
                this.pas = this.$GET("pas");
            }
            else {
                this.acc = "mm123456"; //帐号
                this.pas = "123456"; //密码
            }
            this.stage.addChild(this.prompt);
            //加个 定时器 等待 服务器验证 返回数据
            this.timer.addEventListener(egret.TimerEvent.TIMER, this.onLoginTimer, this);
            this.timer.start();
            Main.login.addEventListener("loginOk", this.onLogin, this);
        }
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    p.onItemLoadError = function (event) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    p.onResourceLoadError = function (event) {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    };
    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    p.onResourceProgress = function (event) {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    };
    p.onLogin = function (e) {
        console.log(e.type);
        Main.login.removeEventListener("loginOk", this.onLogin, this);
        this.prompt.setProgress("场景创建中...");
        this.createGameScene();
    };
    /**
     * 创建游戏场景
     * Create a game scene
     */
    p.createGameScene = function () {
        this.gameLayer = new GameLayer();
        this.stage.addChild(this.gameLayer);
        this.stage.removeChild(this.prompt);
    };
    //获取 网址传参
    p.$GET = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = location.search.substr(1).match(reg);
        if (r != null)
            return decodeURI(decodeURIComponent(decodeURI(r[2])));
        return null;
    };
    //定时器 事件
    p.onLoginTimer = function (e) {
        this.timer.stop();
        this.timer.removeEventListener(egret.TimerEvent.TIMER, this.onLoginTimer, this);
        var json = {
            "login": [{
                    "account": this.acc, "password": this.pas
                }]
        };
        if (NetMsg.isConnection) {
            this.prompt.setProgress("帐号验证中...");
            this.pushMsg(json);
        }
        else {
            this.prompt.setProgress("网络连接中...");
        }
    };
    /**发送消息*/
    p.pushMsg = function (msg) {
        if (NetMsg.isConnection) {
            NetMsg.serverConn.sendData(msg);
        }
    };
    Main.login = new Login();
    return Main;
})(egret.DisplayObjectContainer);
egret.registerClass(Main,'Main');
//# sourceMappingURL=Main.js.map