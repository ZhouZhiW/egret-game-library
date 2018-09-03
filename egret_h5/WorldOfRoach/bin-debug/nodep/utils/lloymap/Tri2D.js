var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 业务用三角形
 * @author nodep
 * @version 1.0
 */
var Tri2D = (function () {
    function Tri2D(points, autoBuild) {
        if (autoBuild === void 0) { autoBuild = true; }
        //是否已初始化三角函数
        this.inited = false;
        //外接圆半径
        this.circumR = 0;
        //三角形的三条边
        this.edges = new Array(3);
        //是否属于辅助三角形
        this.isAssist = false;
        this.vertex = points;
        this.vertex[0].tris.push(this);
        this.vertex[1].tris.push(this);
        this.vertex[2].tris.push(this);
        this.inited = autoBuild;
        this.edges[0] = new Edge2D(points[0], points[1]);
        this.edges[1] = new Edge2D(points[1], points[2]);
        this.edges[2] = new Edge2D(points[2], points[0]);
        if (this.inited)
            this.flush();
    }
    /**
    * 刷新三角形的重要属性
    */
    Tri2D.prototype.flush = function () {
        this.inited = true;
        this.center = TriangleUtil.getCircumcirclePoint(this);
        this.circumR = TriangleUtil.getCircumcircleR(this);
    };
    /**三角形被销毁*/
    Tri2D.prototype.del = function () {
        this.vertex[0].tris.splice(this.vertex[0].tris.indexOf(this), 1);
        this.vertex[1].tris.splice(this.vertex[1].tris.indexOf(this), 1);
        this.vertex[2].tris.splice(this.vertex[2].tris.indexOf(this), 1);
    };
    return Tri2D;
}());
__reflect(Tri2D.prototype, "Tri2D");
//# sourceMappingURL=Tri2D.js.map