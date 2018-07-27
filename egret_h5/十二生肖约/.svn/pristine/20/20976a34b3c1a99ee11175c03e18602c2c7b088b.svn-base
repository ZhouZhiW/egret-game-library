class UI_Inventory_Goods extends ImageMaterial {

    public constructor(data: Data_Material) {
        super(data);
        this.once(egret.Event.ADDED_TO_STAGE, this.onCreate, this);
        this.once(egret.Event.REMOVED_FROM_STAGE, this.onDestroy, this);
    }

    private onCreate() {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickIcon, this);
    }

    private onDestroy() {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickIcon, this);
    }

    private onClickIcon(e: TouchEvent) {
        // if (this.getMaterialData().type == DataType_Material.Unread || this.getMaterialData().type == DataType_Material.Unread) {
        //     this.getMaterialData().type;
        //     const d = new UI_Backpack_MailDialog(this.gridData.mailData.emailId);
        //     d.setData(this.gridData.mailData);
        //     d.show();
        // }
        // if (this.getMaterialData().type == DataType_Material.Equip_Luxury_Down || this.getMaterialData().type == DataType_Material.Equip_Luxury_Up
        //     || this.getMaterialData().type == DataType_Material.Equip_Normal_Down || this.getMaterialData().type == DataType_Material.Equip_Normal_Up) {
        //     const d = new UI_Backpack_EquipDialog(this.gridData.equipData.clotheId, this.gridData.equipData.btnStatus);
        //     d.setData(this.gridData.equipData);
        //     d.show();
        // }
    }

    private test(){
    }
}