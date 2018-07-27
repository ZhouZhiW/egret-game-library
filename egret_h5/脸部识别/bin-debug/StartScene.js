var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var StartScene = (function (_super) {
    __extends(StartScene, _super);
    function StartScene() {
        var _this = _super.call(this) || this;
        _this.w = 0;
        _this.h = 0;
        _this.addEventListener(egret.Event.ADDED, _this.init, _this);
        return _this;
    }
    StartScene.prototype.init = function (e) {
        this.removeEventListener(egret.Event.ADDED, this.init, this);
        this.w = this.stage.stageWidth;
        this.h = this.stage.stageHeight;
        var bg = new egret.Bitmap();
        var texture = RES.getRes("cover-bottom_png");
        bg.texture = texture;
        bg.x = (this.stage.stageWidth - bg.width) / 2;
        bg.y = 434;
        this.addChild(bg);
    };
    StartScene.prototype.showError = function () {
        this.removeChildren();
        var bg = new egret.Bitmap();
        var texture = RES.getRes("error_png");
        bg.texture = texture;
        bg.x = (this.w - bg.width) / 2;
        bg.y = (this.h - bg.height) / 2;
        this.addChild(bg);
    };
    return StartScene;
}(egret.DisplayObjectContainer));
__reflect(StartScene.prototype, "StartScene");
