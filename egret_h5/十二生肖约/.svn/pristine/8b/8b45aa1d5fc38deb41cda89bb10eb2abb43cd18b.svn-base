var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var FloatingAttactValue = (function (_super) {
    __extends(FloatingAttactValue, _super);
    function FloatingAttactValue(value, point) {
        var _this = _super.call(this) || this;
        _this.x = point.x;
        _this.y = point.y;
        _this.once(egret.Event.ADDED_TO_STAGE, _this.onCreate, _this);
        _this.font = new egret.BitmapText();
        _this.iscrit = value < 0;
        _this.text = EasyNumber.easyNum(Math.abs(value));
        return _this;
    }
    FloatingAttactValue.prototype.onCreate = function () {
        if (this.iscrit) {
            this.font = ResManager.inst.floatingCritFont;
        }
        else {
            this.font = ResManager.inst.floatingFont;
        }
        this.anchorOffsetX = this.width >> 1;
        this.anchorOffsetY = this.height;
        this.floating();
    };
    FloatingAttactValue.prototype.floating = function () {
        // if (this.iscrit) {
        //     egret.Tween.get(this)
        //         .to({ scaleX: 1.8, scaleY: 1.8 }, 20, egret.Ease.sineIn).to({ scaleX: 1, scaleY: 1 }, 30, egret.Ease.sineIn).wait(400).
        //         to({ y: this.y - 50, alpha: 0.7 }, 1000).call(this.floatingComplete, this);
        // } else {
        //     egret.Tween.get(this)
        //         .to({ scaleX: 1.5, scaleY: 1.5 }, 50, egret.Ease.sineIn).to({ scaleX: 0.8, scaleY: 0.8 }, 50, egret.Ease.sineIn).wait(200).
        //         to({ y: this.y - 30, alpha: 0.5 }, 300).call(this.floatingComplete, this);
        // }
        egret.Tween.get(this)
            .to({ y: this.y - 50 }, 1000, egret.Ease.sineOut).call(this.floatingComplete, this);
    };
    FloatingAttactValue.prototype.floatingComplete = function () {
        if (this.parent != null) {
            this.parent.removeChild(this);
        }
    };
    return FloatingAttactValue;
}(egret.BitmapText));
__reflect(FloatingAttactValue.prototype, "FloatingAttactValue");
//# sourceMappingURL=FloatingAttactValue.js.map