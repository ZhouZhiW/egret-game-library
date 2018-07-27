class UI_Visit_Stardust_Main_Tab extends UI_Base_Tab {
    private starDust: eui.ToggleButton;
    private pedestal: eui.ToggleButton;
    private totalGroup: eui.Group;
    private starDustTab: UI_Visit_Stardust_Tab;
    private pedestalTab: UI_Visit_Pedestal_Tab;
    private gemHelp: eui.Button;

    constructor() {
        super();
    }

    protected get skinPath(): string {
        return "resource/skins/ui/visit/UI_Visit_Stardust_Main_TabSkin.exml";
    }

    public onCreate() {
        super.onCreate();
        NetEventManager.inst.pushGemPedestalUp(0);

        this.starDust.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickedTitleBtn, this);
        this.pedestal.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickedTitleBtn, this);
        this.starDust.selected = true;
        this.setTab(0);
        this.gemHelp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickedHelpBtn, this);

    }

    public onDestroy() {
        this.starDust.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickedTitleBtn, this);
        this.pedestal.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickedTitleBtn, this);
        this.gemHelp.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickedHelpBtn, this);

        super.onDestroy();
    }

    private setTab(index: number) {
        switch (index) {
            case 0:
                if (this.starDustTab == null) {
                    this.starDustTab = new UI_Visit_Stardust_Tab();
                }
                if (this.pedestalTab != null && this.totalGroup.getChildIndex(this.pedestalTab) > -1) {
                    this.totalGroup.removeChild(this.pedestalTab);
                }
                this.totalGroup.addChild(this.starDustTab);
                break;
            case 1:
                if (this.pedestalTab == null) {

                    this.pedestalTab = new UI_Visit_Pedestal_Tab();
                }
                if (this.starDustTab != null && this.totalGroup.getChildIndex(this.starDustTab) > -1) {
                    this.totalGroup.removeChild(this.starDustTab);
                }
                this.totalGroup.addChild(this.pedestalTab);
                break;
        }
    }

    private clickedTitleBtn(e: egret.TouchEvent) {
        const btn: eui.ToggleButton = e.currentTarget;
        if (!btn.selected) {
            btn.selected = true;
            return;
        }
        switch (btn) {
            case this.starDust:
                this.setToggleBtn(0);
                this.setTab(0);
                break;
            case this.pedestal:
                this.setToggleBtn(1);
                this.setTab(1);
                break;
        }
    }

    private setToggleBtn(index: number) {
        switch (index) {
            case 0:
                this.starDust.selected = true;
                this.pedestal.selected = false;
                break;
            case 1:
                this.starDust.selected = false;
                this.pedestal.selected = true;
                break;
        }
    }

    private clickedHelpBtn(e: egret.TouchEvent) {
        const helpDialog = new LargeImageDialog("resource/res/ui/gem/gs_tab_help_info.png ");
        helpDialog.show();
    }
}