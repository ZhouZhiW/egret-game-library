class UI_Gem_EssDialog extends CustomDialog {
    private essNums: eui.Label;
    private groovesCurrent: eui.Label;
    private groovesNext: eui.Label;
    private groovesLevel: eui.Label;
    private groovesBtn: UI_BaseCostomButton;

    constructor() {
        super(true);
    }
    public onCreate() {
        //设置按钮
        this.groovesBtn.setIcon(1);
        this.groovesBtn.setText("升级");
        this.groovesBtn.setTextSize(22);

        this.groovesBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
        DataManager.inst.gemPanel.addDataListener(this.refreshGem, this);
    }


    public onDestroy() {
        this.groovesBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
        DataManager.inst.gemPanel.removeDataListener(this.refreshGem, this);
    }

    public refreshGem(e: DataEvent) {
        const data: Data_GemPanel = e.data;
        this.essNums.text = EasyNumber.easyNum(data.gemPieces);
        this.groovesCurrent.text = Utils.numberToPre(data.groovesCurrent);
        this.groovesNext.text = Utils.numberToPre(data.groovesNext);
        this.groovesLevel.text = "LV. " + data.groovesLevel;

        this.groovesBtn.enabled = data.groovesEss <= data.gemPieces;
        this.groovesBtn.setValue(data.groovesEss);
    }

    private clickBtn() {
        NetEventManager.inst.pushGemEssUp();
    }

    protected get style(): number {
        return 2;
    }

    protected get skinPath(): String {
        return "resource/skins/ui/gem/UI_Gem_EssDialogSkin.exml";
    }




}