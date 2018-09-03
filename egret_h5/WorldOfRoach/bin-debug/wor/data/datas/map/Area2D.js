var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 地图多边形
 */
var Area2D = (function () {
    function Area2D() {
        //id编号
        this.id = 0;
        //是否属于辅助
        this.isOutside = false;
        //是否是水
        this.isWater = false;
        //相邻的多边形
        this.neighbor = new Array();
        //顶点
        this.vertex = new Array();
        //湿度
        this.humidity = 1;
    }
    Area2D.prototype.getElevation = function () {
        return this.vertex[0].elevation;
    };
    return Area2D;
}());
__reflect(Area2D.prototype, "Area2D");
//# sourceMappingURL=Area2D.js.map