class UI_Rank_Main_Tab extends UI_Base_Tab {

    private rankBtn: eui.ToggleButton;
    private friendsBtn: eui.ToggleButton;
    private currtenSubTab;
    private rankHelp: eui.Button;

    constructor(index: number = 0) {
        super();
        this.setTab(index);
    }

    protected get skinPath(): String {
        return "resource/skins/ui/rank/UI_Rank_Main_TabSkin.exml";
    }

    public onCreate() {
        super.onCreate();
        this.rankBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickedTitleBtn, this);
        this.friendsBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickedTitleBtn, this);
        this.rankHelp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickedHelpBtn, this);

    }

    public onDestroy() {
        this.rankBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickedTitleBtn, this);
        this.friendsBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickedTitleBtn, this);
        this.rankHelp.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickedHelpBtn, this);
        super.onDestroy();
    }


    private setTab(index: number) {
        let subTab = null;
        this.rankBtn.selected = index == 0;
        this.friendsBtn.selected = index == 1;
        switch (index) {
            case 0:
                if (this.currtenSubTab instanceof UI_Rank_Rank_Tab) {
                    return;
                }
                subTab = new UI_Rank_Rank_Tab();
                break;
            case 1:
                if (this.currtenSubTab instanceof UI_Rank_Friends_Tab) {
                    return;
                }
                subTab = new UI_Rank_Friends_Tab();
                break;
        }

        if (this.currtenSubTab != null) {
            this.removeChild(this.currtenSubTab);
        }
        this.currtenSubTab = subTab;
        this.addChild(this.currtenSubTab);
        this.currtenSubTab.x = 24;
        this.currtenSubTab.y = 142;
    }

    private clickedTitleBtn(e: egret.TouchEvent) {
        const btn: eui.ToggleButton = e.currentTarget;
        switch (btn) {
            case this.rankBtn:
                this.setTab(0);
                break;
            case this.friendsBtn:
                this.setTab(1);
                break;
        }
    }



    private clickedHelpBtn(e: egret.TouchEvent) {
        const helpDialog = new LargeImageDialog("resource/res/ui/rank/rk_tab_help_info.png ");
        helpDialog.show();
    }

}