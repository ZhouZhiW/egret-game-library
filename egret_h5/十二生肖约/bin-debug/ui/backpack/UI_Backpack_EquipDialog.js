var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UI_Backpack_EquipDialog = (function (_super) {
    __extends(UI_Backpack_EquipDialog, _super);
    function UI_Backpack_EquipDialog(id, s) {
        var _this = _super.call(this) || this;
        _this.bpID = id;
        NetEventManager.inst.pushEquip(id, 0);
        if (s == 0) {
            _this.addButton("装备", true, _this.clickedEquipBtn, _this);
        }
        if (s == 1) {
            _this.addButton("卸下", true, _this.clickedUnloadBtn, _this);
        }
        return _this;
    }
    UI_Backpack_EquipDialog.prototype.onCreate = function () {
    };
    UI_Backpack_EquipDialog.prototype.onDestroy = function () {
    };
    UI_Backpack_EquipDialog.prototype.setData = function (data) {
        this.titleTx.text = data.getName();
        this.timeTx.text = data.getExpireTime();
        this.icon.source = this.setIcon(data.getLevel());
        this.description.removeChildren();
        for (var i = 0; i < data.getEquipRewards.length; i++) {
            this.description.addChild(new UI_Backpack_Description(data.getEquipRewards[i].rewardName, data.getEquipRewards[i].rewardValue));
        }
    };
    UI_Backpack_EquipDialog.prototype.setIcon = function (level) {
        var path;
        switch (level) {
            case 10:
                path = "resource/res/itemicon/item_icon_equip_nomal_up.png";
                break;
            case 20:
                path = "resource/res/itemicon/item_icon_equip_luxury_up.png";
                break;
        }
        return path;
    };
    UI_Backpack_EquipDialog.prototype.clickedEquipBtn = function (d) {
        NetEventManager.inst.pushEquip(this.bpID, 1);
        this.close();
    };
    UI_Backpack_EquipDialog.prototype.clickedUnloadBtn = function (d) {
        NetEventManager.inst.pushEquip(this.bpID, 2);
        this.close();
    };
    Object.defineProperty(UI_Backpack_EquipDialog.prototype, "style", {
        get: function () {
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UI_Backpack_EquipDialog.prototype, "skinPath", {
        get: function () {
            return "resource/skins/ui/backpack/UI_Backpack_EquipDialogSkin.exml";
        },
        enumerable: true,
        configurable: true
    });
    return UI_Backpack_EquipDialog;
}(CustomDialog));
__reflect(UI_Backpack_EquipDialog.prototype, "UI_Backpack_EquipDialog");
//# sourceMappingURL=UI_Backpack_EquipDialog.js.map