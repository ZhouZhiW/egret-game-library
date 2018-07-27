class UI_TopIp_Image extends eui.Image {
    private data: Data_TopUp_Image;

    public constructor() {
        super();
        this.once(egret.Event.ADDED_TO_STAGE, this.onCreate, this);
        this.once(egret.Event.REMOVED_FROM_STAGE, this.onDestroy, this);
    }

    private onCreate() {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickedBtnOwn, this);
    }
    private onDestroy() {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickedBtnOwn, this);
    }
    private clickedBtnOwn(e: egret.TouchEvent) {
        NetEventManager.inst.pushPay(this.data.productId);
    }

    public setOwnData(data: Data_TopUp_Image) {
        if (data == null) {
            return;
        }
        this.data = data;
        this.source = "resource/res/ui/activity/topUp/topUp_rmb_" + this.data.productId + ".png";
    }
}