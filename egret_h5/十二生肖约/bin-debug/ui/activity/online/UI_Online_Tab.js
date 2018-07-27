var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UI_Online_Tab = (function (_super) {
    __extends(UI_Online_Tab, _super);
    function UI_Online_Tab() {
        var _this = _super.call(this) || this;
        NetEventManager.inst.pushOnline(16, -1);
        return _this;
    }
    UI_Online_Tab.prototype.onCreate = function () {
        _super.prototype.onCreate.call(this);
        DataManager.inst.online.addDataListener(this.refreshOnline, this);
    };
    UI_Online_Tab.prototype.onDestroy = function () {
        DataManager.inst.online.removeDataListener(this.refreshOnline, this);
        _super.prototype.onDestroy.call(this);
    };
    UI_Online_Tab.prototype.refreshOnline = function (e) {
        var data = e.data;
        this.onlineList.setData(data.onlineArr);
    };
    Object.defineProperty(UI_Online_Tab.prototype, "skinPath", {
        get: function () {
            return "resource/skins/ui/activity/online/UI_Online_TabSkin.exml";
        },
        enumerable: true,
        configurable: true
    });
    return UI_Online_Tab;
}(UI_Base_Activity));
__reflect(UI_Online_Tab.prototype, "UI_Online_Tab");
//# sourceMappingURL=UI_Online_Tab.js.map