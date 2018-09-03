var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 双色球计算器启动类
 */
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //皮肤是否加载完成
        _this._isThemeLoadEnd = false;
        //prolaod资源是否加载完成
        _this._isResourceLoadEnd = false;
        return _this;
        // /**
        //  * 描述文件加载成功，开始播放动画
        //  * Description file loading is successful, start to play the animation
        //  */
        //  private startAnimation(result: Array<any>): void {
        //     let parser = new egret.HtmlTextParser();
        //     let textflowArr = result.map(text => parser.parse(text));
        //     let textfield = this.textfield;
        //     let count = -1;
        //     let change = () => {
        //         count++;
        //         if (count >= textflowArr.length) {
        //             count = 0;
        //         }
        //         let textFlow = textflowArr[count];
        //         // 切换描述内容
        //         // Switch to described content
        //         textfield.textFlow = textFlow;
        //         let tw = egret.Tween.get(textfield);
        //         tw.to({ "alpha": 1 }, 200);
        //         tw.wait(2000);
        //         tw.to({ "alpha": 0 }, 200);
        //         tw.call(change, this);
        //     };
        //     change();
        //  }
        // /**
        //  * 点击按钮
        //  * Click the button
        //  */
        // private onButtonClick(e: egret.TouchEvent) {
        //     let panel = new eui.Panel();
        //     panel.title = "Title";
        //     panel.horizontalCenter = 0;
        //     panel.verticalCenter = 0;
        //     this.addChild(panel);
        // }
    }
    /**
     * 默认的初始化程序,复写函数不需要些override
     */
    Main.prototype.createChildren = function () {
        SystemTimer.init();
        _super.prototype.createChildren.call(this);
        // egret.Capabilities.isMobile
        //------------------
        egret.TextField.default_fontFamily = "Monlo";
        //------------------
        //注入自定义的素材解析器
        var assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        //设置加载界面
        this._loadingView = new LoadingUI();
        this.stage.addChild(this._loadingView);
        //加载资源库的json配置文件,主要是图片路径的配置文件
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
        // this.stage.dirtyRegionPolicy = egret.DirtyRegionPolicy.ON;
    };
    /**
     * 配置文件加载完成,开始预加载皮肤主题资源和preload资源组。
     */
    Main.prototype.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
        var theme = new eui.Theme("resource/default.thm.json", this.stage);
        theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);
        //加载preload资源对应的资源包
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    };
    /**
     * 主题文件加载完成,开始预加载
     */
    Main.prototype.onThemeLoadComplete = function () {
        this._isThemeLoadEnd = true;
        this.createScene();
    };
    /**
     * preload资源组加载完成
     */
    Main.prototype.onResourceLoadComplete = function (event) {
        if (event.groupName == "preload") {
            this.stage.removeChild(this._loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this._isResourceLoadEnd = true;
            this.createScene();
        }
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    Main.prototype.onItemLoadError = function (event) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    };
    /**
     * 资源组加载出错
     * Resource group loading failed
     */
    Main.prototype.onResourceLoadError = function (event) {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //ignore loading failed projects
        this.onResourceLoadComplete(event);
    };
    /**
     * preload资源组加载进度
     * loading process of preload resource
     */
    Main.prototype.onResourceProgress = function (event) {
        if (event.groupName == "preload") {
            this._loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    };
    ///////////////////////////////////////////////////////////////////////////下面正式进入游戏流程/////////////////////////////////////////////////////////////////
    /**
     * 如果默认皮肤资源与preload资源均已加载完成
     * 则创建场景
     */
    Main.prototype.createScene = function () {
        if (this._isThemeLoadEnd && this._isResourceLoadEnd) {
            this.startCreateScene();
        }
    };
    //正式进入游戏
    Main.prototype.startGame = function () {
        DelayCall.call(200, this.delayStart, this);
    };
    //延迟进入游戏
    Main.prototype.delayStart = function () {
        WinsManager.getIns().openWindow(MenuWindow);
    };
    /**
     * 创建场景界面
     * Create scene interface
     */
    Main.prototype.startCreateScene = function () {
        LogTrace.log("application loadcompleted...");
        WinsManager.getIns().initGame(this);
        //启动主Render
        RenderManager.getIns().startRender(this.stage);
        //初始化层级
        WinsManager.getIns().addLayer(LayerType.LAYER_GROUND, new GameLayer());
        WinsManager.getIns().addLayer(LayerType.LAYER_MENU, new GameLayer());
        WinsManager.getIns().addLayer(LayerType.LAYER_UI, new GameLayer());
        WinsManager.getIns().addLayer(LayerType.LAYER_POP, new GameLayer());
        this.startGame();
        //-----------测试代码----------
        //创建背景图片
        // let sky = this.createBitmapByName("bg_jpg");
        // this.addChild(sky);
        // let stageW = this.stage.stageWidth;
        // let stageH = this.stage.stageHeight;
        // sky.width = stageW;
        // sky.height = stageH;
        // //顶部的一个黑色半透明栏
        // let topMask = new egret.Shape();
        // topMask.graphics.beginFill(0x000000, 0.5);
        // topMask.graphics.drawRect(0, 0, stageW, 172);
        // topMask.graphics.endFill();
        // topMask.y = 33;
        // this.addChild(topMask);
        //文本的创建
        // let colorLabel = new egret.TextField();
        // colorLabel.textColor = 0xffffff;
        // colorLabel.width = stageW - 172;
        // colorLabel.textAlign = "center";
        // colorLabel.text = "Hello Egret";
        // colorLabel.size = 24;
        // colorLabel.x = 172;
        // colorLabel.y = 80;
        // this.addChild(colorLabel);
        // let textfield = new egret.TextField();
        // this.addChild(textfield);
        // textfield.alpha = 0;
        // textfield.width = stageW - 172;
        // textfield.textAlign = egret.HorizontalAlign.CENTER;
        // textfield.size = 24;
        // textfield.textColor = 0xffffff;
        // textfield.x = 172;
        // textfield.y = 135;
        // this.textfield = textfield;
        //根据name关键字，异步获取一个json配置文件，name属性请参考resources/resource.json配置文件的内容。其实这个是在prelaod下
        // RES.getResAsync("User_json", this.startAnimation, this);
        // let button = new eui.Button();
        // button.label = "Click!";
        // button.horizontalCenter = 0;
        // button.verticalCenter = 0;
        // this.addChild(button);
        // button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
    };
    return Main;
}(eui.UILayer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map