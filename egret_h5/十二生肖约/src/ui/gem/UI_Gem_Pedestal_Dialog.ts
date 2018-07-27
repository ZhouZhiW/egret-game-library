class UI_Gem_Pedestal_Dialog extends CustomDialog {
    private diaFraNum: eui.Label;
    private diaLv: eui.Label;
    private costBtn: UI_BaseCostomButton;
    private speedeUp: eui.Label;
    private speedUpNext: eui.Label;


    constructor() {
        super(true);
    }

    public onCreate() {
        //设置按钮
        this.costBtn.setIcon(2);
        this.costBtn.setText("升级");
        this.costBtn.setTextSize(22);

        DataManager.inst.pedestal.addDataListener(this.refreshDialog, this);
        this.costBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClicked, this);
    }

    public onDestroy() {
        this.costBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClicked, this);
        DataManager.inst.pedestal.removeDataListener(this.refreshDialog, this);
    }

    private refreshDialog(e: DataEvent) {
        const data: Data_Pedestal = e.data;
        this.diaFraNum.text = EasyNumber.easyNum(data.fragmentNum);
        this.diaLv.text = "LV." + data.baseLevel;

        this.speedeUp.text = data.percent;
        this.speedUpNext.text = data.nextPercent;

        this.costBtn.setValue(data.costFragment);
        this.costBtn.enabled = data.fragmentNum >= data.costFragment;

    }

    private onClicked(e: egret.TouchEvent) {
        NetEventManager.inst.pushGemPedestalUp(1);
    }

    protected get skinPath(): String {
        return "resource/skins/ui/gem/UI_Gem_Pedestal_DialogSkin.exml";
    }
    protected get style(): number {
        return 2;
    }

}