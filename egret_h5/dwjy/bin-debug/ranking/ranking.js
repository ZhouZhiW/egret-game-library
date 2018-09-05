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
var ranking = (function (_super) {
    __extends(ranking, _super);
    function ranking() {
        var _this = _super.call(this) || this;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.onComplete, _this);
        _this.skinName = "resource/skins/start.exml";
        return _this;
    }
    ranking.prototype.onComplete = function () {
    };
    return ranking;
}(eui.Component));
__reflect(ranking.prototype, "ranking", ["eui.UIComponent", "egret.DisplayObject"]);
