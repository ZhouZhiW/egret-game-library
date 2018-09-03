var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 日志输出
 * @author nodep
 * @version 1.0
 */
var LogTrace = (function () {
    function LogTrace() {
    }
    LogTrace.log = function (str) {
        console.log(str);
    };
    return LogTrace;
}());
__reflect(LogTrace.prototype, "LogTrace");
//# sourceMappingURL=LogTrace.js.map