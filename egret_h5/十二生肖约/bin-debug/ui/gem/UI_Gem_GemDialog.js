var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var UI_Gem_GemDialog = (function () {
    function UI_Gem_GemDialog(gem, groove, lotteryDialog) {
        this.GemSynthetiseNums = 4; //合成所需个数
        this.GemSynthetiseMaxLevel = DataType_GemLevel.Sixth; //合成最高等级
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
    UI_Gem_GemDialog.prototype.show = function () {
        this.dialog.show();
    };
    UI_Gem_GemDialog.prototype.clickEquip = function () {
        this.groove.setMaterialData(this.gem.getMaterialData());
        NetEventManager.inst.pushEquipGem(this.groove.getGroupID(), this.gem.getMaterialData());
        this.dialog.close();
    };
    UI_Gem_GemDialog.prototype.clickSynthetise = function () {
        this.dialog.close();
        if (this.gem.getMaterialData().getCounts() >= this.GemSynthetiseNums) {
            NetEventManager.inst.pushComposeGem(DataType_GemCompose.Synthetise, this.gem.getMaterialData());
        }
        else {
            this.lotteryDialog.show();
        }
    };
    UI_Gem_GemDialog.prototype.clickResolve = function () {
        var dialog = new NTextDialog();
        dialog.addButton("取消", true, this.closeResolve, this);
        dialog.addButton("确定", true, this.gemResolve, this);
        dialog.setTitle(UI_Tre_GemConfig.getGemName(this.gem.getMaterialData().getGemType(), this.gem.getMaterialData().getGemLevel()));
        dialog.setContent("分解可获得宝石精华：" + this.gem.getMaterialData().gemResolveEss + "个");
        dialog.setWarn("分解操作一旦确定将无法逆转");
        dialog.show();
        this.dialog.close();
    };
    UI_Gem_GemDialog.prototype.gemResolve = function (dialog) {
        NetEventManager.inst.pushComposeGem(DataType_GemCompose.Resolve, this.gem.getMaterialData());
        dialog.close();
    };
    UI_Gem_GemDialog.prototype.closeResolve = function (dialog) {
        dialog.close();
    };
    return UI_Gem_GemDialog;
}());
__reflect(UI_Gem_GemDialog.prototype, "UI_Gem_GemDialog");
//# sourceMappingURL=UI_Gem_GemDialog.js.map