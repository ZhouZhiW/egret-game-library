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
var DianEff = (function (_super) {
    __extends(DianEff, _super);
    function DianEff(thisObj, ex, ey) {
        var _this = _super.call(this) || this;
        _this.createDianEff(thisObj, ex, ey);
        return _this;
    }
    DianEff.prototype.createDianEff = function (thisObj, ex, ey) {
        this.dianeff = new egret.Bitmap();
        var imgsheet = RES.getRes("coverimg_json");
        this.dianeff.texture = imgsheet.getTexture("dianeff");
        thisObj.addChild(this.dianeff);
        this.dianeff.x = ex;
        this.dianeff.y = ey;
        this.dianeff.scaleX = 0.1;
        this.dianeff.scaleY = 0.1;
        this.dianeff.anchorOffsetX = 32;
        this.dianeff.anchorOffsetY = 32;
        var tw = egret.Tween.get(this.dianeff);
        tw.to({ scaleX: 0.8, scaleY: 0.8 }, 100).
            to({ alpha: 0.1, scaleX: 1.5, scaleY: 1.5 }, 300).call(function () {
            if (this.dianeff.parent) {
                this.dianeff.parent.removeChild(this.dianeff);
            }
        }, this);
    };
    return DianEff;
}(egret.DisplayObjectContainer));
__reflect(DianEff.prototype, "DianEff");
//# sourceMappingURL=DianEff.js.map