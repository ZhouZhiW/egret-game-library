var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var bgshape = (function (_super) {
    __extends(bgshape, _super);
    function bgshape(num) {
        var _this = _super.call(this) || this;
        _this.Id = num;
        return _this;
    }
    return bgshape;
}(egret.Shape));
__reflect(bgshape.prototype, "bgshape");
