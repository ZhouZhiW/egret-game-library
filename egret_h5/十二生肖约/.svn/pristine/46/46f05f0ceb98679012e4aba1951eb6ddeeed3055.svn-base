class UI_Visit_Hero_Item extends eui.ItemRenderer {
    private upItemIcon: eui.Image;
    private upItemName: eui.Label;
    private upItemLevel: eui.Label;
    private upItemDPS: eui.Label;
    private upItemTotleDPSGroup: eui.Group;
    private upItemTotleDPS: eui.Label;
    private upItemSkillGroup: eui.Group;
    private itemData: Data_HeroTowerRole;
    private upItemSex: eui.Image;

    public constructor() {
        super();
        this.skinName = "resource/skins/ui/visit/UI_Visit_Hero_ItemSkin.exml";
        this.once(eui.UIEvent.ADDED_TO_STAGE, this.init, this);
    }
    public init() {
    }

    protected dataChanged(): void {
        this.itemData = <Data_HeroTowerRole>this.data;
        this.upItemIcon.source = this.getIconPath(this.itemData.type);
        this.upItemName.text = this.getName(this.itemData.type);
        // this.upItemName.textColor = this.itemData.isPlayer ? 0xF58021 : 0x98614D;
        this.upItemLevel.text = "Lv. " + this.itemData.level;
        // this.upItemLevel.textColor = this.itemData.isPlayer ? 0x8E210D : 0x448E0D;
        this.upItemDPS.text = (this.itemData.isPlayer ? "点击伤害：" : "秒伤：") + EasyNumber.easyNum(this.itemData.DPS);
        this.upItemTotleDPSGroup.visible = !this.itemData.isPlayer;
        this.upItemSex.visible = this.itemData.isPlayer;
        this.upItemTotleDPS.text = Utils.numberToPre(this.itemData.DPSProportion);
        this.upItemSkillGroup.removeChildren();
    }
    public getIconPath(type: number): string {
        let path: string;
        switch (type) {
            case DataType_PlayerIndex.Def:
                path = "resource/res/ui/upgrade/up_item_def.png";
                break;
            case DataType_PlayerIndex.Ari:
                path = "resource/res/ui/upgrade/up_item_ari.png";
                break;
            case DataType_PlayerIndex.Tau:
                path = "resource/res/ui/upgrade/up_item_tau.png";
                break;
            case DataType_PlayerIndex.Gem:
                path = "resource/res/ui/upgrade/up_item_gem.png";
                break;
            case DataType_PlayerIndex.Cnc:
                path = "resource/res/ui/upgrade/up_item_cnc.png";
                break;
            case DataType_PlayerIndex.Leo:
                path = "resource/res/ui/upgrade/up_item_leo.png";
                break;
            case DataType_PlayerIndex.Vir:
                path = "resource/res/ui/upgrade/up_item_vir.png";
                break;
            case DataType_PlayerIndex.Lib:
                path = "resource/res/ui/upgrade/up_item_lib.png";
                break;
            case DataType_PlayerIndex.Sco:
                path = "resource/res/ui/upgrade/up_item_sco.png";
                break;
            case DataType_PlayerIndex.Sgr:
                path = "resource/res/ui/upgrade/up_item_sgr.png";
                break;
            case DataType_PlayerIndex.Cap:
                path = "resource/res/ui/upgrade/up_item_cap.png";
                break;
            case DataType_PlayerIndex.Agr:
                path = "resource/res/ui/upgrade/up_item_agr.png";
                break;
            case DataType_PlayerIndex.Psc:
                path = "resource/res/ui/upgrade/up_item_psc.png";
                break;
        }
        return path;
    }

    public getName(type: number): string {
        let name: string;
        switch (type) {
            case DataType_PlayerIndex.Def:
                name = "小虾米";
                break;
            case DataType_PlayerIndex.Ari:
                name = "白羊座";
                break;
            case DataType_PlayerIndex.Tau:
                name = "金牛座";
                break;
            case DataType_PlayerIndex.Gem:
                name = "双子座";
                break;
            case DataType_PlayerIndex.Cnc:
                name = "巨蟹座";
                break;
            case DataType_PlayerIndex.Leo:
                name = "狮子座";
                break;
            case DataType_PlayerIndex.Vir:
                name = "处女座";
                break;
            case DataType_PlayerIndex.Lib:
                name = "天秤座";
                break;
            case DataType_PlayerIndex.Sco:
                name = "天蝎座";
                break;
            case DataType_PlayerIndex.Sgr:
                name = "射手座";
                break;
            case DataType_PlayerIndex.Cap:
                name = "摩羯座";
                break;
            case DataType_PlayerIndex.Agr:
                name = "水瓶座";
                break;
            case DataType_PlayerIndex.Psc:
                name = "双鱼座";
                break;
        }
        return name;
    }

}