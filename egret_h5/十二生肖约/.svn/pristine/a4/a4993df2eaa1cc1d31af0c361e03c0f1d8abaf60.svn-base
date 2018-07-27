class UI_Home_Offline_Dialog extends CustomDialog {
    private offlineTime: eui.Label;
    private materialGroup: eui.Group;
    private offlineInfo: eui.Label;

    constructor(data: Data_Offline) {
        super();
        this.offlineTime.text = Utils.formatLongTime(data.offlineTime);
        for (let i = 0; i < data.offlineMaterials.length; i++) {
            const material = new UI_Home_offline_Material(data.offlineMaterials[i]);
            this.materialGroup.addChild(material);
            this.offlineInfo.text = this.getofflineInfo();
        }

    }

    private getofflineInfo() {
        switch (DataManager.inst.userInfo.vipType) {
            case 0:
                return "当前用户最多累计6小时离线奖励\n月卡或终身卡可增加离线收益";
            case 1:
                return "月卡用户最多累计9小时离线奖励\n终身卡可增加离线收益";
            case 2:
                return "终身卡用户最多累计12小时离线收益";
        }

    }

    protected get style(): number {
        return 1;
    }

    protected get skinPath(): String {
        return "resource/skins/ui/home/UI_Home_Offline_DialogSkin.exml";
    }

}

class UI_Home_offline_Material extends BaseComponent {

    private subscriptMaterial: SubscriptMaterial;
    private materialName: eui.Label;

    constructor(data: Data_Material) {
        super();
        this.subscriptMaterial.setMaterialData(data);
        this.materialName.text = data.name;
    }

    protected get skinPath(): String {
        return "resource/skins/ui/home/UI_Home_offline_MaterialSkin.exml";
    }

    protected onCreate() {


    }

    protected onDestroy() {

    }


}