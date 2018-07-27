class UI_Achieved_Item extends eui.ItemRenderer {
    private itemPic: eui.Image;
    private target: eui.Label;
    private reward: eui.Label;
    private progressTx: eui.Label;
    private progress: eui.Image;
    private progress_length: number = 191;
    private btnClear: eui.Image;
    private itemData: Data_Achieved_Item;
    private clear: eui.Image;
    private acBtn: UI_BaseCostomButton;


    public constructor() {
        super();
        this.touchChildren = true;
        this.skinName = "resource/skins/ui/achieved/UI_Achieved_ItemSkin.exml";
        this.once(egret.Event.ADDED_TO_STAGE, this.onCreate, this);
    }

    private onCreate() {
        this.acBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClicked, this);
        this.acBtn.setText("领取");
        this.acBtn.setTextSize(18);
    }

    protected dataChanged(): void {
        this.itemData = <Data_Achieved_Item>this.data;
        this.clear.alpha = 0;
        // console.log("已完成" + this.itemData.acNow);
        // console.log("目标值" + this.itemData.acEnd);


        // console.log("进入了: " + this.itemData.acTarget);
        // if (this.itemData.achievedBtnStatus = 2) {
        //     this.btnClear.alpha = 0;
        //     this.acBtn.alpha = 1;
        // } else {
        //     this.btnClear.alpha = 1;
        //     this.acBtn.alpha = 0;
        //     console.log("hahahahahha");

        // }
        this.itemPic.source = this.getIconPath(this.itemData.acItemIndex);
        this.setBtn(this.itemData.achievedBtnStatus);
        this.acBtn.enabled = this.getBtn(this.itemData.achievedBtnStatus);
        this.target.text = this.itemData.acTarget;
        this.reward.text = this.itemData.acReward;
        // console.log(this.itemData.acItemIndex + "         " + this.itemData.achievedBtnStatus);


        // if (this.itemData.acNow >= this.itemData.acEnd) {
        //     this.progress.width = this.progress_length;
        //     // console.log("hahah1");

        // } else {
        //     this.progressTx.text = EasyNumber.easyNum(this.itemData.acNow) + "/" + EasyNumber.easyNum(this.itemData.acEnd);
        //     // this.progressTx.text = this.itemData.acNow + "/" + this.itemData.acEnd;
        //     this.progress.width = this.progress_length * (this.itemData.acNow / this.itemData.acEnd);
        //     // console.log("hahaha2");

        // }
        // console.log("itemData.acItemIndex: " + this.itemData.acItemIndex);

        this.progressTx.text = EasyNumber.easyNum(this.itemData.acNow) + "/" + EasyNumber.easyNum(this.itemData.acEnd);
        this.setProgress(this.itemData.acNow, this.itemData.acEnd);

    }

    private onClicked(e: egret.TouchEvent) {
        NetEventManager.inst.pushNextAchieved(1, this.itemData.acItemIndex);
    }

    private setBtn(type: number) {
        // console.log("type:" + type);
        if (type == 2) {
            this.clear.alpha = 1;
            this.acBtn.alpha = 0;
        } else {
            this.clear.alpha = 0;
            this.acBtn.alpha = 1;
        }
    }

    private setProgress(now: number, end: number) {
        if (now < end) {
            this.progress.width = this.progress_length * (now / end);
        } else {
            this.progress.width = this.progress_length;
        }
    }

    private getIconPath(type: number): string {
        let path: string;
        switch (type) {
            case 0:
                path = "resource/res/ui/achieved/ac_item_pic_luh.png";
                break;
            case 1:
                path = "resource/res/ui/achieved/ac_item_pic_ops.png";
                break;
            case 2:
                path = "resource/res/ui/achieved/ac_item_pic_kmi.png";
                break;
            case 3:
                path = "resource/res/ui/achieved/ac_item_pic_tti.png";
                break;
            case 4:
                path = "resource/res/ui/achieved/ac_item_pic_ggc.png";
                break;
            case 5:
                path = "resource/res/ui/achieved/ac_item_pic_bzi.png";
                break;
            case 6:
                path = "resource/res/ui/achieved/ac_item_pic_nch.png";
                break;
            case 7:
                path = "resource/res/ui/achieved/ac_item_pic_hbi.png";
                break;
            case 8:
                path = "resource/res/ui/achieved/ac_item_pic_ghg.png";
                break;
            case 9:
                path = "resource/res/ui/achieved/ac_item_pic_ust.png";
                break;
            case 10:
                path = "resource/res/ui/achieved/ac_item_pic_dps.png";
                break;
            case 11:
                path = "resource/res/ui/achieved/ac_item_pic_ubi.png";
                break;
            case 12:
                path = "resource/res/ui/achieved/ac_item_pic_friend.png";
                break;
            case 13:
                path = "resource/res/ui/achieved/ac_item_pic_rank.png";
                break;
        }
        return path;
    }

    private getBtn(type: number): boolean {
        let btn: boolean;
        switch (type) {
            case 0:
                btn = false;
                break;
            case 1:
                btn = true;
                break;
            case 2:
                btn = false;
                break;
        }
        return btn;
    }
}