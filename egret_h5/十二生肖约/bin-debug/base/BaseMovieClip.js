var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseMovieClip = (function (_super) {
    __extends(BaseMovieClip, _super);
    function BaseMovieClip() {
        var _this = _super.call(this) || this;
        _this.width = 1;
        _this.height = 1;
        _this.tempPoint = new egret.Point();
        return _this;
    }
    BaseMovieClip.prototype.onCreate = function () {
    };
    BaseMovieClip.prototype.onDestroy = function () {
    };
    BaseMovieClip.prototype.getPoint = function () {
        if (this.parent == null) {
            this.tempPoint.x = 0;
            this.tempPoint.y = 0;
            return this.tempPoint;
        }
        else {
            return this.parent.localToGlobal(this.x, this.y, this.tempPoint);
        }
    };
    BaseMovieClip.prototype.loadMovieClipDataFactory = function (path, callback, self) {
        if (self === void 0) { self = this; }
        var mcTexture = null;
        var mcData = null;
        var check = function () {
            if (mcTexture == null || mcData == null) {
                return;
            }
            var mcDataFactory = new egret.MovieClipDataFactory(mcData, mcTexture);
            callback.call(self, mcDataFactory, path);
        };
        var textureLoader = new egret.URLLoader();
        textureLoader.addEventListener(egret.Event.COMPLETE, function textureLoadOver(e) {
            mcTexture = e.currentTarget.data;
            check();
        }, this);
        textureLoader.dataFormat = egret.URLLoaderDataFormat.TEXTURE;
        var textureRequest = new egret.URLRequest(path + ".png");
        textureLoader.load(textureRequest);
        var dataLoader = new egret.URLLoader();
        dataLoader.addEventListener(egret.Event.COMPLETE, function dataLoadOver(e) {
            mcData = JSON.parse(e.currentTarget.data);
            check();
        }, this);
        dataLoader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        var dataRequest = new egret.URLRequest(path + ".json");
        dataLoader.load(dataRequest);
    };
    BaseMovieClip.prototype.loadMovieClipDataFactorys = function (paths) {
        if (paths == null || paths.length == 0) {
            console.error("loadMovieClipsDataFactory paths is null");
            return;
        }
        this.mcDatas = [];
        for (var i = 0; i < paths.length; i++) {
            this.mcDatas.push({ path: paths[i], mc: null });
            this.loadMovieClipDataFactory(paths[i], this.loadPathsCallBack, this);
        }
    };
    BaseMovieClip.prototype.loadPathsCallBack = function (mc, path) {
        var init = true;
        for (var i = 0; i < this.mcDatas.length; i++) {
            if (this.mcDatas[i].path == path) {
                this.mcDatas[i].mc = mc;
            }
            if (this.mcDatas[i].mc == null) {
                init = false;
            }
        }
        if (init) {
            var mcs = [];
            for (var i = 0; i < this.mcDatas.length; i++) {
                mcs.push(this.mcDatas[i].mc);
            }
            this.getMovieClipDataFactorys(mcs);
        }
    };
    BaseMovieClip.prototype.getMovieClipDataFactorys = function (mcdfs) {
    };
    return BaseMovieClip;
}(BaseComponent));
__reflect(BaseMovieClip.prototype, "BaseMovieClip");
//# sourceMappingURL=BaseMovieClip.js.map