var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var HeartValue = (function (_super) {
    __extends(HeartValue, _super);
    function HeartValue() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED, _this.init, _this);
        return _this;
    }
    HeartValue.prototype.init = function (e) {
        this.removeEventListener(egret.Event.ADDED, this.init, this);
        this.heart = new egret.Bitmap();
        this.heart.texture = RES.getRes("xin");
        this.addChild(this.heart);
        var agetext = new egret.BitmapText();
        agetext.font = RES.getRes("ssfont_fnt");
        agetext.text = Math.ceil(Math.ceil(AnLogic.FEN)).toString() + "%";
        // agetext.width *= 0.7
        // agetext.height *= 0.7
        agetext.x = (this.heart.width - agetext.width) / 2;
        agetext.y = (this.heart.height - agetext.height) / 2 + 10;
        this.addChild(agetext);
        this.anchorOffsetX = this.heart.width / 2;
        this.anchorOffsetY = this.heart.height / 2;
    };
    return HeartValue;
}(egret.DisplayObjectContainer));
__reflect(HeartValue.prototype, "HeartValue");
