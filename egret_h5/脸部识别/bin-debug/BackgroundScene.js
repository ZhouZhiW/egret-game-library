var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BackgroundScene = (function (_super) {
    __extends(BackgroundScene, _super);
    function BackgroundScene() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED, _this.init, _this);
        return _this;
    }
    BackgroundScene.prototype.init = function (e) {
        this.removeEventListener(egret.Event.ADDED, this.init, this);
        this.initbg();
        this.initLogo();
        this.initCovertop();
        this.initButton();
    };
    BackgroundScene.prototype.initbg = function () {
        var bg = new egret.Bitmap();
        var texture = RES.getRes("bg_jpg");
        bg.texture = texture;
        this.addChild(bg);
    };
    BackgroundScene.prototype.initLogo = function () {
        this.logo = new egret.Bitmap();
        var texture = RES.getRes("newlogo");
        console.log(texture);
        this.logo.texture = texture;
        this.logo.x = (this.stage.stageWidth - this.logo.width) / 2;
        this.logo.y = this.stage.stageHeight - this.logo.height - 10;
        this.addChild(this.logo);
    };
    BackgroundScene.prototype.initCovertop = function () {
        var Covertop = new egret.Bitmap();
        var texture = RES.getRes("cover-top");
        Covertop.texture = texture;
        Covertop.x = (this.stage.stageWidth - Covertop.width) / 2;
        Covertop.y = 10; //this.stage.stageHeight - Covertop.height - 10;
        this.addChild(Covertop);
    };
    BackgroundScene.prototype.initButton = function () {
        var btn = new egret.Bitmap();
        var texture = RES.getRes("button");
        btn.texture = texture;
        btn.x = (this.stage.stageWidth - btn.width) / 2;
        btn.y = this.logo.y - btn.height - 10;
        this.addChild(btn);
        btn.touchEnabled = true;
        btn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.click, this);
    };
    BackgroundScene.prototype.click = function (e) {
        this.dispatchEvent(e);
    };
    return BackgroundScene;
}(egret.DisplayObjectContainer));
__reflect(BackgroundScene.prototype, "BackgroundScene");
