var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UI_Visit_Pedestal_Tab = (function (_super) {
    __extends(UI_Visit_Pedestal_Tab, _super);
    function UI_Visit_Pedestal_Tab() {
        return _super.call(this) || this;
    }
    UI_Visit_Pedestal_Tab.prototype.onCreate = function () {
        _super.prototype.onCreate.call(this);
        DataManager.inst.pedestal.addDataListener(this.refreshPedestal, this);
    };
    UI_Visit_Pedestal_Tab.prototype.onDestroy = function () {
        DataManager.inst.pedestal.removeDataListener(this.refreshPedestal, this);
        _super.prototype.onDestroy.call(this);
    };
    UI_Visit_Pedestal_Tab.prototype.refreshPedestal = function (e) {
        var data = e.data;
        this.fragmentNum.text = EasyNumber.easyNum(data.fragmentNum);
        // this.damageUp.text = data.damageUpPercent;
        // this.essenceUp.text = data.goldPercent;
        // this.gemUp.text = data.goldPercent;
        // this.goldUp.text = data.goldPercent;
        // this.fragmentUp.text = data.goldPercent;
        this.lvTx.text = "LV." + data.baseLevel;
    };
    Object.defineProperty(UI_Visit_Pedestal_Tab.prototype, "skinPath", {
        get: function () {
            return "resource/skins/ui/visit/UI_Visit_Pedestal_TabSkin.exml";
        },
        enumerable: true,
        configurable: true
    });
    return UI_Visit_Pedestal_Tab;
}(BaseComponent));
__reflect(UI_Visit_Pedestal_Tab.prototype, "UI_Visit_Pedestal_Tab");
//# sourceMappingURL=UI_Visit_Pedestal_Tab.js.map