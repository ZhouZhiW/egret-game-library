class BaseLayer extends eui.UILayer {
    private mcDatas: Array<{ path: string, mc: egret.MovieClipDataFactory }>;
    public constructor() {
        super();
        this.touchEnabled = false;
        this.touchChildren = true;
        this.once(egret.Event.ADDED_TO_STAGE, this.onCreate, this);
        this.once(egret.Event.REMOVED_FROM_STAGE, this.onDestroy, this);
    }
    protected onCreate() {

    }

    protected onDestroy() {

    }


    //====================================================
    protected loadMovieClipDataFactory(path: string, callback: Function, self: any = this) {
        let mcTexture = null;
        let mcData = null;
        const check = function () {
            if (mcTexture == null || mcData == null) {
                return;
            }
            const mcDataFactory = new egret.MovieClipDataFactory(mcData, mcTexture);
            callback.call(self, mcDataFactory, path);
        }

        const textureLoader = new egret.URLLoader();
        textureLoader.addEventListener(egret.Event.COMPLETE, function textureLoadOver(e) {
            mcTexture = e.currentTarget.data;
            check();
        }, this);
        textureLoader.dataFormat = egret.URLLoaderDataFormat.TEXTURE;
        const textureRequest = new egret.URLRequest(path + ".png");
        textureLoader.load(textureRequest);


        let dataLoader = new egret.URLLoader();
        dataLoader.addEventListener(egret.Event.COMPLETE, function dataLoadOver(e) {
            mcData = JSON.parse(e.currentTarget.data);
            check();
        }, this);
        dataLoader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        var dataRequest = new egret.URLRequest(path + ".json");
        dataLoader.load(dataRequest);
    }


    protected loadMovieClipDataFactorys(paths: Array<string>) {
        if (paths == null || paths.length == 0) {
            console.error("loadMovieClipsDataFactory paths is null");
            return;
        }
        this.mcDatas = [];
        for (var i = 0; i < paths.length; i++) {
            this.mcDatas.push({ path: paths[i], mc: null });
            this.loadMovieClipDataFactory(paths[i], this.loadPathsCallBack, this);
        }
    }


    private loadPathsCallBack(mc: egret.MovieClipDataFactory, path: string) {
        let init = true;
        for (var i = 0; i < this.mcDatas.length; i++) {
            if (this.mcDatas[i].path == path) {
                this.mcDatas[i].mc = mc;
            }
            if (this.mcDatas[i].mc == null) {
                init = false;
            }
        }
        if (init) {
            let mcs: Array<egret.MovieClipDataFactory> = []
            for (var i = 0; i < this.mcDatas.length; i++) {
                mcs.push(this.mcDatas[i].mc);
            }
            this.getMovieClipDataFactorys(mcs);
        }
    }

    protected getMovieClipDataFactorys(mcdfs: Array<egret.MovieClipDataFactory>) {

    }
}
