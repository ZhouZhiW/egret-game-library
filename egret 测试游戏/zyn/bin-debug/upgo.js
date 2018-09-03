var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var upgo = (function (_super) {
    __extends(upgo, _super);
    function upgo() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.startGame, _this);
        return _this;
    }
    upgo.prototype.startGame = function () {
        var _shape = new egret.Shape();
        var w = egret.MainContext.instance.stage.stageWidth;
        var h = egret.MainContext.instance.stage.stageHeight;
        _shape.graphics.beginFill(0x000000, 0.5);
        _shape.graphics.drawRect(0, 0, w, h);
        _shape.graphics.endFill();
        this.addChild(_shape);
        _shape.touchEnabled = true;
        var _upgo = this.createBitmapByName("upgo_png");
        this.addChild(_upgo);
        var _h = _upgo.width / _upgo.height;
        _upgo.width = 800;
        _upgo.height = _upgo.width / _h;
        _upgo.x = w / 2 - _upgo.width / 2;
        _upgo.y = h / 2 - _upgo.height / 2;
        var _quxiao = this.createBitmapByName("quxiao_png");
        this.addChild(_quxiao);
        _quxiao.x = 900;
        _quxiao.y = 100;
        _quxiao.width = 100;
        _quxiao.height = 100;
        var that = this;
        _quxiao.touchEnabled = true;
        _quxiao.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
            if (that.parent) {
                that.parent.removeChild(that);
            }
        }, this);
    };
    upgo.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    return upgo;
}(egret.DisplayObjectContainer));
__reflect(upgo.prototype, "upgo");
//# sourceMappingURL=upgo.js.map