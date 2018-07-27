class UI_Achieved_Tab extends BaseComponent {
    private acList: UI_Achieved_List;
    private dps: eui.Label;

    constructor() {
        super();
        NetEventManager.inst.pushAchieved();
    }

    protected get skinPath(): String {
        return "resource/skins/ui/achieved/UI_Achieved_TabSkin.exml";
    }

    public onCreate() {
        super.onCreate();
        DataManager.inst.achieved.addDataListener(this.refreshAchieved, this);
        // this.test();
    }

    private refreshAchieved(e: DataEvent) {
        const data: Data_Achieved = e.data;
        this.dps.text = data.acTotalDPS;
        this.acList.setData(data.acItems);
        // console.log("领取技能" + data.acItems[9].acTarget);
    }

    public onDestroy() {
        super.onDestroy();
    }

    // private test() {
    //     const data = new Data_Achieved();
    //     this.dps.text = data.acTotalDPS;
    //     this.acList.setData(data.acItems);
    // }

}