class UI_Gem_Tab extends BaseComponent {
    private gemPieces: eui.Label;
    private groovesLevel: eui.Label;
    private gemPlayerAtt: eui.Label;
    private gemPlayerCri: eui.Label;
    private gemPlayerCsd: eui.Label;
    private gemHerosAtt: eui.Label;
    private gemGold: eui.Label;
    private gemTabGemGroup: UI_Gem_GemGroup;
    private gemTabGrooveGroup: UI_Gem_GrooveGroup;
    private touchGem: UI_Gem_TouchGem;


    private gemLottery: eui.Button;
    private gemEss: eui.Button;
    private essNums: eui.Label;

    private gemLotteryDiamond: number;
    constructor() {
        super();
        NetEventManager.inst.pushGemPanel();
    }

    protected get skinPath(): String {
        return "resource/skins/ui/gem/UI_Gem_TabSkin.exml";
    }

    public onCreate() {
        super.onCreate();
        this.gemTabGemGroup.setGemListener(this.clickGem, this)
        this.gemTabGrooveGroup.addGrooveListener(this.clickGroove, this)
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.TouchHandler, this);
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.TouchHandler, this);
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.TouchHandler, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.TouchHandler, this);
        this.gemLottery.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
        this.gemEss.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
        DataManager.inst.gemPanel.addDataListener(this.refreshGem, this)
    }

    public onDestroy() {
        this.gemTabGemGroup.removeGemListener(this.clickGem, this)
        this.gemTabGrooveGroup.removeGrooveListener(this.clickGroove, this)
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.TouchHandler, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.TouchHandler, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.TouchHandler, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.TouchHandler, this);

        this.gemLottery.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
        this.gemEss.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
        DataManager.inst.gemPanel.removeDataListener(this.refreshGem, this)
        if (this.touchGem != null) {
            this.touchGem.destroy();
            this.touchGem = null;
        }
        super.onDestroy();
    }


    private refreshGem(e: DataEvent) {
        const data: Data_GemPanel = e.data;
        this.essNums.text = EasyNumber.easyNum(data.gemPieces);
        this.groovesLevel.text = "LV. " + data.groovesLevel;

        this.gemPlayerAtt.text = Utils.numberToPre(data.gemPlayerAtt);
        this.gemPlayerCri.text = Utils.numberToPre(data.gemPlayerCri);
        this.gemPlayerCsd.text = Utils.numberToPre(data.gemPlayerCsd);
        this.gemHerosAtt.text = Utils.numberToPre(data.gemHerosAtt);
        this.gemGold.text = Utils.numberToPre(data.gemMoney);

        this.gemTabGemGroup.setData(data.gemGroupDatas);
        this.gemTabGrooveGroup.setData(data.grooveGroupDatas)

        this.gemLotteryDiamond = data.gemLotteryDiamond;
    }


    private equipGem(gem: UI_Gem_Gem, groove: UI_Gem_Groove) {//镶嵌宝石
        NetEventManager.inst.pushEquipGem(groove.getGroupID(), gem.getMaterialData());
    }

    private removeGem(groove: UI_Gem_Groove) {//取出宝石
        NetEventManager.inst.pushRemoveGem(groove.getGroupID());
    }

    private replaceGem(groove1: UI_Gem_Groove, groove2: UI_Gem_Groove) {//替换宝石
        NetEventManager.inst.pushReplaceGem(groove1.getGroupID(), groove2.getGroupID());

    }

    public clickGem(gem: UI_Gem_Gem) {
        new UI_Gem_GemDialog(gem, this.gemTabGrooveGroup.getNullGroove(), this.getGemLotteryDialog()).show();
    }

    public clickGroove(groove: UI_Gem_Groove) {
        switch (groove.getMaterialData().getGemType()) {
            case DataType_GemType.Lock:
            case DataType_GemType.UnLock:
                const dialog = new UI_Gem_GrooveLockDialog();
                dialog.setData(groove);
                dialog.setBtn();
                dialog.show();
                break;
            default:
                new UI_Gem_GrooveDialog(groove).show();
                break;
        }
    }

    private TouchHandler(e: egret.TouchEvent) {
        const x = e.stageX;
        const y = e.stageY;
        switch (e.type) {
            case egret.TouchEvent.TOUCH_BEGIN:
                let v = null;
                v = this.gemTabGemGroup.checkSelectGem(x, y);
                v = v == null ? this.gemTabGrooveGroup.checkSelectGroove(x, y) : v;
                this.touchGem.setDataGem(v);
                break;
            case egret.TouchEvent.TOUCH_MOVE:
                this.touchGem.setPoint(this.globalToLocal(x, y));
                break;
            case egret.TouchEvent.TOUCH_END:
                const dataGem = this.touchGem.getDataGem();
                if (dataGem == null) {
                    return;
                }
                if (dataGem instanceof UI_Gem_Gem) {
                    const groove: UI_Gem_Groove = this.gemTabGrooveGroup.checkEquipGroove(x, y);//镶嵌宝石
                    if (groove != null && groove.getType() != DataType_GemType.Lock && groove.getType() != DataType_GemType.UnLock) {
                        groove.setMaterialData(this.touchGem.getDataGem().getMaterialData());// 表现辅助 提前与服务器数据
                        this.equipGem(<UI_Gem_Gem>this.touchGem.getDataGem(), groove);
                    }
                } else if (dataGem instanceof UI_Gem_Groove) {
                    if (!this.gemTabGrooveGroup.checkArea(x, y)) {// 取出宝石
                        this.touchGem.getDataGem().setMaterialData(null);// 表现辅助 提前与服务器数据
                        this.removeGem(<UI_Gem_Groove>this.touchGem.getDataGem());
                    }
                    const groove: UI_Gem_Groove = this.gemTabGrooveGroup.checkEquipGroove(x, y);// 替换宝石
                    if (groove != null && groove.getType() != DataType_GemType.Lock && groove.getType() != DataType_GemType.UnLock) {
                        if (this.touchGem.getDataGem().getGroupID() != groove.getGroupID()) {//放在原来位置
                            // 表现辅助 提前与服务器数据 start
                            const temp = this.touchGem.getDataGem().getMaterialData();
                            this.touchGem.getDataGem().setMaterialData(groove.getMaterialData());
                            groove.setMaterialData(temp);
                            // end
                            this.replaceGem(<UI_Gem_Groove>this.touchGem.getDataGem(), groove);
                        }
                    }
                }
                this.touchGem.setDataGem(null);
                break;
        }
    }

    private clickBtn(e: egret.TouchEvent) {
        const tag: eui.ToggleButton = e.currentTarget;
        switch (tag) {
            case this.gemLottery:
                this.getGemLotteryDialog().show();
                break;
            case this.gemEss:
                const essDialog = new UI_Gem_EssDialog();
                essDialog.show();
                break;
        }
    }

    private getGemLotteryDialog(): NTextDialog {
        let dialog = null;
        if (this.gemLotteryDiamond > DataManager.inst.asset.diamond) {
            dialog = new PayDialog().setTipDiamond(this.gemLotteryDiamond);
        } else {
            dialog = new DiamondDialog().setDiamondInfo("   亲，您确定消耗“" + this.gemLotteryDiamond + "”钻石购买一个随机宝箱吗")
                .setClickListener(this.gotoDiamond, this);
        }
        return dialog;
    }

    private gotoDiamond() {
        NetEventManager.inst.pushGemLottery();
    }
}


