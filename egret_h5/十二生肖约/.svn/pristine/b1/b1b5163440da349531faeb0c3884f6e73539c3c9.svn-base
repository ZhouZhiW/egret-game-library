var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UI_Achieved_Tab = (function (_super) {
    __extends(UI_Achieved_Tab, _super);
    function UI_Achieved_Tab() {
        var _this = _super.call(this) || this;
        NetEventManager.inst.pushAchieved();
        return _this;
    }
    Object.defineProperty(UI_Achieved_Tab.prototype, "skinPath", {
        get: function () {
            return "resource/skins/ui/achieved/UI_Achieved_TabSkin.exml";
        },
        enumerable: true,
        configurable: true
    });
    UI_Achieved_Tab.prototype.onCreate = function () {
        _super.prototype.onCreate.call(this);
        DataManager.inst.achieved.addDataListener(this.refreshAchieved, this);
        // this.test();
    };
    UI_Achieved_Tab.prototype.refreshAchieved = function (e) {
        var data = e.data;
        this.dps.text = data.acTotalDPS;
        this.acList.setData(data.acItems);
        // console.log("领取技能" + data.acItems[9].acTarget);
    };
    UI_Achieved_Tab.prototype.onDestroy = function () {
        _super.prototype.onDestroy.call(this);
    };
    return UI_Achieved_Tab;
}(BaseComponent));
__reflect(UI_Achieved_Tab.prototype, "UI_Achieved_Tab");
//# sourceMappingURL=UI_Achieved_Tab.js.map