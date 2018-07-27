class UI_FirstPayment_Tab extends UI_Base_Activity {
    private btntype: number;
    private contentBg: eui.Image;
    private activityType: number;
    private titleTx: eui.Image;
    public btn: UI_Activity_BaseCostomButton;

    constructor(type: number) {
        super();
        this.activityType = type;
        NetEventManager.inst.pushFirstPay(type, 0);
    }

    public onCreate() {
        super.onCreate();
        this.btn.setTextSize(18);
        this.setBg(this.activityType);

        this.btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClicked, this);
        this.addDataListener(this.activityType);
    }

    public onDestroy() {
        this.btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClicked, this);
        this.removeDataListener(this.activityType);
        super.onDestroy();
    }

    private refreshActivity(e: DataEvent) {
        const data = e.data;
        this.setBtn(data.status);
        this.btntype = data.status;
        if (data.status == 2) {
            this.btn.enabled = false;
        }
    }

    private onClicked(e: egret.TouchEvent) {
        if (this.btntype == 0) {
            switch (this.activityType) {
                case 10:
                    UILayer.inst.home.showActivity(13);
                    return;
                case 11:
                    NetEventManager.inst.pushPay(7);
                    break;
                case 12:
                    NetEventManager.inst.pushPay(8);
                    break;
            }
        }
        if (this.btntype == 1) {
            NetEventManager.inst.pushFirstPay(this.activityType, 1);
        }
        UILayer.inst.home.closeActivity();
    }

    private setBg(type: number) {
        let pathBg: string;
        let titleBg: string;
        switch (type) {
            case 10:
                pathBg = "resource/res/ui/activity/aboutPay/firstpay_bg.png";
                titleBg = "resource/res/ui/activity/aboutPay/firstPay_title_bg.png";
                break;
            case 11:
                pathBg = "resource/res/ui/activity/aboutPay/monthCard_bg.png";
                titleBg = "resource/res/ui/activity/aboutPay/monthCard_title_bg.png";
                break;
            case 12:
                pathBg = "resource/res/ui/activity/aboutPay/lifeCard_bg.png";
                titleBg = "resource/res/ui/activity/aboutPay/lifeCard_title_bg.png";
                break;
        }
        this.contentBg.source = pathBg;
        this.titleTx.source = titleBg;
    }

    private setBtn(type: number) {
        switch (type) {
            case 0:
                if (this.activityType == 10) {
                    this.btn.setText("马上充值");
                } else {
                    this.btn.setText("立即购买");
                }
                break;
            default:
                this.btn.setText("领取奖励");
                break;
        }
    }

    private addDataListener(type: number) {
        switch (type) {
            case 10:
                DataManager.inst.firstPay.addDataListener(this.refreshActivity, this);
                break;
            case 11:
                DataManager.inst.monthCard.addDataListener(this.refreshActivity, this);
                break;
            case 12:
                DataManager.inst.lifeCard.addDataListener(this.refreshActivity, this);
                break;
        }
    }

    private removeDataListener(type: number) {
        switch (type) {
            case 10:
                DataManager.inst.firstPay.removeDataListener(this.refreshActivity, this);
                break;
            case 11:
                DataManager.inst.monthCard.removeDataListener(this.refreshActivity, this);
                break;
            case 12:
                DataManager.inst.lifeCard.removeDataListener(this.refreshActivity, this);
                break;
        }
    }

    protected get skinPath(): string {
        return "resource/skins/ui/activity/firstpayment/UI_FirstPayment_TabSkin.exml";
    }
}