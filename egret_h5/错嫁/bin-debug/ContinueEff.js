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
/**
 *
 * @author
 *
 */
var ContinueEff = (function (_super) {
    __extends(ContinueEff, _super);
    function ContinueEff(thisObj, ex, ey) {
        var _this = _super.call(this) || this;
        _this.createDianEff(thisObj, ex, ey);
        return _this;
    }
    ContinueEff.prototype.createDianEff = function (thisObj, ex, ey) {
        this.dianEff = new egret.Bitmap();
        var imgsheet = RES.getRes("coverimg_json");
        this.dianEff.texture = imgsheet.getTexture("dianeff");
        thisObj.addChild(this.dianEff);
        this.dianEff.x = ex;
        this.dianEff.y = ey;
        this.dianEff.scaleX = 0.1;
        this.dianEff.scaleY = 0.1;
        this.dianEff.anchorOffsetX = 32;
        this.dianEff.anchorOffsetY = 32;
        var tw = egret.Tween.get(this.dianEff);
        tw.to({ scaleX: 0.5, scaleY: 0.5 }, 100).
            to({ alpha: 0.1, scaleX: 1.0, scaleY: 1.0 }, 300).call(function () {
            if (this.dianEff.parent) {
                this.dianEff.parent.removeChild(this.dianEff);
            }
        }, this);
    };
    return ContinueEff;
}(egret.DisplayObjectContainer));
__reflect(ContinueEff.prototype, "ContinueEff");
//# sourceMappingURL=ContinueEff.js.map