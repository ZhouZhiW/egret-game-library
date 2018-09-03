var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 游戏常用的时间处理
 * @author nodep
 * @version 1.0
 */
var TimeUtil = (function () {
    function TimeUtil() {
    }
    /**
     * 根据小时和分钟计算
     */
    TimeUtil.getTimeStrByHM = function (hour, min) {
        var str = "";
        str += hour >= 10 ? hour + ":" : "0" + hour + ":";
        str += min >= 10 ? min : "0" + min;
        return str;
    };
    return TimeUtil;
}());
__reflect(TimeUtil.prototype, "TimeUtil");
//# sourceMappingURL=TimeUtil.js.map