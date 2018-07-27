class UI_Daily_Item extends eui.ItemRenderer {
    private itemData: Data_Daily_Item;
    private dailyIcon: eui.Image;
    private caption: eui.Label;
    private rewardTx: eui.Label;
    private itemBtn: UI_Activity_BaseCostomButton;
    private rewardsGroup: eui.Group;
    private rest: eui.Label;

    private index: number;
    constructor() {
        super();
        this.touchChildren = true;
        this.skinName = "resource/skins/ui/activity/daily/UI_Daily_ItemSkin.exml";
        this.itemBtn.setTextSize(22);
        this.itemBtn.setText("领取");
        this.once(egret.Event.ADDED_TO_STAGE, this.onCreate, this);
        this.once(egret.Event.REMOVED_FROM_STAGE, this.onDestroy, this);
    }

    private onCreate() {
        this.itemBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickedBtn, this);
    }
    private onDestroy() {
        this.itemBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickedBtn, this);
    }

    protected dataChanged(): void {
        this.itemData = <Data_Daily_Item>this.data;
        this.rest.text == "";
        this.rest.visible = false;
        // console.log(this.itemData.description + "index: " + this.itemData.index);

        if (this.itemData.index == 1) {
            this.rest.visible = !(this.itemData.restDay == 0);
            this.rest.text = "剩余" + this.itemData.restDay + "天";
        }
        this.rewardsGroup.removeChildren();
        if (this.itemData.state == 2) {
            this.itemBtn.setText("已领取");
        } else {
            this.itemBtn.setText("领取");
        }
        this.caption.text = this.itemData.description;
        this.index = this.itemData.index;
        this.itemBtn.enabled = this.itemData.state == 1;

        for (let i = 0; i < this.itemData.rewards.length; i++) {
            const reward = new IconImageMaterial();
            reward.setMaterialData(this.itemData.rewards[i]);
            this.rewardsGroup.addChild(reward);
        }
    }

    //0:终生卡 1:月卡 2：充值 3：英雄 4：星尘 5：领取 6：不能领取
    private setBtn(type: number) {
        if (type == 5 || type == 6) {
            this.itemBtn.setText("领取");
            this.itemBtn.enabled = type == 5;
        } else {
            this.itemBtn.setText("前往");
        }
    }

    private clickedBtn(e: TouchEvent) {
        NetEventManager.inst.pushDaily(15, this.index);



        // switch (this.btnType) {
        //     case 0:
        //         UILayer.inst.home.showActivity(12);

        //         break;
        //     case 1:
        //         UILayer.inst.home.showActivity(11);
        //         break;
        //     case 2:
        //         UILayer.inst.home.showActivity(13);
        //         break;
        //     case 3:
        //         UILayer.inst.home.showTab(0);
        //         UILayer.inst.home.closeActivity();
        //         break;
        //     case 4:
        //         UILayer.inst.home.showTab(1);
        //         UILayer.inst.home.closeActivity();
        //         break;
        //     case 7:
        //         UILayer.inst.home.showTab(4);
        //         UILayer.inst.home.closeActivity();
        //         break;
        // }
    }
}