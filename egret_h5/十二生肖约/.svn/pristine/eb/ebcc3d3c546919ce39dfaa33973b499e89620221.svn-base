class UI_Invitation_item extends eui.ItemRenderer {
    private itemBtn: UI_Activity_BaseCostomButton;
    private itemData: Data_Invitation_Item;
    private rewardsGroup: eui.Group;
    private caption: eui.Label;
    private index: number;
    private progress: eui.Label;
    private timeTx: eui.Label;

    constructor() {
        super();
        this.touchChildren = true;
        this.skinName = "resource/skins/ui/activity/invitation/UI_Invitation_itemSkin.exml";
        this.itemBtn.setTextSize(22);
        this.once(egret.Event.ADDED_TO_STAGE, this.onCreate, this);
        this.once(egret.Event.REMOVED_FROM_STAGE, this.onDestroy, this);
    }

    private onCreate() {
        this.itemBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickedBtn, this);
    }
    private onDestroy() {
        this.itemBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickedBtn, this);
    }

    private clickedBtn(e: TouchEvent) {
        NetEventManager.inst.pushInvitation(14, this.index);
    }

    protected dataChanged(): void {
        this.itemData = <Data_Invitation_Item>this.data;
        this.index = this.itemData.index;
        this.caption.text = this.itemData.description;
        this.setState(this.itemData.state);
        this.rewardsGroup.removeChildren();
        for (let i = 0; i < this.itemData.rewards.length; i++) {
            const reward = new IconImageMaterial();
            reward.setMaterialData(this.itemData.rewards[i]);
            this.rewardsGroup.addChild(reward);
        }

    }

    private setState(state: number) {
        switch (state) {
            case 0:
                if (this.itemData.restTime > 0) {
                    this.timeTx.visible = true;
                    this.timeTx.text = Utils.formatLongTime(this.itemData.restTime);
                } else {
                    this.timeTx.visible = false;
                }
                this.itemBtn.visible = false;
                this.progress.visible = true;
                this.progress.text = this.itemData.currStatus + "/" + this.itemData.target;
                break;
            case 1:
                this.progress.visible = false;
                this.itemBtn.visible = true;
                this.itemBtn.setText("领取");
                break;
            case 2:
                this.progress.visible = false;
                this.itemBtn.visible = true;
                this.itemBtn.setText("已领取");
                break;
        }
        this.itemBtn.enabled = this.itemData.state == 1;
    }

    public timerEvent() {
        if (this.timeTx.visible) {
            const offsetTime = this.itemData.restTime - this.itemData.timeCount;
            if (offsetTime < 0) {
                this.timeTx.visible = false;
                NetEventManager.inst.pushInvitation(14, -1);
                return;
            }
            this.timeTx.text = Utils.formatLongTime(offsetTime);
        }
    }
}