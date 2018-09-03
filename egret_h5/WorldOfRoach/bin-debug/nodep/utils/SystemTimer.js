var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 系统时间
 * @author nodep
 * @version 1.0
 */
var SystemTimer = (function () {
    function SystemTimer() {
    }
    SystemTimer.init = function () {
        SystemTimer._startTime = new Date().getTime();
    };
    SystemTimer.getTimer = function () {
        return new Date().getTime() - SystemTimer._startTime;
    };
    return SystemTimer;
}());
__reflect(SystemTimer.prototype, "SystemTimer");
//# sourceMappingURL=SystemTimer.js.map