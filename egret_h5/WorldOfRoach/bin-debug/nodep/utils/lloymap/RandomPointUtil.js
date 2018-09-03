var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 关于随机点的应用函数
 * @author nodep
 * @version 1.0
 */
var RandomPointUtil = (function () {
    function RandomPointUtil() {
    }
    /**
     * 根据框的宽高和边框的宽度，获取随机点
     */
    RandomPointUtil.getRandomPoints = function (sizeW, sizeH, border, num) {
        var pointsStr = new Array();
        var points = new Array();
        var rx;
        var ry;
        var str;
        while (num > 0) {
            rx = Math.floor(Math.random() * (sizeW - border * 2) + border);
            ry = Math.floor(Math.random() * (sizeW - border * 2) + border);
            str = rx + "_" + ry;
            if (pointsStr.indexOf(str) >= 0) {
                continue;
            }
            else {
                pointsStr.push(str);
                num--;
                points.push(rx);
                points.push(ry);
            }
        }
        pointsStr = null;
        return points;
    };
    return RandomPointUtil;
}());
__reflect(RandomPointUtil.prototype, "RandomPointUtil");
//# sourceMappingURL=RandomPointUtil.js.map