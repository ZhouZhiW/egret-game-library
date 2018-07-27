var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Loading = (function (_super) {
    __extends(Loading, _super);
    function Loading() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED, _this.init, _this);
        return _this;
    }
    Loading.prototype.init = function (e) {
        this.removeEventListener(egret.Event.ADDED, this.init, this);
        if (this.heart == null) {
            this.createbg();
            this.createText();
            this.createHeart();
        }
        this.startMove();
    };
    //fcad4f
    Loading.prototype.createbg = function () {
        var bg = new egret.Shape();
        bg.graphics.beginFill(0xfcad4f, 0.8);
        bg.graphics.drawRect(0, 0, this.stage.stageWidth, this.stage.stageHeight);
        bg.graphics.endFill();
        this.addChild(bg);
    };
    Loading.prototype.createText = function () {
        var k = new egret.Bitmap();
        k.texture = RES.getRes("loading");
        this.addChild(k);
        k.x = (this.stage.stageWidth - k.width) / 2;
        k.y = this.stage.stageHeight / 2 + 100;
    };
    Loading.prototype.createHeart = function () {
        this.heart = new egret.Bitmap();
        this.heart.texture = RES.getRes("loadingui");
        this.addChild(this.heart);
        this.heart.anchorOffsetX = this.heart.width / 2;
        this.heart.anchorOffsetY = this.heart.height / 2;
        this.heart.x = this.stage.stageWidth / 2;
        this.heart.y = this.stage.stageHeight / 2;
    };
    Loading.prototype.startMove = function () {
        egret.Tween.get(this.heart).to({ scaleX: 1.5, scaleY: 1.5 }, 700, egret.Ease.elasticOut).to({ scaleX: 1, scaleY: 1 }, 600, egret.Ease.elasticOut).call(this.startMove, this);
    };
    return Loading;
}(egret.DisplayObjectContainer));
__reflect(Loading.prototype, "Loading");
