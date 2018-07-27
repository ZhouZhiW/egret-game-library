class UI_Home_Footer extends BaseComponent {
    private tabGroup: eui.Group;
    private skillPanel: UI_Home_FooterSkillPanel;

    constructor() {
        super();
    }

    public onCreate() {
        for (let i = 0; i < this.tabGroup.numChildren; i++) {
            this.tabGroup.getChildAt(i).addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickTab, this);
        }
    }

    public onDestroy() {
        for (let i = 0; i < this.tabGroup.numChildren; i++) {
            this.tabGroup.getChildAt(i).removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickTab, this);
        }
    }

    private clickTab(e: egret.TouchEvent) {
        const selectBtn = <FooterButton>e.currentTarget;
        const index = this.tabGroup.getChildIndex(selectBtn);
        if (selectBtn.selected) {
            UILayer.inst.home.showTab(index);
        } else {
            UILayer.inst.home.closeTab();
        }
    }

    public showTab(tabIndex: number) {
        (<FooterButton>this.tabGroup.getChildAt(tabIndex)).selected = true;;
    }

    public closeTab() {
        for (let i = 0; i < this.tabGroup.numChildren; i++) {
            (<FooterButton>this.tabGroup.getChildAt(i)).selected = false;
        }
    }

}

class FooterButton extends eui.ToggleButton implements ITipListener {
    private tip: eui.Image;
    constructor() {
        super();
        this.width = 78;
        this.height = 86;
        this.once(egret.Event.ADDED_TO_STAGE, this.onCreate, this);
        this.once(egret.Event.REMOVED_FROM_STAGE, this.onDestroy, this);
    }

    protected onCreate() {
        UILayer.inst.home.tips.addTip(this);
    }

    protected onDestroy() {
        UILayer.inst.home.tips.removeTip(this);
    }

    public getTipIndex(): number {
        return Number(this.name);
    }

    public onTipStatus(status: number) {
        if (status == 0) {
            if (this.tip != null) {
                this.removeChild(this.tip);
                this.tip = null;
            }
        } else {
            if (this.tip == null) {
                this.tip = Utils.getTipIcon();
                this.tip.x = this.width - 4;
                this.tip.y = 4;
                this.addChild(this.tip);
            }
        }
    }


}