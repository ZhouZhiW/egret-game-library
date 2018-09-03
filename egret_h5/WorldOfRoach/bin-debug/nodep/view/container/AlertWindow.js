var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 普通确认取消框
 * @author nodep
 * @version 1.0
 */
var AlertWindow = (function (_super) {
    __extends(AlertWindow, _super);
    function AlertWindow() {
        var _this = _super.call(this) || this;
        _this.layerType = LayerType.LAYER_POP;
        _this.typeName = WindowType.ALERT_WIN;
        _this.pop = true;
        _this.align(AlignType.CENTER, 0, 0);
        return _this;
    }
    //打开一个确认框
    AlertWindow.alertShow = function (message, callBack, thisObject, btnLabels) {
        if (btnLabels === void 0) { btnLabels = null; }
        AlertWindow._message = message;
        AlertWindow._callBack = callBack;
        AlertWindow._thisObject = thisObject;
        AlertWindow._labels = btnLabels;
        WinsManager.getIns().openWindow(AlertWindow);
    };
    AlertWindow.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.getChildByName("okBtn").addEventListener(egret.TouchEvent.TOUCH_TAP, this.handler, this);
        this.getChildByName("cancelBtn").addEventListener(egret.TouchEvent.TOUCH_TAP, this.handler, this);
        this.reOpen();
    };
    AlertWindow.prototype.handler = function (evt) {
        if (AlertWindow._callBack != null)
            AlertWindow._callBack.apply(AlertWindow._thisObject, [evt.currentTarget.name == "okBtn"]);
        WinsManager.getIns().closeWin(this);
    };
    AlertWindow.prototype.reOpen = function () {
        _super.prototype.reOpen.call(this);
        this.getChildByName("infoTxt").text = AlertWindow._message;
    };
    return AlertWindow;
}(GameWindow));
__reflect(AlertWindow.prototype, "AlertWindow", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=AlertWindow.js.map