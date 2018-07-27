class UI_Gem_Pedestal_Tab extends BaseComponent {
    private lvTx: eui.Label;
    private intensifyBtn: eui.Button;
    private fragmentNum: eui.Label;
    private attackSpeed: eui.Label;

    constructor() {
        super();
    }

    public onCreate() {
        super.onCreate();
        DataManager.inst.pedestal.addDataListener(this.refreshPedestal, this);
        this.intensifyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclicked, this);
    }
    public onDestroy() {
        DataManager.inst.pedestal.removeDataListener(this.refreshPedestal, this);
        this.intensifyBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onclicked, this);
        super.onDestroy();
    }

    private refreshPedestal(e: DataEvent) {
        const data: Data_Pedestal = e.data;
        this.fragmentNum.text = EasyNumber.easyNum(data.fragmentNum);
        this.attackSpeed.text = data.percent;
        this.lvTx.text = "LV." + data.baseLevel;
    }

    protected get skinPath(): String {
        return "resource/skins/ui/gem/UI_Gem_Pedestal_TabSkin.exml";
    }

    private onclicked(e: egret.TouchEvent) {
        const dialog = new UI_Gem_Pedestal_Dialog();
        dialog.show();
    }
}