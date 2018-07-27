var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var G_HPProgressBar = (function (_super) {
    __extends(G_HPProgressBar, _super);
    function G_HPProgressBar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.HPWidth = 59;
        return _this;
    }
    G_HPProgressBar.prototype.getW = function () {
        return 63;
    };
    G_HPProgressBar.prototype.getH = function () {
        return 11;
    };
    G_HPProgressBar.prototype.onCreate = function () {
    };
    G_HPProgressBar.prototype.onDestroy = function () {
    };
    Object.defineProperty(G_HPProgressBar.prototype, "skinPath", {
        get: function () {
            return "resource/skins/game/G_HPProgressBarSkin.exml";
        },
        enumerable: true,
        configurable: true
    });
    G_HPProgressBar.prototype.setHP = function (currentHP, totleHP) {
        egret.Tween.removeTweens(this.hpProgressBar);
        var w = Math.ceil(currentHP / totleHP * this.HPWidth);
        if (w > 0) {
            egret.Tween.get(this.hpProgressBar).to({ width: w }, 200, egret.Ease.sineIn);
        }
        else {
            egret.Tween.get(this.hpProgressBar).to({ width: w }, 200, egret.Ease.sineIn).call(function () {
                this.visible = false;
            }, this);
        }
    };
    return G_HPProgressBar;
}(BaseComponent));
__reflect(G_HPProgressBar.prototype, "G_HPProgressBar");
//# sourceMappingURL=G_HPProgressBar.js.map