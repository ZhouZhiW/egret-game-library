class UI_Online_Item extends eui.ItemRenderer {
    private itemData: Data_Online_Item;
    private itemBtn: UI_Activity_BaseCostomButton;
    private dailyIcon: eui.Image;
    private caption: eui.Label;
    private timeTx: eui.Label;
    private rewardsGroup: eui.Group;
    private index: number;

    constructor() {
        super();
        this.touchChildren = true;
        this.skinName = "resource/skins/ui/activity/online/UI_Online_ItemSkin.exml";
        this.once(egret.Event.ADDED_TO_STAGE, this.onCreate, this);
        this.once(egret.Event.REMOVED_FROM_STAGE, this.onDestroy, this);
    }

    private onCreate() {
        this.itemBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickedBtn, this);
        this.itemBtn.setTextSize(22);
        this.itemBtn.setText("领取");
    }

    private onDestroy() {
        this.itemBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickedBtn, this);
    }

    protected dataChanged(): void {
        this.itemData = <Data_Online_Item>this.data;
        this.caption.text = this.itemData.description;
        this.index = this.itemData.index;
        this.rewardsGroup.removeChildren();
        for (let i = 0; i < this.itemData.rewards.length; i++) {
            const reward = new IconImageMaterial();
            reward.setMaterialData(this.itemData.rewards[i]);
            this.rewardsGroup.addChild(reward);
        }
        if (this.itemData.state == 0 && this.timeTx.visible) {
            this.timeTx.visible = true;
            this.itemBtn.visible = false;
            this.timeTx.text = Utils.formatLongTime(this.itemData.time - this.itemData.sumOnlineTime);
        }
        if (this.itemData.state == 1) {
            this.timeTx.visible = false;
            this.itemBtn.visible = true;
            this.itemBtn.enabled = true;
        }
        if (this.itemData.state == 2) {
            this.timeTx.visible = false;
            this.itemBtn.visible = true;
            this.itemBtn.setText("已领取");
            this.itemBtn.enabled = false;
        }
    }

    private clickedBtn(e: TouchEvent) {
        NetEventManager.inst.pushOnline(16, this.index);
    }

    public timerEvent() {
        if (this.timeTx.visible) {
            const offsetTime = this.itemData.time - (this.itemData.timeCount + this.itemData.sumOnlineTime);
            if (offsetTime < 0) {
                this.timeTx.visible = false;
                NetEventManager.inst.pushOnline(16, -1)
                return;
            }
            this.timeTx.text = Utils.formatLongTime(offsetTime);
        }
    }
}