

class Main extends eui.UILayer {


    protected createChildren(): void {
        super.createChildren();

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }
        if (egret.Capabilities.runtimeType == egret.RuntimeType.WXGAME) {

            wx && wx.triggerGC();
            //    wx.showShareMenu();
            Const.Capabilities = 2;
        }

        let stageW = this.stage.stageWidth;
        let stageH = this.stage.stageHeight;
        Const.SW = stageW;

        Const.SH = stageH;

        //inject the custom material parser
        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();

        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());


        this.runGame().catch(e => {
            console.log(e);
        })
    }

    private async getUserInfo() {
        await platform.login().then((res) => {

        }).catch(err => {

        });
        await platform.getUserInfo().then(res => {


        }).catch(err => {

        });


    }
    private async runGame() {
        await this.getUserInfo().catch(e => {
            console.log(e);
        })
        await this.loadResource();


    }
    private async loadResource() {
        try {
            // if (egret.Capabilities.runtimeType == egret.RuntimeType.WXGAME) {
            //     await RES.loadConfig("https://sanside.huhugame.com/chaoJiHuHu/resource/default.res.json", "https://sanside.huhugame.com/chaoJiHuHu/resource");
            // } else {
            //     await RES.loadConfig("resource/default.res.json?", "resource/");
            // }
            await RES.loadConfig("resource/default.res.json", "resource/");
            await this.loadTheme();
            await RES.loadGroup("loading");
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadGroup("preload", 0, loadingView);
            this.stage.removeChild(loadingView);
            this.createGameScene();

        }
        catch (e) {
            console.error(e);
        }
    }

    private loadTheme() {
        return new Promise((resolve, reject) => {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            let theme = new eui.Theme("resource/default.thm.json", this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, () => {
                resolve();
            }, this);
            // RES.getResByUrl

        })
    }

    /**
     * 创建场景界面
     * Create scene interface
     */
    protected createGameScene(): void {
        if (Const.Capabilities != 2) {
            RES.loadGroup("sound");
        }
        this.addChild(new GameView());

    }



}
