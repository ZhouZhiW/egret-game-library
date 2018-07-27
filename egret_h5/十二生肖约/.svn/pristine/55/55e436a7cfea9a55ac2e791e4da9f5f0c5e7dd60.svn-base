var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UI_Up_Tab = (function (_super) {
    __extends(UI_Up_Tab, _super);
    function UI_Up_Tab() {
        return _super.call(this) || this;
    }
    Object.defineProperty(UI_Up_Tab.prototype, "skinPath", {
        get: function () {
            return "resource/skins/ui/upgrade/UI_Up_TabSkin.exml";
        },
        enumerable: true,
        configurable: true
    });
    UI_Up_Tab.prototype.onCreate = function () {
        _super.prototype.onCreate.call(this);
        DataManager.inst.upgrade.addDataListener(this.refreshUpgrade, this);
    };
    UI_Up_Tab.prototype.onDestroy = function () {
        _super.prototype.onDestroy.call(this);
    };
    UI_Up_Tab.prototype.refreshUpgrade = function (e) {
        var data = e.data;
        this.upTotalDPS.text = EasyNumber.easyNum(data.totalDPS);
        this.upList.setData(data.roles);
    };
    return UI_Up_Tab;
}(UI_Base_Tab));
__reflect(UI_Up_Tab.prototype, "UI_Up_Tab");
//# sourceMappingURL=UI_Up_Tab.js.map