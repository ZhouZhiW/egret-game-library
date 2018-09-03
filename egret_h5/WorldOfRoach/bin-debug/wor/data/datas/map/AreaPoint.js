var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 多边形顶点
 */
var AreaPoint = (function (_super) {
    __extends(AreaPoint, _super);
    function AreaPoint(tx, ty) {
        if (tx === void 0) { tx = 0; }
        if (ty === void 0) { ty = 0; }
        var _this = _super.call(this, tx, ty) || this;
        _this.id = 0;
        _this.nears = []; //相邻的点
        _this.areas = []; //所属区域ID
        _this.elevation = 10; //默认海拔
        _this.sorted = false;
        _this.river = 0;
        return _this;
    }
    /**
     * 寻找下游
     * 从小到大进行排序
     */
    AreaPoint.findDownstream = function (p2d, river) {
        if (!p2d.sorted) {
            p2d.sorted = true; //从小到大排序
            p2d.nears.sort(function (a, b) {
                if (a.elevation > b.elevation)
                    return 1;
                else if (a.elevation == b.elevation)
                    return 0;
                return -1;
            });
        }
        for (var i = 0; i < p2d.nears.length; i++) {
            if (river.downsteams.indexOf(p2d.nears[i]) < 0)
                return p2d.nears[i];
        }
        return null;
    };
    return AreaPoint;
}(egret.Point));
__reflect(AreaPoint.prototype, "AreaPoint");
//# sourceMappingURL=AreaPoint.js.map