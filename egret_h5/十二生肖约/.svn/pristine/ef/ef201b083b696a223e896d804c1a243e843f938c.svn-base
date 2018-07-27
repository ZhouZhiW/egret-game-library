class UI_Backpack_Grid extends BaseMaterial {
    constructor() {
        super();
    }

    protected onCreate() {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClicked, this);
    }

    protected onDestroy() {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClicked, this);
    }

    private onClicked(e: egret.TouchEvent) {
        if (this.getMaterialData().getType() == DataType_Material.Mail) {
            const d = new UI_Backpack_MailDialog(this.getMaterialData().getMailId());
            d.setData(this.getMaterialData());
            d.show();
        }
        if (this.getMaterialData().getType() == DataType_Material.Equip) {
            const d = new UI_Backpack_EquipDialog(this.getMaterialData().getClotheId(), this.getMaterialData().getEquipState());
            d.setData(this.getMaterialData());
            d.show();
        }
    }

}