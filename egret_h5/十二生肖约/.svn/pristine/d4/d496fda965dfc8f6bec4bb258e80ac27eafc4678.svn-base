class Main extends BaseLayer {
    // https://github.com/egret-labs/egret-core
    private initView: InitUI;
    private layerManager: LayerManager;

    public constructor() {
        super();
    }


    protected createChildren(): void {
        super.createChildren();
        this.initRes();
        this.initView = new InitUI();
        this.addChild(this.initView);
    }

    protected onCreate() {

    }

    protected onDestroy() {

    }

    private initRes() {
        //注入自定义的素材解析器
        const assetAdapter = new AssetAdapter();
        const themeAdapter = new ThemeAdapter();
        this.stage.registerImplementation("eui.IAssetAdapter", assetAdapter);
        this.stage.registerImplementation("eui.IThemeAdapter", themeAdapter);
        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }

    /**
     * 配置文件加载完成,开始预加载皮肤主题资源和preload资源组。
     */
    private onConfigComplete(event: RES.ResourceEvent): void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);

        var theme = new eui.Theme("resource/default.thm.json", this.stage);
        theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);

        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        // RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    }

    private isThemeLoadEnd: boolean = false;


    /**
     * 主题文件加载完成
     */
    private onThemeLoadComplete(): void {
        this.isThemeLoadEnd = true;
        this.goLogin();
    }

    private isResourceLoadEnd: boolean = false;

    /**
     * preload资源组加载完成
     */
    private onResourceLoadComplete(event: RES.ResourceEvent): void {
        if (event.groupName == "preload") {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            // RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.isResourceLoadEnd = true;
            this.goLogin();
        }
    }

    /**
     * 资源组加载出错
     */
    private onItemLoadError(event: RES.ResourceEvent): void {
        this.initView.setInfo("资源组加载出错(item):" + event.resItem.url);
    }

    /**
     * 资源组加载出错
     */
    private onResourceLoadError(event: RES.ResourceEvent): void {
        this.initView.setInfo("资源组加载出错(res):" + event.groupName);
        //忽略加载失败的项目
        // this.onResourceLoadComplete(event);
    }

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
    private goLogin(): void {
        if (!this.isThemeLoadEnd || !this.isResourceLoadEnd) {
            return;
        }
        this.removeChild(this.initView);
        this.layerManager = new LayerManager();
        this.addChild(this.layerManager);
    }




}
