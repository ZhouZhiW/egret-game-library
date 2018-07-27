class UI_Up_Tab extends UI_Base_Tab {
    private upTotalDPS: eui.Label;
    private upList: UI_Up_List;
    constructor() {
        super();
    }

    protected get skinPath(): String {
        return "resource/skins/ui/upgrade/UI_Up_TabSkin.exml";
    }

    public onCreate() {
        super.onCreate();
        DataManager.inst.upgrade.addDataListener(this.refreshUpgrade, this)
    }

    public onDestroy() {
        super.onDestroy();
    }

    private refreshUpgrade(e: DataEvent) {
        let data: Data_Upgrade = e.data;
        this.upTotalDPS.text = EasyNumber.easyNum(data.totalDPS);
        this.upList.setData(data.roles);
    }



}