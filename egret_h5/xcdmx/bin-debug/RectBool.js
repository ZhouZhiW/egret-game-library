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
var RectBool = (function (_super) {
    __extends(RectBool, _super);
    function RectBool() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.CANREMOVE = true;
        _this.ROW = 0;
        _this.COL = 0;
        _this.COLOR = 0;
        _this.TYPE = 0;
        _this.ROTATIONTYPE = 0;
        return _this;
    }
    return RectBool;
}(egret.Bitmap));
__reflect(RectBool.prototype, "RectBool");
