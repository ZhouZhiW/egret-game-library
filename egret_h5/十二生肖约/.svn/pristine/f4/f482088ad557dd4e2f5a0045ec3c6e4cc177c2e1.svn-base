class UI_Visit_Stardust_Tab extends BaseComponent {
    private gemPlayerAtt: eui.Label;
    private gemPlayerCri: eui.Label;
    private gemPlayerCsd: eui.Label;
    private gemHerosAtt: eui.Label;
    private gemMoney: eui.Label;
    private gemTabGrooveGroup: UI_Gem_GrooveGroup;

    constructor() {
        super();
    }

    public onCreate() {
        super.onCreate();
        DataManager.inst.gemPanel.addDataListener(this.refreshGem, this);
    }

    public onDestroy() {
        DataManager.inst.gemPanel.removeDataListener(this.refreshGem, this);
        super.onDestroy();
    }

    private refreshGem(e: DataEvent) {
        const data: Data_GemPanel = e.data;
        this.gemPlayerAtt.text = Utils.numberToPre(data.gemPlayerAtt);
        this.gemPlayerCri.text = Utils.numberToPre(data.gemPlayerCri);
        this.gemPlayerCsd.text = Utils.numberToPre(data.gemPlayerCsd);
        this.gemHerosAtt.text = Utils.numberToPre(data.gemHerosAtt);
        this.gemMoney.text = Utils.numberToPre(data.gemMoney);
        // this.gemTabGrooveGroup.setData(data.grooveGroupDatas)

    }


    protected get skinPath(): String {
        return "resource/skins/ui/visit/UI_Visit_Stardust_TabSkin.exml";
    }
}