
class Main extends egret.DisplayObjectContainer {

    /**
     * 加载进度界面
     * Process interface loading
     */
    private loadingView:LoadingUI;
    private prompt:PromptUI;
    private gameLayer:GameLayer;
    private netMsg:NetMsg;
    private timer: egret.Timer = new egret.Timer(1000);//定时器
    private acc:string = "";
    private pas:string = "";
    public static login:Login = new Login();
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event:egret.Event) {
        
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.prompt = new PromptUI();
        this.stage.addChild(this.loadingView);

        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    private onConfigComplete(event:RES.ResourceEvent):void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    }

    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    private onResourceLoadComplete(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.netMsg = new NetMsg();
            if(this.$GET("acc") != null && this.$GET("pas") != null) {
                this.acc = this.$GET("acc");//获取网址传参 帐号
                this.pas = this.$GET("pas");
            } else {
                this.acc = "mm123456";//帐号
                this.pas = "123456";//密码
            }
            this.stage.addChild(this.prompt);
            
            //加个 定时器 等待 服务器验证 返回数据
            this.timer.addEventListener(egret.TimerEvent.TIMER,this.onLoginTimer,this);
            this.timer.start();
            Main.login.addEventListener("loginOk",this.onLogin,this);
            
        }
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event:RES.ResourceEvent):void {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onResourceLoadError(event:RES.ResourceEvent):void {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    }

    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    private onResourceProgress(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }

    private onLogin(e: egret.Event):void{
        console.log(e.type);
        Main.login.removeEventListener("loginOk",this.onLogin,this);
        this.prompt.setProgress("场景创建中...");
        this.createGameScene();
    }
    
    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene():void {
        
        this.gameLayer = new GameLayer();
        this.stage.addChild(this.gameLayer);
        this.stage.removeChild(this.prompt);
    }
    //获取 网址传参
    private $GET(name: string) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
        var r = location.search.substr(1).match(reg);
        if(r != null) return decodeURI(decodeURIComponent(decodeURI(r[2]))); return null;
    }
    //定时器 事件
    private onLoginTimer(e: egret.TimerEvent) {
        this.timer.stop();
        this.timer.removeEventListener(egret.TimerEvent.TIMER,this.onLoginTimer,this);
        
        var json = {
            "login": [{
                "account": this.acc,"password": this.pas
            }]
        };
        if(NetMsg.isConnection){
            this.prompt.setProgress("帐号验证中...");
            this.pushMsg(json);
        }else{
            this.prompt.setProgress("网络连接中...");
        }
    }
    /**发送消息*/
    private pushMsg(msg: any) {
        if(NetMsg.isConnection) {
            NetMsg.serverConn.sendData(msg);
        }
    }
}


