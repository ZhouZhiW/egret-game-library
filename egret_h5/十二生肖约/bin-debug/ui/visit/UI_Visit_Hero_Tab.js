var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UI_Visit_Hero_Tab = (function (_super) {
    __extends(UI_Visit_Hero_Tab, _super);
    function UI_Visit_Hero_Tab(v) {
        var _this = _super.call(this) || this;
        NetEventManager.inst.pushHeroTower(v);
        return _this;
    }
    Object.defineProperty(UI_Visit_Hero_Tab.prototype, "skinPath", {
        get: function () {
            return "resource/skins/ui/visit/UI_Visit_Hero_TabSkin.exml";
        },
        enumerable: true,
        configurable: true
    });
    UI_Visit_Hero_Tab.prototype.onCreate = function () {
        _super.prototype.onCreate.call(this);
        DataManager.inst.heroTower.addDataListener(this.refreshHeroTower, this);
    };
    UI_Visit_Hero_Tab.prototype.onDestroy = function () {
        _super.prototype.onDestroy.call(this);
    };
    UI_Visit_Hero_Tab.prototype.refreshHeroTower = function (e) {
        var data = e.data;
        if (data.isValidate) {
            return;
        }
        this.upTotalDPS.text = EasyNumber.easyNum(data.totalDPS);
        this.heroList.setData(data.roles);
    };
    return UI_Visit_Hero_Tab;
}(UI_Base_Tab));
__reflect(UI_Visit_Hero_Tab.prototype, "UI_Visit_Hero_Tab");
//# sourceMappingURL=UI_Visit_Hero_Tab.js.map