var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UI_Visit_Stardust_Tab = (function (_super) {
    __extends(UI_Visit_Stardust_Tab, _super);
    function UI_Visit_Stardust_Tab() {
        return _super.call(this) || this;
    }
    UI_Visit_Stardust_Tab.prototype.onCreate = function () {
        _super.prototype.onCreate.call(this);
        DataManager.inst.gemPanel.addDataListener(this.refreshGem, this);
    };
    UI_Visit_Stardust_Tab.prototype.onDestroy = function () {
        DataManager.inst.gemPanel.removeDataListener(this.refreshGem, this);
        _super.prototype.onDestroy.call(this);
    };
    UI_Visit_Stardust_Tab.prototype.refreshGem = function (e) {
        var data = e.data;
        this.gemPlayerAtt.text = Utils.numberToPre(data.gemPlayerAtt);
        this.gemPlayerCri.text = Utils.numberToPre(data.gemPlayerCri);
        this.gemPlayerCsd.text = Utils.numberToPre(data.gemPlayerCsd);
        this.gemHerosAtt.text = Utils.numberToPre(data.gemHerosAtt);
        this.gemMoney.text = Utils.numberToPre(data.gemMoney);
        // this.gemTabGrooveGroup.setData(data.grooveGroupDatas)
    };
    Object.defineProperty(UI_Visit_Stardust_Tab.prototype, "skinPath", {
        get: function () {
            return "resource/skins/ui/visit/UI_Visit_Stardust_TabSkin.exml";
        },
        enumerable: true,
        configurable: true
    });
    return UI_Visit_Stardust_Tab;
}(BaseComponent));
__reflect(UI_Visit_Stardust_Tab.prototype, "UI_Visit_Stardust_Tab");
//# sourceMappingURL=UI_Visit_Stardust_Tab.js.map