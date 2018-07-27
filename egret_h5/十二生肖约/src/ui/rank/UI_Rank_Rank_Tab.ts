class UI_Rank_Rank_Tab extends BaseComponent {
    private static inst: UI_Rank_Rank_Tab;
    private rankList: UI_Rank_Rank_List;
    private userRank: eui.Label;
    private currentSelectIndex: number;
    private horoscopeAll: eui.ToggleButton;
    private horoscopeGroup: eui.Group;

    private data: Data_Rank;


    constructor() {
        super();
        this.currentSelectIndex = -1;
    }


    public onCreate() {
        super.onCreate();
        UI_Rank_Rank_Tab.inst = this;
        this.horoscopeAll.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickedTitleBtn, this);
        for (let i = 0; i < this.horoscopeGroup.numChildren; i++) {
            const item = <eui.ToggleButton>this.horoscopeGroup.getChildAt(i);
            item.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickedTitleBtn, this);
        }
        DataManager.inst.rank.addDataListener(this.refresRank, this);
        this.setHoroscopeIndex(0);
    }

    public static refresh() {
        if (UI_Rank_Rank_Tab.inst != null) {
            if (UI_Rank_Rank_Tab.inst.currentSelectIndex) {
                NetEventManager.inst.pushRank(UI_Rank_Rank_Tab.inst.currentSelectIndex);
            }
        }
    }

    public onDestroy() {
        UI_Rank_Rank_Tab.inst = null;
         for (let i = 0; i < this.horoscopeGroup.numChildren; i++) {
            const item = <eui.ToggleButton>this.horoscopeGroup.getChildAt(i);
            item.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickedTitleBtn, this);
        }
        DataManager.inst.rank.removeDataListener(this.refresRank, this);
        super.onDestroy();
    }

    private refresRank(e: DataEvent) {
        this.data = e.data;
        if (this.data.rank == "0") {
            this.userRank.text = "暂无";
        } else {
            this.userRank.text = this.data.rank;
        }
        this.rankList.setDatas(this.data.rankUser);

    }



    protected get skinPath(): String {
        return "resource/skins/ui/rank/UI_Rank_Rank_TabSkin.exml";
    }


    private setHoroscopeIndex(index: number) {
        if (this.currentSelectIndex == index) {
            return;
        }
        this.currentSelectIndex = index;
        this.horoscopeAll.selected = this.currentSelectIndex == 0;
        for (let i = 0; i < this.horoscopeGroup.numChildren; i++) {
            const item = <eui.ToggleButton>this.horoscopeGroup.getChildAt(i);
            item.selected = i == this.currentSelectIndex - 1;
        }
        NetEventManager.inst.pushRank(this.currentSelectIndex);
    }

    private clickedTitleBtn(e: egret.TouchEvent) {
        const btn: eui.ToggleButton = e.currentTarget;
        btn.selected = true;
        this.setHoroscopeIndex(btn == this.horoscopeAll ? 0 : (this.horoscopeGroup.getChildIndex(btn) + 1));
    }


}