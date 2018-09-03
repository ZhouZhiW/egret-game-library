var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var WindowType = (function () {
    function WindowType() {
    }
    return WindowType;
}());
WindowType.ALERT_WIN = "ALERT_WIN";
__reflect(WindowType.prototype, "WindowType");
//# sourceMappingURL=WindowType.js.map