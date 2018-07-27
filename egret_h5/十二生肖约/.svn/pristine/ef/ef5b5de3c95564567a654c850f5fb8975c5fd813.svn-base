class UI_Mail_Tab extends UI_Base_Tab {
    private mailList: UI_Mail_List;
    private diamondNums: eui.Label;
    private topUp: UI_BaseCostomButton;

    constructor() {
        super();
        NetEventManager.inst.pushMAIL();
    }
    protected get skinPath(): string {
        return "resource/skins/ui/mail/UI_Mail_TabSkin.exml";
    }

    public onCreate() {
        super.onCreate();
        this.topUp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickedBtn, this);
        this.topUp.setStyle(2);
        this.topUp.setTextSize(16);
        this.topUp.setText("充值");
        DataManager.inst.mail.addDataListener(this.refreshMail, this);
        DataManager.inst.asset.addDataListener(this.refreshAsset, this);
    }

    public onDestroy() {
        this.topUp.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickedBtn, this);
        DataManager.inst.mail.removeDataListener(this.refreshMail, this);
        DataManager.inst.asset.removeDataListener(this.refreshAsset, this);
        super.onDestroy();
    }

    private refreshAsset(e: DataEvent) {
        let data: Data_Asset = e.data;
        this.diamondNums.text = EasyNumber.easyNum(data.diamond);
    }

    private refreshMail(e: DataEvent) {
        const data = e.data;

        this.mailList.setData(data.shops);
    }

    private onClickedBtn(e: egret.TouchEvent) {
        UILayer.inst.home.showActivity(13);
    }
}