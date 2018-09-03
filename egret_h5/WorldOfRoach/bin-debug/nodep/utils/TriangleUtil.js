var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 三角函数
 * @author nodep
 * @version 1.0
 */
var TriangleUtil = (function () {
    function TriangleUtil() {
    }
    /**
    * 求外接圆半径
    * @param tri
    * @return
    */
    TriangleUtil.getCircumcircleR = function (tri) {
        var x1 = tri.vertex[0].x;
        var x2 = tri.vertex[1].x;
        var x3 = tri.vertex[2].x;
        var y1 = tri.vertex[0].y;
        var y2 = tri.vertex[1].y;
        var y3 = tri.vertex[2].y;
        var a = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
        var b = Math.sqrt((x1 - x3) * (x1 - x3) + (y1 - y3) * (y1 - y3));
        var c = Math.sqrt((x2 - x3) * (x2 - x3) + (y2 - y3) * (y2 - y3));
        var p = (a + b + c) / 2;
        var S = Math.sqrt(p * (p - a) * (p - b) * (p - c));
        var radius = a * b * c / (4 * S);
        return radius;
    };
    /**
     * 求外接圆圆心坐标
     * @param tri
     * @return
     */
    TriangleUtil.getCircumcirclePoint = function (tri) {
        var p = new Point2D();
        var x1 = tri.vertex[0].x;
        var x2 = tri.vertex[1].x;
        var x3 = tri.vertex[2].x;
        var y1 = tri.vertex[0].y;
        var y2 = tri.vertex[1].y;
        var y3 = tri.vertex[2].y;
        var t1 = x1 * x1 + y1 * y1;
        var t2 = x2 * x2 + y2 * y2;
        var t3 = x3 * x3 + y3 * y3;
        var temp = x1 * y2 + x2 * y3 + x3 * y1 - x1 * y3 - x2 * y1 - x3 * y2;
        p.x = (t2 * y3 + t1 * y2 + t3 * y1 - t2 * y1 - t3 * y2 - t1 * y3) / temp / 2;
        p.y = (t3 * x2 + t2 * x1 + t1 * x3 - t1 * x2 - t2 * x3 - t3 * x1) / temp / 2;
        return p;
    };
    /**
     * 检查一个点是否在一个三角形的外接圆内。
     * @param point
     * @param tri
     * @return
     */
    TriangleUtil.isInCircumcircle = function (point, tri) {
        var xd = (point.x - tri.center.x);
        var yd = (point.y - tri.center.y);
        return Math.sqrt(xd * xd + yd * yd) <= tri.circumR;
    };
    /**
    * 检查两个三角形是否相邻
    * 这个函数所适用的三角形必须是通过特殊流程构造的
    * @param triA
    * @param triB
    */
    TriangleUtil.isAdjacent = function (triA, triB) {
        var e1;
        var key;
        for (key in triA.edges) {
            e1 = triA.edges[key];
            var e2;
            for (key in triB.edges) {
                e2 = triB.edges[key];
                if (e1.id == e2.id)
                    return true;
            }
        }
        return false;
    };
    /**求距离 */
    TriangleUtil.distance = function (x_x, y_y) {
        return Math.abs(Math.sqrt(x_x * x_x + y_y * y_y));
    };
    return TriangleUtil;
}());
__reflect(TriangleUtil.prototype, "TriangleUtil");
//# sourceMappingURL=TriangleUtil.js.map