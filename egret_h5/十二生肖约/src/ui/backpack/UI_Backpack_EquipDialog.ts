class UI_Backpack_EquipDialog extends CustomDialog {
    private titleTx: eui.Label;
    private description: eui.Group;
    private timeTx: eui.Label;
    private bpID: number;
    private icon: eui.Image;

    constructor(id: number, s: number) {
        super();
        this.bpID = id;
        NetEventManager.inst.pushEquip(id, 0);
        if (s == 0) {
            this.addButton("装备", true, this.clickedEquipBtn, this);
        }
        if (s == 1) {
            this.addButton("卸下", true, this.clickedUnloadBtn, this);
        }
    }

    public onCreate() {
    }

    public onDestroy() {
    }

    public setData(data: Data_BaseMaterial) {
        this.titleTx.text = data.getName();
        this.timeTx.text = data.getExpireTime();
        this.icon.source = this.setIcon(data.getLevel());
        this.description.removeChildren();
        for (let i = 0; i < data.getEquipRewards.length; i++) {
            this.description.addChild(new UI_Backpack_Description(data.getEquipRewards[i].rewardName, data.getEquipRewards[i].rewardValue));
        }
    }

    private setIcon(level: number) {
        let path;
        switch (level) {
            case 10:
                path = "resource/res/itemicon/item_icon_equip_nomal_up.png";
                break;
            case 20:
                path = "resource/res/itemicon/item_icon_equip_luxury_up.png";
                break;
        }
        return path;
    }

    private clickedEquipBtn(d: CustomDialog) {
        NetEventManager.inst.pushEquip(this.bpID, 1);
        this.close();
    }

    private clickedUnloadBtn(d: CustomDialog) {
        NetEventManager.inst.pushEquip(this.bpID, 2);
        this.close();
    }

    protected get style(): number {
        return 0;
    }

    protected get skinPath(): string {
        return "resource/skins/ui/backpack/UI_Backpack_EquipDialogSkin.exml";
    }
}