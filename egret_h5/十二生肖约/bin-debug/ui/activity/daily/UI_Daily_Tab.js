var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UI_Daily_Tab = (function (_super) {
    __extends(UI_Daily_Tab, _super);
    function UI_Daily_Tab() {
        var _this = _super.call(this) || this;
        NetEventManager.inst.pushDaily(15, -1);
        return _this;
    }
    UI_Daily_Tab.prototype.onCreate = function () {
        _super.prototype.onCreate.call(this);
        DataManager.inst.daily.addDataListener(this.refreshDaily, this);
    };
    UI_Daily_Tab.prototype.onDestroy = function () {
        DataManager.inst.daily.removeDataListener(this.refreshDaily, this);
        _super.prototype.onDestroy.call(this);
    };
    UI_Daily_Tab.prototype.refreshDaily = function (e) {
        var data = e.data;
        this.dailyList.setData(data.dailyArr);
    };
    Object.defineProperty(UI_Daily_Tab.prototype, "skinPath", {
        get: function () {
            return "resource/skins/ui/activity/daily/UI_Daily_TabSkin.exml";
        },
        enumerable: true,
        configurable: true
    });
    return UI_Daily_Tab;
}(UI_Base_Activity));
__reflect(UI_Daily_Tab.prototype, "UI_Daily_Tab");
//# sourceMappingURL=UI_Daily_Tab.js.map