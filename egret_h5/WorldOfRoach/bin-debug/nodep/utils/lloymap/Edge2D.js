var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 维若图用边数据结构
 * @author nodep
 * @version 1.0
 */
var Edge2D = (function () {
    function Edge2D(p1, p2) {
        if (p1.id > p2.id) {
            this.startPoint = p2;
            this.endPoint = p1;
        }
        else {
            this.startPoint = p1;
            this.endPoint = p2;
        }
        this.id = this.startPoint.id + "_" + this.endPoint.id;
    }
    return Edge2D;
}());
__reflect(Edge2D.prototype, "Edge2D");
//# sourceMappingURL=Edge2D.js.map