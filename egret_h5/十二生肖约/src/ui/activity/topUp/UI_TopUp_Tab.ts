class UI_TopUp_Tab extends UI_Base_Activity {
    private panelGroup: eui.Group;
    private productID: number;

    constructor() {
        super();
        NetEventManager.inst.pushTopUp();
    }


    public onCreate() {
        super.onCreate();
        DataManager.inst.topUp.addDataListener(this.refreshTopUp, this);
    }

    public onDestroy() {
        DataManager.inst.topUp.removeDataListener(this.refreshTopUp, this);
        super.onDestroy();
    }

    private clickedProduct(e: egret.TouchEvent) {
        const image: eui.Image = e.currentTarget;
        NetEventManager.inst.pushPay(this.panelGroup.getChildIndex(image));
    }

    private refreshTopUp(e: DataEvent) {
        const data: Data_TopUp = e.data;
        this.panelGroup.removeChildren();
        for (let i = 0; i < data.products.length; i++) {
            // const child = new UI_TopUp_ChildPanel(data.products[i].productId);
            // this.panelGroup.addChild(child);
            const product = new UI_TopIp_Image();
            product.setOwnData(data.products[i]);
            this.panelGroup.addChild(product);
        }
    }

    protected get skinPath(): string {
        return "resource/skins/ui/activity/topUp/UI_TopUp_TabSkin.exml";
    }

}