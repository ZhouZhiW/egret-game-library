var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var introduction = (function (_super) {
    __extends(introduction, _super);
    function introduction() {
        var _this = _super.call(this) || this;
        _this._isRemo = false;
        _this.touchEnabled = true;
        _this.addEventListener(egret.TouchEvent.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    introduction.prototype.onAddToStage = function () {
        var bgc = new egret.Shape();
        bgc.graphics.beginFill(0x000, 0.5);
        bgc.graphics.drawRect(0, 0, this.stage.stageWidth, this.stage.stageHeight);
        this.addChild(bgc);
        var bg = new egret.Bitmap();
        bg.texture = RES.getRes("shuoming_png");
        bg.width = 600;
        bg.height = 548;
        this.addChild(bg);
        bg.x = this.stage.stageWidth / 2;
        bg.y = this.stage.stageHeight + 700;
        bg.anchorOffsetX = bg.width / 2;
        bg.anchorOffsetY = bg.height / 2;
        var _x = this.stage.stageWidth / 2;
        var _y = this.stage.stageHeight / 2;
        var that = this;
        egret.Tween.get(bg).to({ x: _x, y: _y }, 500, egret.Ease.sineIn).call(function () {
            that._isRemo = true;
        });
        bg.touchEnabled = true;
        bg.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (that.parent && that._isRemo) {
                that.parent.removeChild(that);
            }
        }, this);
    };
    return introduction;
}(egret.DisplayObjectContainer));
__reflect(introduction.prototype, "introduction");
