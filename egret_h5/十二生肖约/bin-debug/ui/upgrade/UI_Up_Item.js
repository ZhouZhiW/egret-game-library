var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UI_Up_Item = (function (_super) {
    __extends(UI_Up_Item, _super);
    function UI_Up_Item() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/skins/ui/upgrade/UI_Up_ItemSkin.exml";
        return _this;
    }
    UI_Up_Item.prototype.dataChanged = function () {
        this.itemData = this.data;
        if (this.itemData.isPlayer) {
            this.upItemIcon.source = this.getPlayerAvatarPath(this.itemData.type);
            this.upItemName.text = Utils.getHoroscopeName(this.itemData.type);
        }
        else {
            this.upItemIcon.source = this.getHeroAvatarPath(this.itemData.type);
            this.upItemName.text = Utils.getHeroName(this.itemData.type);
        }
        this.upItemLevel.text = "Lv. " + this.itemData.level;
        this.upItemDPS.text = (this.itemData.isPlayer ? "点击伤害:" : "秒伤:") + EasyNumber.easyNum(this.itemData.DPS);
        this.upItemTDPSLable.visible = !this.itemData.isPlayer;
        this.upItemTDPS.visible = !this.itemData.isPlayer;
        this.upItemSex.visible = this.itemData.isPlayer;
        this.upItemSex.source = Utils.getSexIconPath(this.itemData.sex);
        this.upItemTDPS.text = Utils.numberToPre(this.itemData.DPSProportion);
        this.upItemUpgradedButton.setData(this.itemIndex, this.itemData.upgradedType, this.itemData.upgradedMoney, this.itemData.upgradeDiamond);
        this.upItemSkillGroup.removeChildren();
        if (this.itemData.skillData != null) {
            for (var i = 0; i < this.itemData.skillData.length; i++) {
                var skill = new UI_Up_ItemSkillButton();
                skill.setData(i, this.itemData.skillData[i].type, this.itemData.skillData[i].status, this.itemData.skillData[i].lockLevel);
                skill.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickSkillButton, this);
                this.upItemSkillGroup.addChild(skill);
            }
        }
    };
    //skillID: number, source: string
    UI_Up_Item.prototype.clickSkillButton = function (e) {
        var skillBtn = e.currentTarget;
        var dialog = new UI_UP_SkillDialog();
        dialog.setInfo(skillBtn.iconResource, this.itemData.skillData[skillBtn.skillID].type, this.itemData.skillData[skillBtn.skillID].value);
        dialog.show();
    };
    UI_Up_Item.prototype.getPlayerAvatarPath = function (type) {
        var path;
        switch (type) {
            case DataType_PlayerIndex.Def:
                path = "resource/res/ui/upgrade/avatar/avatar_p_def.png";
                break;
            case DataType_PlayerIndex.Ari:
                path = "resource/res/ui/upgrade/avatar/avatar_p_ari.png";
                break;
            case DataType_PlayerIndex.Tau:
                path = "resource/res/ui/upgrade/avatar/avatar_p_tau.png";
                break;
            case DataType_PlayerIndex.Gem:
                path = "resource/res/ui/upgrade/avatar/avatar_p_gem.png";
                break;
            case DataType_PlayerIndex.Cnc:
                path = "resource/res/ui/upgrade/avatar/avatar_p_cnc.png";
                break;
            case DataType_PlayerIndex.Leo:
                path = "resource/res/ui/upgrade/avatar/avatar_p_leo.png";
                break;
            case DataType_PlayerIndex.Vir:
                path = "resource/res/ui/upgrade/avatar/avatar_p_vir.png";
                break;
            case DataType_PlayerIndex.Lib:
                path = "resource/res/ui/upgrade/avatar/avatar_p_lib.png";
                break;
            case DataType_PlayerIndex.Sco:
                path = "resource/res/ui/upgrade/avatar/avatar_p_sco.png";
                break;
            case DataType_PlayerIndex.Sgr:
                path = "resource/res/ui/upgrade/avatar/avatar_p_sgr.png";
                break;
            case DataType_PlayerIndex.Cap:
                path = "resource/res/ui/upgrade/avatar/avatar_p_cap.png";
                break;
            case DataType_PlayerIndex.Agr:
                path = "resource/res/ui/upgrade/avatar/avatar_p_agr.png";
                break;
            case DataType_PlayerIndex.Psc:
                path = "resource/res/ui/upgrade/avatar/avatar_p_psc.png";
                break;
        }
        return path;
    };
    UI_Up_Item.prototype.getHeroAvatarPath = function (type) {
        var path;
        switch (type) {
            case DataType_HeroIndex.Def:
                path = "resource/res/ui/upgrade/avatar/avatar_h_pandora.png";
                break;
            case DataType_HeroIndex.Pandora:
                path = "resource/res/ui/upgrade/avatar/avatar_h_pandora.png";
                break;
            case DataType_HeroIndex.Poseidon:
                path = "resource/res/ui/upgrade/avatar/avatar_h_poseidon.png";
                break;
            case DataType_HeroIndex.Athena:
                path = "resource/res/ui/upgrade/avatar/avatar_h_athena.png";
                break;
            case DataType_HeroIndex.Handes:
                path = "resource/res/ui/upgrade/avatar/avatar_h_handes.png";
                break;
            case DataType_HeroIndex.Hera:
                path = "resource/res/ui/upgrade/avatar/avatar_h_hera.png";
                break;
            case DataType_HeroIndex.Zeus:
                path = "resource/res/ui/upgrade/avatar/avatar_h_zeus.png";
                break;
        }
        return path;
    };
    return UI_Up_Item;
}(eui.ItemRenderer));
__reflect(UI_Up_Item.prototype, "UI_Up_Item");
//# sourceMappingURL=UI_Up_Item.js.map