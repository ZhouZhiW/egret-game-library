var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 日志,任务,记录
 */
var LogWindow = (function (_super) {
    __extends(LogWindow, _super);
    function LogWindow() {
        var _this = _super.call(this) || this;
        _this.layerType = LayerType.LAYER_UI;
        _this.typeName = WorWindowType.LOG_WINDOW;
        _this.pop = true;
        return _this;
    }
    LogWindow.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    return LogWindow;
}(GameWindow));
__reflect(LogWindow.prototype, "LogWindow", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=LogWindow.js.map