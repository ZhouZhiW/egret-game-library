class UI_Up_Item extends eui.ItemRenderer {
    private upItemUpgradedButton: UI_Up_ItemUpgradedButton;
    private upItemIcon: eui.Image;
    private upItemName: eui.Label;
    private upItemLevel: eui.Label;
    private upItemDPS: eui.Label;
    public upItemTDPSLable: eui.Label;
    public upItemTDPS: eui.Label;
    private upItemSkillGroup: eui.Group;
    private itemData: Data_UpgradeRole;
    private upItemSex: eui.Image;


    public constructor() {
        super();
        this.skinName = "resource/skins/ui/upgrade/UI_Up_ItemSkin.exml";
    }



    protected dataChanged(): void {
        this.itemData = <Data_UpgradeRole>this.data;


        if (this.itemData.isPlayer) {
            this.upItemIcon.source = this.getPlayerAvatarPath(this.itemData.type);
            this.upItemName.text = Utils.getHoroscopeName(this.itemData.type);
        } else {
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
            for (let i = 0; i < this.itemData.skillData.length; i++) {
                let skill = new UI_Up_ItemSkillButton();
                skill.setData(i, this.itemData.skillData[i].type, this.itemData.skillData[i].status, this.itemData.skillData[i].lockLevel)
                skill.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickSkillButton, this);
                this.upItemSkillGroup.addChild(skill);
            }
        }
    }
    //skillID: number, source: string
    public clickSkillButton(e: egret.TouchEvent) {
        const skillBtn = e.currentTarget;
        let dialog = new UI_UP_SkillDialog();
        dialog.setInfo(skillBtn.iconResource, this.itemData.skillData[skillBtn.skillID].type, this.itemData.skillData[skillBtn.skillID].value);
        dialog.show();
    }



    private getPlayerAvatarPath(type: number): string {
        let path: string;
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
    }




    private getHeroAvatarPath(type: number): string {
        let path: string;
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
    }

}