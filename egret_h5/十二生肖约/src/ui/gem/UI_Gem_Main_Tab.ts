class UI_Gem_Main_Tab extends UI_Base_Tab {
    public tabCloseBtn: eui.Button;
    public subTabArea: eui.Image;
    public subBtn1: eui.ToggleButton;
    public subBtn2: eui.ToggleButton;
    private currtenSubTab;
    public titleHelp: eui.Button;


    private gemLotteryDiamond: number;


    constructor() {
        super();
    }

    protected get skinPath(): String {
        return "resource/skins/ui/gem/UI_Gem_Main_TabSkin.exml";
    }

    public onCreate() {
        super.onCreate();
        this.subBtn1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickedTitleBtn, this);
        this.subBtn2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickedTitleBtn, this);
        this.titleHelp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickedHelpBtn, this);
        this.setTab(0);
    }

    public onDestroy() {
        this.subBtn1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickedTitleBtn, this);
        this.subBtn2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickedTitleBtn, this);
        this.titleHelp.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickedHelpBtn, this);
        super.onDestroy();
    }


    private setTab(index: number) {
        let subTab = null;
        this.subBtn1.selected = index == 0;
        this.subBtn2.selected = index == 1;
        switch (index) {
            case 0:
                if (this.currtenSubTab instanceof UI_Gem_Tab) {
                    return;
                }
                subTab = new UI_Gem_Tab();
                break;
            case 1:
                if (this.currtenSubTab instanceof UI_Gem_Pedestal_Tab) {
                    return;
                }
                subTab = new UI_Gem_Pedestal_Tab();
                break;
        }
        if (this.currtenSubTab != null) {
            this.removeChild(this.currtenSubTab);
        }
        this.currtenSubTab = subTab;
        this.addChild(this.currtenSubTab);
        this.currtenSubTab.x = this.subTabArea.x;
        this.currtenSubTab.y = this.subTabArea.y;
    }

    private clickedTitleBtn(e: egret.TouchEvent) {
        const btn: eui.ToggleButton = e.currentTarget;
        if (!btn.selected) {
            btn.selected = true;
            return;
        }
        switch (btn) {
            case this.subBtn1:
                this.setTab(0);
                break;
            case this.subBtn2:
                this.setTab(1);
                break;
        }
    }


    private clickedHelpBtn(e: egret.TouchEvent) {
        const helpDialog = new LargeImageDialog("resource/res/ui/gem/gs_tab_help_info.png ");
        helpDialog.setScroller(true);
        helpDialog.show();
    }


}