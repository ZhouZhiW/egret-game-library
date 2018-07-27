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
        _this.isThemeLoadEnd = false;
        _this.isResourceLoadEnd = false;
        return _this;
    }
    Main.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.initRes();
        this.initView = new InitUI();
        this.addChild(this.initView);
    };
    Main.prototype.onCreate = function () {
    };
    Main.prototype.onDestroy = function () {
    };
    Main.prototype.initRes = function () {
        //注入自定义的素材解析器
        var assetAdapter = new AssetAdapter();
        var themeAdapter = new ThemeAdapter();
        this.stage.registerImplementation("eui.IAssetAdapter", assetAdapter);
        this.stage.registerImplementation("eui.IThemeAdapter", themeAdapter);
        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    };
    /**
     * 配置文件加载完成,开始预加载皮肤主题资源和preload资源组。
     */
    Main.prototype.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        var theme = new eui.Theme("resource/default.thm.json", this.stage);
        theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        // RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    };
    /**
     * 主题文件加载完成
     */
    Main.prototype.onThemeLoadComplete = function () {
        this.isThemeLoadEnd = true;
        this.goLogin();
    };
    /**
     * preload资源组加载完成
     */
    Main.prototype.onResourceLoadComplete = function (event) {
        if (event.groupName == "preload") {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            // RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.isResourceLoadEnd = true;
            this.goLogin();
        }
    };
    /**
     * 资源组加载出错
     */
    Main.prototype.onItemLoadError = function (event) {
        this.initView.setInfo("资源组加载出错(item):" + event.resItem.url);
    };
    /**
     * 资源组加载出错
     */
    Main.prototype.onResourceLoadError = function (event) {
        this.initView.setInfo("资源组加载出错(res):" + event.groupName);
        //忽略加载失败的项目
        // this.onResourceLoadComplete(event);
    };
    /**
     * preload资源组加载进度
     * loading process of preload resource
     */
    // private onResourceProgress(event: RES.ResourceEvent): void {
    //     if (event.groupName == "preload") {
    //         this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
    //     }
    // }
    /**
     * 创建场景界面
     */
    Main.prototype.goLogin = function () {
        if (!this.isThemeLoadEnd || !this.isResourceLoadEnd) {
            return;
        }
        this.removeChild(this.initView);
        this.layerManager = new LayerManager();
        this.addChild(this.layerManager);
    };
    return Main;
}(BaseLayer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map