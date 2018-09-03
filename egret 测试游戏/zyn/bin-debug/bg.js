var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var bg = (function (_super) {
    __extends(bg, _super);
    function bg() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.Id = 0;
        return _this;
    }
    return bg;
}(egret.Bitmap));
__reflect(bg.prototype, "bg");
//# sourceMappingURL=bg.js.map