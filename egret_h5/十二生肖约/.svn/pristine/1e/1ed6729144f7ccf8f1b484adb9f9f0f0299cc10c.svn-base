class UI_Mission_Main_Tab extends UI_Base_Tab {
    private missionBtn: eui.ToggleButton;
    private achievedBtn: eui.ToggleButton;
    private missionTab: UI_Mission_Tab;
    private achievedTab: UI_Achieved_Tab;
    private currtenSubTab;

    constructor() {
        super();
    }

    protected get skinPath(): string {
        return "resource/skins/ui/mission/UI_Mission_Main_TabSkin.exml";
    }

    public onCreate() {
        super.onCreate();
        this.missionBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickedTitleBtn, this);
        this.achievedBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickedTitleBtn, this);
        this.missionBtn.selected = true;
        this.setTab(0);
    }

    public onDestroy() {
        this.missionBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickedTitleBtn, this);
        this.achievedBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickedTitleBtn, this);
        super.onDestroy();
    }

    private setTab(index: number) {
        let subTab = null;
        this.missionBtn.selected = index == 0;
        this.achievedBtn.selected = index == 1;
        switch (index) {
            case 0:
                if (this.currtenSubTab instanceof UI_Mission_Tab) {
                    return;
                }
                subTab = new UI_Mission_Tab();
                break;
            case 1:
                if (this.currtenSubTab instanceof UI_Achieved_Tab) {
                    return;
                }
                subTab = new UI_Achieved_Tab();
                break;
        }
        if (this.currtenSubTab != null) {
            this.removeChild(this.currtenSubTab);
        }
        this.currtenSubTab = subTab;
        this.addChild(this.currtenSubTab);
        this.currtenSubTab.x = 28;
        this.currtenSubTab.y = 152;
    }


    private clickedTitleBtn(e: egret.TouchEvent) {
        const btn: eui.ToggleButton = e.currentTarget;
        if (!btn.selected) {
            btn.selected = true;
            return;
        }
        switch (btn) {
            case this.missionBtn:
                this.setTab(0);
                break;
            case this.achievedBtn:
                this.setTab(1);
                break;

        }
    }

    private setToggleBtn(index: number) {
        switch (index) {
            case 0:
                this.missionBtn.selected = true;
                this.achievedBtn.selected = false;
                break;
            case 1:
                this.missionBtn.selected = false;
                this.achievedBtn.selected = true;
                break;
        }
    }
}