class UI_Gem_GrooveLockDialog extends CustomDialog {

    private DialogProgressMax = 180;
    private groove: UI_Gem_Groove;
    private dialogInfoLable: eui.Label;
    private dialogProgress: eui.Image;
    private dialogProgressLable: eui.Label;
    private grooveLockDiamond: number;
    private grooveType: number;
    constructor() {
        super(true);
    }

    protected get skinPath(): String {
        return "resource/skins/ui/gem/UI_Gem_GrooveLockDialogSkin.exml";
    }

    public onCreate() {
        // this.dialogBtn.once(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this)
    }


    public onDestroy() {
    }

    public setBtn() {
        if (this.grooveType == DataType_GemType.UnLock) {
            this.addButton("解锁", true, this.clickBtn, this);
        } else if (this.grooveType == DataType_GemType.Lock) {
            this.addIconButton("解锁", this.grooveLockDiamond, 0, true, this.clickBtn, this);
        }
    }

    public setData(groove: UI_Gem_Groove) {
        this.groove = groove;
        const data: Data_BaseMaterial = groove.getMaterialData();
        this.grooveLockDiamond = data.gemLockCost;
        this.dialogInfoLable.text = data.gemLockDisc;
        const wp = data.gemLockCurrentProgress / data.gemLockMaxProgress;
        this.dialogProgress.width = wp > 1 ? this.DialogProgressMax : wp * this.DialogProgressMax;
        this.dialogProgressLable.text = data.gemLockCurrentProgress + "/" + data.gemLockMaxProgress;
        this.grooveType = data.getGemType();
        // this.dialogBtn.label = "" + data.gemLockCost;
        // if (data.gemType == DataType_GemType.UnLock) {
        //     this.dialogBtn.skinName = "resource/skins/ui/gem/UI_Gem_GrooveLockDialogBtnUnlockSkin.exml"
        // } else if (data.gemType == DataType_GemType.Lock) {
        //     this.dialogBtn.skinName = "resource/skins/ui/gem/UI_Gem_GrooveLockDialogBtnLockSkin.exml"
        // }
    }

    private clickBtn(d: CustomDialog) {
        if (this.groove.getMaterialData().getGemType() == DataType_GemType.UnLock) {
            NetEventManager.inst.pushGemLock(this.groove.getGroupID(), DataType_GemLock.Nomal);
        } else if (this.grooveLockDiamond > DataManager.inst.asset.diamond) {
            new PayDialog().setTipDiamond(this.grooveLockDiamond).show();
        } else {
            new DiamondDialog().setDiamond(this.grooveLockDiamond)
                .setClickListener(this.gotoDiamond, this).show();
        }
        this.close();
    }

    private gotoDiamond() {
        NetEventManager.inst.pushGemLock(this.groove.getGroupID(), DataType_GemLock.Diamond);
    }

    protected get style(): number {
        return 0;
    }

}