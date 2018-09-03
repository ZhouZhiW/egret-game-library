var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 用于地图创建的点
 * @author nodep
 * @version 1.0
 */
var Point2D = (function (_super) {
    __extends(Point2D, _super);
    function Point2D(tx, ty) {
        if (tx === void 0) { tx = 0; }
        if (ty === void 0) { ty = 0; }
        var _this = _super.call(this, tx, ty) || this;
        _this.tris = [];
        _this.id = ++Point2D._tid;
        return _this;
    }
    return Point2D;
}(egret.Point));
Point2D._tid = 0;
__reflect(Point2D.prototype, "Point2D");
//# sourceMappingURL=Point2D.js.map