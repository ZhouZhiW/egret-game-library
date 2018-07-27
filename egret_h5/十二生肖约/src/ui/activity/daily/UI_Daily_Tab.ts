class UI_Daily_Tab extends UI_Base_Activity {
    private dailyList: UI_Daily_List;

    constructor() {
        super();
        NetEventManager.inst.pushDaily(15, -1);
    }

    public onCreate() {
        super.onCreate();
        DataManager.inst.daily.addDataListener(this.refreshDaily, this);
    }

    public onDestroy() {
        DataManager.inst.daily.removeDataListener(this.refreshDaily, this);
        super.onDestroy();
    }

    private refreshDaily(e: DataEvent) {
        const data: Data_Daily = e.data;
        this.dailyList.setData(data.dailyArr);
    }

    protected get skinPath(): string {
        return "resource/skins/ui/activity/daily/UI_Daily_TabSkin.exml";
    }
}