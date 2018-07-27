class UI_Online_Tab extends UI_Base_Activity {
    private onlineList: UI_Online_List;

    constructor() {
        super();
        NetEventManager.inst.pushOnline(16, -1);
    }

    public onCreate() {
        super.onCreate();
        DataManager.inst.online.addDataListener(this.refreshOnline, this);
    }

    public onDestroy() {
        DataManager.inst.online.removeDataListener(this.refreshOnline, this);
        super.onDestroy();
    }

    private refreshOnline(e: DataEvent) {
        const data: Data_Online = e.data;
        this.onlineList.setData(data.onlineArr);
    }

    protected get skinPath(): string {
        return "resource/skins/ui/activity/online/UI_Online_TabSkin.exml";
    }
}