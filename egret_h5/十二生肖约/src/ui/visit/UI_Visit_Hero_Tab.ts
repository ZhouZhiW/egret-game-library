class UI_Visit_Hero_Tab extends UI_Base_Tab {
    private upTotalDPS: eui.Label;
    private heroList: UI_Visit_Hero_List;

    constructor(v: string) {
        super();
        NetEventManager.inst.pushHeroTower(v);
    }

    protected get skinPath(): String {
        return "resource/skins/ui/visit/UI_Visit_Hero_TabSkin.exml";
    }

    public onCreate() {
        super.onCreate();
        DataManager.inst.heroTower.addDataListener(this.refreshHeroTower, this)
    }

    public onDestroy() {
        super.onDestroy();
    }

    private refreshHeroTower(e: DataEvent) {
        const data: Data_HeroTower = e.data;
        if (data.isValidate) {
            return;
        }
        this.upTotalDPS.text = EasyNumber.easyNum(data.totalDPS);
        this.heroList.setData(data.roles);
    }

}