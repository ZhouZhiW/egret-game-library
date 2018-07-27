var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UI_Base_Tab = (function (_super) {
    __extends(UI_Base_Tab, _super);
    function UI_Base_Tab() {
        return _super.call(this) || this;
    }
    UI_Base_Tab.prototype.onCreate = function () {
        this.tabCloseBtn.once(egret.TouchEvent.TOUCH_TAP, this.close, this);
    };
    UI_Base_Tab.prototype.onDestroy = function () {
    };
    UI_Base_Tab.prototype.close = function () {
        UILayer.inst.home.closeTab();
        if (this.parent != null) {
            this.parent.removeChild(this);
        }
    };
    return UI_Base_Tab;
}(BaseComponent));
__reflect(UI_Base_Tab.prototype, "UI_Base_Tab");
//# sourceMappingURL=UI_Base_Tab.js.map