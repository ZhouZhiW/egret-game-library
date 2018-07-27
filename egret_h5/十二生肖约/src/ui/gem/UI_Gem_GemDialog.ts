class UI_Gem_GemDialog {
    private GemSynthetiseNums = 4;//合成所需个数
    private GemSynthetiseMaxLevel = DataType_GemLevel.Sixth;//合成最高等级
    private dialog: NTextDialog;
    private gem: UI_Gem_Gem;
    private groove: UI_Gem_Groove;
    private lotteryDialog: NTextDialog;
    constructor(gem: UI_Gem_Gem, groove: UI_Gem_Groove, lotteryDialog: NTextDialog) {
        this.gem = gem;
        this.groove = groove;
        this.lotteryDialog = lotteryDialog;
        this.dialog = new NTextDialog();
        this.dialog.setTitle(this.gem.getTitleInfo());
        this.dialog.setContent(this.gem.getContentInfo());
        this.dialog.addButton("装备", this.groove != null, this.clickEquip, this);
        this.dialog.addButton("合成", this.gem.getMaterialData().getGemLevel() < this.GemSynthetiseMaxLevel, this.clickSynthetise, this);
        this.dialog.addButton("分解", this.gem.getMaterialData().getGemLevel() > DataType_GemLevel.First, this.clickResolve, this);
    }

    public show() {
        this.dialog.show();
    }

    private clickEquip() {//装备
        this.groove.setMaterialData(this.gem.getMaterialData());
        NetEventManager.inst.pushEquipGem(this.groove.getGroupID(), this.gem.getMaterialData());
        this.dialog.close();
    }

    private clickSynthetise() {//合成
        this.dialog.close();
        if (this.gem.getMaterialData().getCounts() >= this.GemSynthetiseNums) {
            NetEventManager.inst.pushComposeGem(DataType_GemCompose.Synthetise, this.gem.getMaterialData());
        } else {
            this.lotteryDialog.show();
        }

    }

    private clickResolve() {//分解
        const dialog = new NTextDialog();
        dialog.addButton("取消", true, this.closeResolve, this);
        dialog.addButton("确定", true, this.gemResolve, this);
        dialog.setTitle(UI_Tre_GemConfig.getGemName(this.gem.getMaterialData().getGemType(), this.gem.getMaterialData().getGemLevel()));
        dialog.setContent("分解可获得宝石精华：" + this.gem.getMaterialData().gemResolveEss + "个")
        dialog.setWarn("分解操作一旦确定将无法逆转");
        dialog.show();
        this.dialog.close();
    }

    private gemResolve(dialog: NTextDialog) {
        NetEventManager.inst.pushComposeGem(DataType_GemCompose.Resolve, this.gem.getMaterialData());
        dialog.close();
    }

    private closeResolve(dialog: NTextDialog) {
        dialog.close();
    }

}