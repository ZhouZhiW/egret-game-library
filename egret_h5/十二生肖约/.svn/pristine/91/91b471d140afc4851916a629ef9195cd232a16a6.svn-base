class UI_Visit_Pedestal_Tab extends BaseComponent {
    private damageUp: eui.Label;
    private essenceUp: eui.Label;
    private gemUp: eui.Label;
    private goldUp: eui.Label;
    private fragmentUp: eui.Label;
    private lvTx: eui.Label;
    private fragmentNum: eui.Label;

    constructor() {
        super();
    }

    public onCreate() {
        super.onCreate();
        DataManager.inst.pedestal.addDataListener(this.refreshPedestal, this);
    }

    public onDestroy() {
        DataManager.inst.pedestal.removeDataListener(this.refreshPedestal, this);
        super.onDestroy();
    }

    private refreshPedestal(e: DataEvent) {
        const data: Data_Pedestal = e.data;
        this.fragmentNum.text = EasyNumber.easyNum(data.fragmentNum);
        // this.damageUp.text = data.damageUpPercent;
        // this.essenceUp.text = data.goldPercent;
        // this.gemUp.text = data.goldPercent;
        // this.goldUp.text = data.goldPercent;
        // this.fragmentUp.text = data.goldPercent;
        this.lvTx.text = "LV." + data.baseLevel;
    }

    protected get skinPath(): String {
        return "resource/skins/ui/visit/UI_Visit_Pedestal_TabSkin.exml";
    }
}